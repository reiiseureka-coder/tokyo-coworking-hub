"use client";

import { useState } from "react";
import { Chrome } from "lucide-react";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

export function GoogleLoginPanel() {
  const client = getBrowserSupabaseClient();
  const [pending, setPending] = useState(false);

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      {!client ? (
        <div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          まずは `.env.local` に Supabase の URL と Anon Key を設定してください。設定後、この画面から Google
          ログインを有効にできます。
        </div>
      ) : null}
      <div className="mt-6 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Googleでログイン</h2>
        <p className="text-sm leading-6 text-stone-600">
          口コミ投稿、管理者画面、問い合わせ履歴確認の拡張に備えて、初期MVPでは Google ログインを採用します。
        </p>
        <button
          type="button"
          disabled={!client || pending}
          onClick={async () => {
            if (!client) return;
            setPending(true);
            await client.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${window.location.origin}/auth/callback`,
              },
            });
          }}
          className="inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-60"
        >
          <Chrome className="mr-2 h-4 w-4" />
          {pending ? "Googleへ移動中..." : "Googleでログインする"}
        </button>
      </div>
    </div>
  );
}
