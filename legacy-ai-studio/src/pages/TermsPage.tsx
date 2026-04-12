export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-bold">利用規約</h1>
      <div className="prose prose-neutral max-w-none space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-bold">第1条（適用）</h2>
          <p>本規約は、Tokyo Coworking Hub（以下「本サービス」）の利用条件を定めるものです。</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">第2条（禁止事項）</h2>
          <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>本サービスのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
