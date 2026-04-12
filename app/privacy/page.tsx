export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">プライバシーポリシー</h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-stone-600">
          <p>Googleログインで取得した基本情報は、アカウント管理と口コミ投稿者表示のために使用します。</p>
          <p>法人問い合わせフォームで送信された情報は、問い合わせ対応およびサービス改善のために使用します。</p>
          <p>個人情報の取り扱いは、法令および今後整備する正式ポリシーに従います。</p>
        </div>
      </article>
    </div>
  );
}
