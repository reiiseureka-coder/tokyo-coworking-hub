import { AdminFacilityForm } from "@/components/admin-facility-form";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">施設登録と初期運用</h1>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-stone-600">
          MVPの初期運用で一番必要なのは、施設データをすぐ追加できることです。この画面では、管理者アカウントでログインしている場合に限って、施設の新規登録をそのまま Supabase に保存できます。
        </p>
      </div>

      <AdminFacilityForm />
    </div>
  );
}
