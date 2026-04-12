"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { getBrowserSupabaseClient } from "@/lib/supabase/browser";

type SessionUser = {
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
  };
};

export function AuthButton() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const client = getBrowserSupabaseClient();

  useEffect(() => {
    if (!client) return;

    client.auth.getUser().then(({ data }) => {
      setUser((data.user as SessionUser | null) ?? null);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setUser((session?.user as SessionUser | null) ?? null);
    });

    return () => subscription.unsubscribe();
  }, [client]);

  if (!client) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        ログイン設定を見る
      </Link>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
      >
        <User className="mr-2 h-4 w-4" />
        Googleでログイン
      </Link>
    );
  }

  const label = user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email ?? "ログイン中";

  return (
    <button
      type="button"
      onClick={async () => {
        await client.auth.signOut();
        window.location.href = "/";
      }}
      className="inline-flex items-center rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {label}
    </button>
  );
}
