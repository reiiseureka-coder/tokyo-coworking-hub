create extension if not exists pgcrypto;

create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  address text not null,
  prefecture text not null default '東京都',
  city text not null,
  area text not null,
  nearest_station text not null,
  walk_minutes integer not null default 0,
  price_info text not null,
  business_hours text not null,
  has_drop_in boolean not null default false,
  can_call boolean not null default false,
  has_private_room boolean not null default false,
  seat_types text[] not null default '{}',
  has_power boolean not null default true,
  has_wifi boolean not null default true,
  quietness_level integer not null default 3,
  business_inquiry_available boolean not null default false,
  official_url text,
  image_url text not null,
  status text not null default 'draft',
  average_rating numeric(2,1) not null default 0,
  review_count integer not null default 0,
  featured boolean not null default false,
  sponsored_rank integer not null default 999,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  user_role text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid not null references public.facilities(id) on delete cascade,
  facility_slug text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  user_name text not null,
  user_role text not null default 'other',
  rating integer not null check (rating between 1 and 5),
  quietness_rating integer not null check (quietness_rating between 1 and 5),
  call_ease_rating integer not null check (call_ease_rating between 1 and 5),
  equipment_rating integer not null check (equipment_rating between 1 and 5),
  comment text not null,
  visited_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.business_inquiries (
  id uuid primary key default gen_random_uuid(),
  facility_id uuid references public.facilities(id) on delete set null,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone_number text,
  content text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.facilities enable row level security;
alter table public.profiles enable row level security;
alter table public.reviews enable row level security;
alter table public.business_inquiries enable row level security;

drop policy if exists "Published facilities are viewable by everyone" on public.facilities;
create policy "Published facilities are viewable by everyone"
on public.facilities for select
using (status = 'published');

drop policy if exists "Admins can manage facilities" on public.facilities;
create policy "Admins can manage facilities"
on public.facilities for all
to authenticated
using (lower(coalesce(auth.jwt() ->> 'email', '')) in ('rei.is.eureka@gmail.com'))
with check (lower(coalesce(auth.jwt() ->> 'email', '')) in ('rei.is.eureka@gmail.com'));

drop policy if exists "Reviews are viewable by everyone" on public.reviews;
create policy "Reviews are viewable by everyone"
on public.reviews for select
using (true);

drop policy if exists "Authenticated users can create reviews" on public.reviews;
create policy "Authenticated users can create reviews"
on public.reviews for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Anyone can create business inquiries" on public.business_inquiries;
create policy "Anyone can create business inquiries"
on public.business_inquiries for insert
with check (true);

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);
