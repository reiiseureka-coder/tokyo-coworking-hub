export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">利用規約</h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-stone-600">
          <p>本サービスは、コワーキングスペース情報の閲覧、口コミ投稿、問い合わせ送信を目的として提供します。</p>
          <p>口コミ内容は、他の利用者の参考となる範囲で公開される場合があります。虚偽投稿や誹謗中傷は禁止とします。</p>
          <p>法人問い合わせは、提携施設または運営側から連絡する目的で保存されます。</p>
        </div>
      </article>
    </div>
  );
}
