export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-12">
      <h1 className="text-3xl font-bold">プライバシーポリシー</h1>
      <div className="prose prose-neutral max-w-none space-y-6">
        <p>Tokyo Coworking Hubは、ユーザーの個人情報の保護を重要視しています。</p>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">個人情報の収集</h2>
          <p>本サービスでは、会員登録やお問い合わせの際に、氏名、メールアドレス等の個人情報を収集することがあります。</p>
        </section>
        <section className="space-y-4">
          <h2 className="text-xl font-bold">個人情報の利用目的</h2>
          <p>収集した個人情報は、本サービスの提供、お問い合わせへの回答、およびサービス改善の目的にのみ利用します。</p>
        </section>
      </div>
    </div>
  );
}
