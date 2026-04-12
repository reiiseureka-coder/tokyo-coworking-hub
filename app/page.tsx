import Link from "next/link";
import { ArrowRight, Building2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { FacilityCard } from "@/components/facility-card";
import { getFeaturedFacilities } from "@/lib/data";
import { AREAS } from "@/lib/constants";

export default function HomePage() {
  const featured = getFeaturedFacilities(3);

  return (
    <div className="pb-20">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-20">
        <div className="rounded-[2.5rem] bg-stone-900 px-8 py-10 text-white shadow-2xl sm:px-10">
          <div className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-stone-300">
            Tokyo-first MVP
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            東京で、今日の作業場所を
            <br />
            迷わず見つける。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
            静かさ、通話のしやすさ、電源やWi-Fiまで。作業実態に直結する条件でコワーキングスペースを比較できる口コミサイトです。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/facilities" className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-200">
              施設を探す
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/business" className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5">
              法人の方はこちら
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-900">
              <Search className="h-5 w-5" />
              <h2 className="text-lg font-semibold">重視する検索軸</h2>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-stone-600">
              {["静かさ", "通話可", "個室", "Wi-Fi", "電源", "駅近", "ドロップイン"].map((item) => (
                <span key={item} className="rounded-full bg-stone-100 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 text-stone-900">
              <Building2 className="h-5 w-5" />
              <h2 className="text-lg font-semibold">法人導線も同時に整備</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              右上導線から法人ページへ。問い合わせ送客を前提にした構成で、将来の収益化につながる土台を先に持たせています。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Popular Areas</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">人気エリアから探す</h2>
          </div>
          <Link href="/facilities" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            すべての施設を見る
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((area, index) => (
            <Link
              key={area}
              href={`/facilities?area=${encodeURIComponent(area)}`}
              className="group relative overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-80" />
              <div className="text-sm uppercase tracking-[0.25em] text-stone-400">Area {index + 1}</div>
              <div className="mt-5 text-2xl font-semibold tracking-tight text-stone-900">{area}</div>
              <div className="mt-3 inline-flex items-center text-sm text-stone-600 transition group-hover:text-stone-900">
                条件で絞り込む
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Featured</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">まず見てほしい施設</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-6">
          {featured.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        {[
          {
            icon: Sparkles,
            title: "個人利用の探しやすさを優先",
            body: "MVPではフリーランス、学生、営業職が比較しやすい条件に集中します。",
          },
          {
            icon: ShieldCheck,
            title: "あとから拡張しやすいデータ設計",
            body: "おすすめ順や法人送客、将来の広告掲載を見据えた項目を先に持たせています。",
          },
          {
            icon: Building2,
            title: "打ち合わせ前にも確認しやすい",
            body: "Vercelへ早めに載せて、友人と見ながら画面・導線・文言を直しやすい構成です。",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <item.icon className="h-6 w-6 text-stone-900" />
            <h3 className="mt-4 text-xl font-semibold text-stone-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
