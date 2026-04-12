import Image from "next/image";
import Link from "next/link";
import { DoorOpen, MapPin, Phone, Wifi, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { InquiryForm } from "@/components/inquiry-form";
import { RatingStars } from "@/components/rating-stars";
import { ReviewCard } from "@/components/review-card";
import { getFacilityBySlug, getReviewsForFacility } from "@/lib/data";

export default async function FacilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone-900">施設が見つかりませんでした</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          URLが変わった可能性があります。施設一覧から探し直してください。
        </p>
      </div>
    );
  }

  const reviews = await getReviewsForFacility(facility.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.25fr,0.75fr]">
        <div className="space-y-8">
          <div className="relative min-h-[380px] overflow-hidden rounded-[2.5rem] border border-stone-200 shadow-xl">
            <Image src={facility.imageUrl} alt={facility.name} fill className="object-cover" sizes="100vw" />
          </div>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800">{facility.area}</span>
              {facility.featured ? <span className="rounded-full bg-stone-900 px-3 py-1 text-sm font-medium text-white">おすすめ</span> : null}
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{facility.name}</h1>
                <div className="mt-3 flex items-center gap-3 text-sm text-stone-500">
                  <span className="inline-flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {facility.nearestStation} 徒歩{facility.walkMinutes}分
                  </span>
                  <span>{facility.businessHours}</span>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-stone-50 px-5 py-4 text-right">
                <div className="text-3xl font-semibold text-stone-900">{facility.averageRating.toFixed(1)}</div>
                <RatingStars rating={facility.averageRating} className="justify-end" />
                <div className="mt-1 text-xs text-stone-500">{facility.reviewCount}件の口コミ</div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-8 text-stone-700">{facility.description}</p>
          </section>

          <section className="grid gap-6 rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-stone-900">基本情報</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-stone-500">住所</dt>
                  <dd className="mt-1 text-stone-900">{facility.address}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">料金</dt>
                  <dd className="mt-1 text-stone-900">{facility.priceInfo}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">営業時間</dt>
                  <dd className="mt-1 text-stone-900">{facility.businessHours}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">席タイプ</dt>
                  <dd className="mt-1 text-stone-900">{facility.seatTypes.join(" / ")}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-stone-900">使いやすさ</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {([
                  [facility.hasWifi, "Wi-Fi", Wifi],
                  [facility.hasPower, "電源", Zap],
                  [facility.canCall, "通話可能", Phone],
                  [facility.hasPrivateRoom, "個室あり", DoorOpen],
                ] as [boolean, string, LucideIcon][]).map(([enabled, label, Icon]) => (
                  <div key={String(label)} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                    <Icon className={`h-5 w-5 ${enabled ? "text-emerald-600" : "text-stone-300"}`} />
                    <div className="mt-3 font-medium text-stone-900">{label}</div>
                    <div className="mt-1 text-xs text-stone-500">{enabled ? "対応" : "未対応"}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-stone-900 px-5 py-4 text-white">
                <div className="text-sm text-stone-300">静かさの目安</div>
                <div className="mt-2 text-2xl font-semibold">{facility.quietnessLevel}/5</div>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-stone-900">口コミ</h2>
                <p className="mt-1 text-sm text-stone-500">静かさや通話しやすさまで見える、作業者目線のレビューです。</p>
              </div>
              <Link href={`/facilities/${facility.slug}/review`} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700">
                口コミを書く
              </Link>
            </div>
            <div className="grid gap-5">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <div className="text-sm uppercase tracking-[0.2em] text-stone-500">Booking</div>
            <div className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">{facility.priceInfo}</div>
            <div className="mt-4 text-sm leading-7 text-stone-600">
              個人利用の比較を主軸にしつつ、法人送客にもつなげやすい導線を右側にまとめています。
            </div>
            <div className="mt-6 space-y-3">
              {facility.officialUrl ? (
                <a href={facility.officialUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700">
                  公式サイトを見る
                </a>
              ) : null}
              {facility.businessInquiryAvailable ? (
                <Link href={`/business/contact?facility=${facility.slug}`} className="inline-flex w-full items-center justify-center rounded-full border border-stone-300 px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900">
                  法人利用を問い合わせる
                </Link>
              ) : null}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-stone-900">法人向け問い合わせ</h2>
            <InquiryForm facilityId={facility.id} />
          </div>
        </aside>
      </div>
    </div>
  );
}
