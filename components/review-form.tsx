"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";
import { USER_ROLES } from "@/lib/constants";

type SessionUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
};

export function ReviewForm({ facilityId, facilitySlug }: { facilityId: string; facilitySlug: string }) {
  const client = getBrowserSupabaseClient();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;
    client.auth.getUser().then(({ data }) => {
      setUser((data.user as SessionUser | null) ?? null);
    });
  }, [client]);

  async function handleSubmit(formData: FormData) {
    if (!client || !user) return;

    setPending(true);
    setError(null);

    const payload = {
      facility_id: facilityId,
      facility_slug: facilitySlug,
      user_id: user.id,
      user_name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email ?? "匿名ユーザー",
      user_role: String(formData.get("userRole") ?? "other"),
      rating: Number(formData.get("rating") ?? 0),
      quietness_rating: Number(formData.get("quietnessRating") ?? 0),
      call_ease_rating: Number(formData.get("callEaseRating") ?? 0),
      equipment_rating: Number(formData.get("equipmentRating") ?? 0),
      comment: String(formData.get("comment") ?? ""),
      visited_at: String(formData.get("visitedAt") ?? ""),
    };

    const { error: submitError } = await client.from("reviews").insert(payload);

    if (submitError) {
      setError("口コミの保存に失敗しました。テーブル設計または権限設定をご確認ください。");
    } else {
      setDone(true);
    }

    setPending(false);
  }

  if (!client) {
    return (
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 text-sm leading-6 text-stone-600 shadow-sm">
        口コミ投稿フォームは用意済みですが、保存には Supabase 接続が必要です。先に `.env.local` を設定すると次の段階に進めます。
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 text-sm leading-6 text-stone-600 shadow-sm">
        口コミ投稿には Google ログインが必要です。<Link href="/login" className="font-medium text-stone-900 underline">ログインページ</Link>から続けてください。
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      {done ? (
        <div className="mb-5 rounded-2xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
          口コミを送信しました。MVPでは即時反映前提ですが、将来的には審査フローも追加できます。
        </div>
      ) : null}
      {error ? <div className="mb-5 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div> : null}
      <form
        action={async (formData) => {
          await handleSubmit(formData);
        }}
        className="space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">総合評価</span>
            <input name="rating" type="number" min="1" max="5" defaultValue="4" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">利用者属性</span>
            <select name="userRole" defaultValue="worker" className="w-full rounded-2xl border border-stone-300 px-4 py-3">
              {USER_ROLES.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">静かさ</span>
            <input name="quietnessRating" type="number" min="1" max="5" defaultValue="4" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">通話しやすさ</span>
            <input name="callEaseRating" type="number" min="1" max="5" defaultValue="3" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">設備満足度</span>
            <input name="equipmentRating" type="number" min="1" max="5" defaultValue="4" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
        </div>
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-stone-700">利用日</span>
          <input name="visitedAt" type="date" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
        </label>
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-stone-700">口コミ</span>
          <textarea
            name="comment"
            rows={6}
            required
            className="w-full rounded-3xl border border-stone-300 px-4 py-3"
            placeholder="静かさ、席の使いやすさ、オンライン会議のしやすさなどを教えてください。"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "送信中..." : "口コミを投稿する"}
        </button>
      </form>
    </div>
  );
}
