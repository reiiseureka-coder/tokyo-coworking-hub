import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Users } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";

export default function BusinessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2.5rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="inline-flex rounded-full bg-stone-900 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white">
          For Business
        </div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          法人利用・シェアオフィス契約を
          <br />
          相談しやすくする。
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-stone-600">
          初期MVPでは、資料DLよりも問い合わせ送客を優先します。右上導線から迷わずたどり着けて、利用人数や希望エリアを相談しやすい構成にしています。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/business/contact" className="inline-flex items-center rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
            問い合わせる
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/facilities" className="inline-flex items-center rounded-full border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900">
            対象施設を見る
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          {
            icon: Building2,
            title: "エリアと用途で相談しやすい",
            body: "新宿、渋谷、東京駅周辺など、導入したいエリアから候補施設を絞り込めます。",
          },
          {
            icon: Users,
            title: "少人数から複数拠点まで想定",
            body: "営業メンバーの一時利用、採用面接、サテライトオフィス利用まで見据えています。",
          },
          {
            icon: CheckCircle2,
            title: "将来の送客収益につながる導線",
            body: "問い合わせデータを蓄積しながら、優先掲載や特集掲載へ発展しやすい構造です。",
          },
        ].map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <item.icon className="h-6 w-6 text-stone-900" />
            <h2 className="mt-4 text-xl font-semibold text-stone-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[0.85fr,1.15fr]">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-stone-900">こんな相談を想定しています</h2>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-stone-600">
            <li>営業チームが都内で使いやすいドロップイン施設を探したい</li>
            <li>フルリモート組向けに、法人契約できる候補を比較したい</li>
            <li>静かな個室や会議室がある施設を絞り込みたい</li>
            <li>まずは数拠点だけ試し、反応を見ながら広げたい</li>
          </ul>
        </div>
        <InquiryForm />
      </section>
    </div>
  );
}
