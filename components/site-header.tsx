import Link from "next/link";
import { Building2, MapPinned } from "lucide-react";
import { AuthButton } from "./auth-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white">
            <MapPinned className="h-5 w-5" />
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight text-stone-900">
              Tokyo Coworking Hub
            </div>
            <div className="text-xs text-stone-500">東京の作業場所を探しやすくする口コミサイト</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          <Link href="/facilities" className="transition hover:text-stone-900">
            施設を探す
          </Link>
          <Link href="/business" className="transition hover:text-stone-900">
            法人向け
          </Link>
          <Link href="/admin" className="transition hover:text-stone-900">
            管理画面
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/business"
            className="hidden rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900 sm:inline-flex"
          >
            <Building2 className="mr-2 h-4 w-4" />
            法人の方はこちら
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
