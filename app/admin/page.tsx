export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">管理画面の叩き台</h1>
        <p className="mt-5 max-w-3xl text-sm leading-8 text-stone-600">
          初期運用では、ここから施設の新規登録、公開状態変更、おすすめ設定、法人問い合わせ確認ができる構成を想定しています。現段階では、土台のページと役割だけ先に置いてあります。
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <h2 className="text-lg font-semibold text-stone-900">施設管理</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              施設情報の登録、ドラフト管理、掲載順制御をまとめる予定です。
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-stone-50 p-5">
            <h2 className="text-lg font-semibold text-stone-900">問い合わせ管理</h2>
            <p className="mt-2 text-sm leading-7 text-stone-600">
              法人問い合わせのステータス管理と、施設ごとの送客状況確認を行う想定です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
