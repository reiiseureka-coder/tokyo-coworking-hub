import { GoogleLoginPanel } from "@/components/google-login-panel";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Auth</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">ログイン</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          口コミ投稿と管理画面を見据えて、初期MVPでは Google ログインを採用します。UI確認だけ先に進められるよう、Supabase未設定でも画面は成立します。
        </p>
      </div>
      <GoogleLoginPanel />
    </div>
  );
}
