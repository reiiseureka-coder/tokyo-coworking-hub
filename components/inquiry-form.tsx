"use client";

import { useState } from "react";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

export function InquiryForm({ facilityId }: { facilityId?: string }) {
  const client = getBrowserSupabaseClient();
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    setError(null);

    if (!client) {
      setDone(true);
      setPending(false);
      return;
    }

    const payload = {
      facility_id: facilityId ?? null,
      company_name: String(formData.get("companyName") ?? ""),
      contact_name: String(formData.get("contactName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone_number: String(formData.get("phoneNumber") ?? ""),
      content: String(formData.get("content") ?? ""),
      status: "new",
    };

    const { error: submitError } = await client.from("business_inquiries").insert(payload);

    if (submitError) {
      setError("お問い合わせの保存に失敗しました。Supabase設定をご確認ください。");
    } else {
      setDone(true);
    }

    setPending(false);
  }

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      {done ? (
        <div className="rounded-2xl bg-emerald-50 p-5 text-sm leading-6 text-emerald-800">
          お問い合わせを受け付けました。MVP段階ではメール返信フローは未実装ですが、記録できる構成にしています。
        </div>
      ) : null}
      {!client ? (
        <div className="mb-5 rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          現在はデモモードです。フォームUIは確認できますが、実保存には Supabase の環境変数設定が必要です。
        </div>
      ) : null}
      {error ? <div className="mb-4 rounded-2xl bg-rose-50 p-4 text-sm text-rose-700">{error}</div> : null}

      <form
        action={async (formData) => {
          await handleSubmit(formData);
        }}
        className="space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">会社名</span>
            <input name="companyName" required className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">担当者名</span>
            <input name="contactName" required className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">メールアドレス</span>
            <input name="email" type="email" required className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium text-stone-700">電話番号</span>
            <input name="phoneNumber" className="w-full rounded-2xl border border-stone-300 px-4 py-3" />
          </label>
        </div>
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-stone-700">お問い合わせ内容</span>
          <textarea
            name="content"
            required
            rows={6}
            className="w-full rounded-3xl border border-stone-300 px-4 py-3"
            placeholder="希望エリア、利用人数、利用開始時期などをご記入ください。"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60"
        >
          {pending ? "送信中..." : "法人問い合わせを送信する"}
        </button>
      </form>
    </div>
  );
}
