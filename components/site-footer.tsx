import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr,1fr,1fr] lg:px-8">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-900">Tokyo Coworking Hub</h2>
          <p className="max-w-md text-sm leading-6 text-stone-600">
            東京のコワーキングスペースを、静かさや通話のしやすさまで含めて比較しやすくするMVPです。
          </p>
        </div>
        <div className="space-y-3 text-sm text-stone-600">
          <div className="font-medium text-stone-900">Explore</div>
          <Link href="/facilities" className="block hover:text-stone-900">
            施設一覧
          </Link>
          <Link href="/business" className="block hover:text-stone-900">
            法人向けページ
          </Link>
          <Link href="/login" className="block hover:text-stone-900">
            ログイン
          </Link>
        </div>
        <div className="space-y-3 text-sm text-stone-600">
          <div className="font-medium text-stone-900">Legal</div>
          <Link href="/terms" className="block hover:text-stone-900">
            利用規約
          </Link>
          <Link href="/privacy" className="block hover:text-stone-900">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
