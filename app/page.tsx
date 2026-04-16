import Link from "next/link";
import { Search } from "lucide-react";
import { FacilityCard } from "@/components/facility-card";
import { getFeaturedFacilities } from "@/lib/data";
import { AREAS } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedFacilities(3);

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=2000')",
            }}
          />
          <div className="absolute inset-0 bg-stone-950/55" />

          <div className="relative z-10 px-8 py-20 text-center text-white sm:px-12 sm:py-28">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              東京で、最高の作業場所を。
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-100 sm:text-xl">
              静かさ、通話のしやすさ、設備。あなたの「こだわり」で選べるコワーキングスペース口コミサイト。
            </p>

            <form action="/facilities" className="mx-auto mt-10 max-w-4xl">
              <div className="flex items-center rounded-full bg-white px-4 py-3 shadow-2xl">
                <Search className="ml-1 h-5 w-5 shrink-0 text-stone-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="エリア、駅名で検索..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-1 text-base text-stone-900 outline-none placeholder:text-stone-400 sm:text-lg"
                />
                <button
                  type="submit"
                  className="rounded-full bg-stone-950 px-8 py-3 text-sm font-medium text-white transition hover:bg-stone-800 sm:px-10 sm:text-base"
                >
                  検索
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">人気のエリアから探す</h2>
          </div>
          <Link href="/facilities" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            すべて見る
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area) => (
            <Link
              key={area}
              href={`/facilities?area=${encodeURIComponent(area)}`}
              className="flex min-h-[172px] items-center justify-center rounded-[1.75rem] bg-[#a9a9a9] px-6 py-8 text-center text-4xl font-semibold text-white transition hover:bg-[#949494]"
            >
              <span>{area}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">まず見てほしい施設</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6">
          {featured.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>
    </div>
  );
}
