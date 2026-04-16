"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Lock, PlusCircle } from "lucide-react";
import type { Facility, FacilityInsertInput } from "@/types";
import { AREAS } from "@/lib/constants";
import { createFacilitySlug, isAdminEmail, parseSeatTypes } from "@/lib/admin";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

type SessionUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
};

const defaultForm: FacilityInsertInput = {
  name: "",
  description: "",
  address: "",
  prefecture: "東京都",
  city: "",
  area: AREAS[0],
  nearestStation: "",
  walkMinutes: 5,
  priceInfo: "",
  businessHours: "",
  imageUrl: "",
  officialUrl: "",
  seatTypes: [],
  quietnessLevel: 3,
  hasDropIn: true,
  canCall: false,
  hasPrivateRoom: false,
  hasPower: true,
  hasWifi: true,
  businessInquiryAvailable: true,
  featured: false,
  sponsoredRank: 999,
  status: "draft",
};

export function AdminFacilityForm() {
  const supabase = getBrowserSupabaseClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [form, setForm] = useState(defaultForm);
  const [seatTypesInput, setSeatTypesInput] = useState("オープンデスク");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentFacilities, setRecentFacilities] = useState<Facility[]>([]);
  const [loadingRecent, setLoadingRecent] = useState(true);

  const isAdmin = useMemo(() => isAdminEmail(user?.email), [user?.email]);

  useEffect(() => {
    if (!supabase) {
      setLoadingAuth(false);
      setLoadingRecent(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser((data.user as SessionUser | null) ?? null);
      setLoadingAuth(false);
    });
  }, [supabase]);

  useEffect(() => {
    async function loadRecentFacilities() {
      if (!supabase || !isAdmin) {
        setLoadingRecent(false);
        return;
      }

      const { data } = await supabase
        .from("facilities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      const facilities = ((data as Record<string, unknown>[] | null) ?? []).map((item) => ({
        id: String(item.id),
        slug: String(item.slug),
        name: String(item.name),
        description: String(item.description),
        address: String(item.address),
        prefecture: String(item.prefecture),
        city: String(item.city),
        area: String(item.area),
        nearestStation: String(item.nearest_station ?? ""),
        walkMinutes: Number(item.walk_minutes ?? 0),
        priceInfo: String(item.price_info ?? ""),
        businessHours: String(item.business_hours ?? ""),
        hasDropIn: Boolean(item.has_drop_in),
        canCall: Boolean(item.can_call),
        hasPrivateRoom: Boolean(item.has_private_room),
        seatTypes: Array.isArray(item.seat_types) ? (item.seat_types as string[]) : [],
        hasPower: Boolean(item.has_power),
        hasWifi: Boolean(item.has_wifi),
        quietnessLevel: Number(item.quietness_level ?? 0),
        businessInquiryAvailable: Boolean(item.business_inquiry_available),
        officialUrl: item.official_url ? String(item.official_url) : undefined,
        imageUrl: String(item.image_url ?? ""),
        averageRating: Number(item.average_rating ?? 0),
        reviewCount: Number(item.review_count ?? 0),
        featured: Boolean(item.featured),
        sponsoredRank: Number(item.sponsored_rank ?? 999),
      }));

      setRecentFacilities(facilities);
      setLoadingRecent(false);
    }

    loadRecentFacilities();
  }, [supabase, isAdmin, message]);

  const updateField = <K extends keyof FacilityInsertInput>(key: K, value: FacilityInsertInput[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!supabase) {
      setError("Supabase 設定が読み込まれていません。");
      return;
    }

    if (!isAdmin) {
      setError("このアカウントでは施設登録できません。管理者メールでログインしてください。");
      return;
    }

    setSubmitting(true);
    setMessage(null);
    setError(null);

    const payload = {
      slug: createFacilitySlug(form.name, form.area),
      name: form.name,
      description: form.description,
      address: form.address,
      prefecture: form.prefecture,
      city: form.city,
      area: form.area,
      nearest_station: form.nearestStation,
      walk_minutes: form.walkMinutes,
      price_info: form.priceInfo,
      business_hours: form.businessHours,
      has_drop_in: form.hasDropIn,
      can_call: form.canCall,
      has_private_room: form.hasPrivateRoom,
      seat_types: parseSeatTypes(seatTypesInput),
      has_power: form.hasPower,
      has_wifi: form.hasWifi,
      quietness_level: form.quietnessLevel,
      business_inquiry_available: form.businessInquiryAvailable,
      official_url: form.officialUrl || null,
      image_url: form.imageUrl,
      status: form.status,
      average_rating: 0,
      review_count: 0,
      featured: form.featured,
      sponsored_rank: form.sponsoredRank,
    };

    const { error: insertError } = await supabase.from("facilities").insert(payload);

    if (insertError) {
      setError(insertError.message);
    } else {
      setMessage(`「${form.name}」を ${form.status === "published" ? "公開" : "下書き"} として登録しました。`);
      setForm(defaultForm);
      setSeatTypesInput("オープンデスク");
    }

    setSubmitting(false);
  }

  if (loadingAuth) {
    return (
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 text-sm text-stone-600 shadow-sm">
        管理権限を確認しています...
      </div>
    );
  }

  if (!supabase) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900 shadow-sm">
        `.env.local` または Vercel の環境変数に Supabase の設定が入っていないため、管理画面を有効化できません。
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <Lock className="mt-1 h-5 w-5 text-stone-500" />
          <div>
            <h2 className="text-lg font-semibold text-stone-900">ログインが必要です</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              管理画面の施設登録を使うには、まず Google ログインしてください。
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 h-5 w-5 text-amber-700" />
          <div>
            <h2 className="text-lg font-semibold text-amber-900">管理者アカウントではありません</h2>
            <p className="mt-2 text-sm leading-7 text-amber-900">
              現在のログインメールは <span className="font-medium">{user.email}</span> です。施設登録は
              `rei.is.eureka@gmail.com` でログインした場合のみ有効です。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Facility Create</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">施設を新規登録</h2>
          </div>
          <PlusCircle className="h-6 w-6 text-stone-400" />
        </div>

        {message ? (
          <div className="mt-5 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4" />
              <span>{message}</span>
            </div>
          </div>
        ) : null}
        {error ? (
          <div className="mt-5 rounded-2xl bg-rose-50 p-4 text-sm leading-6 text-rose-700">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-4 w-4" />
              <span>{error}</span>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <TextField label="施設名" value={form.name} onChange={(value) => updateField("name", value)} required />
          <SelectField label="エリア" value={form.area} onChange={(value) => updateField("area", value)}>
            {AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </SelectField>
          <TextField label="市区町村" value={form.city} onChange={(value) => updateField("city", value)} required />
          <TextField
            label="最寄駅"
            value={form.nearestStation}
            onChange={(value) => updateField("nearestStation", value)}
            required
          />
          <NumberField
            label="駅徒歩分数"
            value={form.walkMinutes}
            onChange={(value) => updateField("walkMinutes", value)}
            min={0}
          />
          <NumberField
            label="静かさ (1-5)"
            value={form.quietnessLevel}
            onChange={(value) => updateField("quietnessLevel", value)}
            min={1}
            max={5}
          />
          <TextField label="料金表示" value={form.priceInfo} onChange={(value) => updateField("priceInfo", value)} required />
          <TextField
            label="営業時間"
            value={form.businessHours}
            onChange={(value) => updateField("businessHours", value)}
            required
          />
          <SelectField label="公開状態" value={form.status} onChange={(value) => updateField("status", value as "draft" | "published")}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </SelectField>
          <NumberField
            label="掲載順位 (小さいほど上)"
            value={form.sponsoredRank}
            onChange={(value) => updateField("sponsoredRank", value)}
            min={0}
          />
        </div>

        <div className="mt-4">
          <TextField label="住所" value={form.address} onChange={(value) => updateField("address", value)} required />
        </div>
        <div className="mt-4">
          <TextField
            label="画像URL"
            value={form.imageUrl}
            onChange={(value) => updateField("imageUrl", value)}
            placeholder="https://..."
            required
          />
        </div>
        <div className="mt-4">
          <TextField
            label="公式サイトURL"
            value={form.officialUrl ?? ""}
            onChange={(value) => updateField("officialUrl", value)}
            placeholder="https://..."
          />
        </div>
        <div className="mt-4">
          <TextField
            label="席タイプ"
            value={seatTypesInput}
            onChange={setSeatTypesInput}
            placeholder="オープンデスク, 個室, 会議室"
          />
        </div>
        <div className="mt-4">
          <TextAreaField
            label="説明文"
            value={form.description}
            onChange={(value) => updateField("description", value)}
            required
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ToggleField label="ドロップイン可能" checked={form.hasDropIn} onChange={(checked) => updateField("hasDropIn", checked)} />
          <ToggleField label="通話可能" checked={form.canCall} onChange={(checked) => updateField("canCall", checked)} />
          <ToggleField
            label="個室あり"
            checked={form.hasPrivateRoom}
            onChange={(checked) => updateField("hasPrivateRoom", checked)}
          />
          <ToggleField label="電源あり" checked={form.hasPower} onChange={(checked) => updateField("hasPower", checked)} />
          <ToggleField label="Wi-Fiあり" checked={form.hasWifi} onChange={(checked) => updateField("hasWifi", checked)} />
          <ToggleField
            label="法人問い合わせ可"
            checked={form.businessInquiryAvailable}
            onChange={(checked) => updateField("businessInquiryAvailable", checked)}
          />
          <ToggleField label="おすすめ表示" checked={form.featured} onChange={(checked) => updateField("featured", checked)} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60"
        >
          {submitting ? "登録中..." : "施設を登録する"}
        </button>
      </form>

      <div className="space-y-6">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">運用メモ</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-stone-600">
            <li>まずは `draft` で保存して内容を確認し、準備ができたら `published` で再登録または更新する運用が安全です。</li>
            <li>画像URLは当面は外部画像でもOKですが、次段階で Supabase Storage に寄せるのがおすすめです。</li>
            <li>席タイプは `,` 区切りで複数入力できます。</li>
          </ul>
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">最近の施設</h2>
          {loadingRecent ? (
            <p className="mt-4 text-sm text-stone-500">読み込み中...</p>
          ) : recentFacilities.length === 0 ? (
            <p className="mt-4 text-sm leading-7 text-stone-500">まだ登録された施設はありません。最初の1件をここから追加できます。</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentFacilities.map((facility) => (
                <div key={facility.id} className="rounded-2xl bg-stone-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-stone-900">{facility.name}</div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs text-stone-600">
                      {facility.status ?? "draft"}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-stone-500">
                    {facility.area} / {facility.nearestStation} / {facility.priceInfo}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-stone-700">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-stone-700">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-stone-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
      >
        {children}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-stone-700">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows={5}
        className="w-full rounded-3xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-700">
      <span>{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 rounded border-stone-300" />
    </label>
  );
}
