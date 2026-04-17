import Link from "next/link";
import { Search } from "lucide-react";
import { FacilityCard } from "@/components/facility-card";
import { getFeaturedFacilities } from "@/lib/data";
import { AREAS } from "@/lib/constants";

const AREA_CARD_CONTENT = [
  {
    name: "港区",
    description: "商談や会食の前後にも使いやすい、上質なワークエリア。",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "千代田区",
    description: "東京駅・大手町まわりで移動の合間にも立ち寄りやすい。",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "渋谷区",
    description: "クリエイティブ職や打ち合わせ利用にも人気の定番エリア。",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "中央区",
    description: "落ち着いた街並みの中で、集中して作業しやすいエリア。",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "新宿区",
    description: "アクセス優先で選びたい人に使いやすい、拠点の多いエリア。",
    image:
      "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=1200",
  },
  {
    name: "品川区",
    description: "営業や出張の合間にも入りやすい、機動力のあるエリア。",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function HomePage() {
  const featured = getFeaturedFacilities(3);

  return (
    <div className="pb-20">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative overflow-hidden rounded-[2rem]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=2000')",
            }}
          />
          <div className="absolute inset-0 bg-stone-950/55" />

          <div className="relative z-10 px-8 py-20 text-center text-white sm:px-12 sm:py-28">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              東京で、最高の作業場所を。
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-100 sm:text-xl">
              静かさ、通話のしやすさ、設備。あなたの「こだわり」で選べるコワーキングスペース口コミサイト。
            </p>

            <form action="/facilities" className="mx-auto mt-10 max-w-4xl">
              <div className="flex items-center rounded-full bg-white px-4 py-3 shadow-2xl">
                <Search className="ml-1 h-5 w-5 shrink-0 text-stone-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="エリア、駅名で検索..."
                  className="min-w-0 flex-1 bg-transparent px-4 py-1 text-base text-stone-900 outline-none placeholder:text-stone-400 sm:text-lg"
                />
                <button
                  type="submit"
                  className="rounded-full bg-stone-950 px-8 py-3 text-sm font-medium text-white transition hover:bg-stone-800 sm:px-10 sm:text-base"
                >
                  検索
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">人気のエリアから探す</h2>
          </div>
          <Link href="/facilities" className="text-sm font-medium text-stone-700 hover:text-stone-900">
            すべて見る
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREA_CARD_CONTENT.map((area, index) => (
            <Link
              key={area.name}
              href={`/facilities?area=${encodeURIComponent(area.name)}`}
              className="group relative min-h-[220px] overflow-hidden rounded-[1.9rem] border border-stone-200 shadow-[0_18px_45px_rgba(28,25,23,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(28,25,23,0.12)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${area.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-950/35 via-stone-950/45 to-stone-950/78" />
              <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
                <div className="text-xs uppercase tracking-[0.28em] text-stone-200/90">
                  Area {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="text-4xl font-semibold tracking-tight">{area.name}</div>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-stone-100/95">
                    {area.description}
                  </p>
                  <div className="mt-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition group-hover:bg-white/15">
                    条件で絞り込む
                  </div>
                </div>
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
    </div>
  );
}
