import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, DoorOpen, ExternalLink, MapPin, Phone, TrainFront, Wifi, Zap } from "lucide-react";
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
  const gallery = facility.galleryImages?.length ? facility.galleryImages : [facility.imageUrl];
  const [heroImage, ...subImages] = gallery;

  const featureItems = [
    {
      enabled: facility.hasWifi,
      label: "Wi-Fi",
      detail: facility.hasWifi ? "高速回線あり" : "要確認",
      icon: Wifi,
    },
    {
      enabled: facility.hasPower,
      label: "電源",
      detail: facility.hasPower ? "全席近くで使いやすい" : "一部席のみ",
      icon: Zap,
    },
    {
      enabled: facility.canCall,
      label: "通話",
      detail: facility.canCall ? "オンライン会議しやすい" : "静音重視",
      icon: Phone,
    },
    {
      enabled: facility.hasPrivateRoom,
      label: "個室",
      detail: facility.hasPrivateRoom ? "集中用の個室あり" : "オープン席中心",
      icon: DoorOpen,
    },
  ] satisfies { enabled: boolean; label: string; detail: string; icon: LucideIcon }[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link
          href="/facilities"
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" />
          一覧に戻る
        </Link>
      </div>

      <section className="overflow-hidden rounded-[2.25rem] border border-stone-200 bg-white shadow-[0_20px_70px_rgba(28,25,23,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[1.35fr,0.65fr]">
          <div className="relative min-h-[420px] bg-stone-100">
            <Image src={heroImage} alt={facility.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 70vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 via-transparent to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-stone-200 bg-stone-50 p-3 lg:border-l lg:border-t-0">
            {subImages.slice(0, 4).map((image, index) => (
              <div key={`${facility.slug}-sub-${index}`} className="relative min-h-[130px] overflow-hidden rounded-[1.35rem] bg-stone-200">
                <Image
                  src={image}
                  alt={`${facility.name} の写真 ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1fr,320px] lg:px-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-white">
                {facility.area}
              </span>
              {facility.featured ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  注目施設
                </span>
              ) : null}
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                {facility.reviewCount}件の口コミ
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              {facility.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-stone-600">
              <span className="inline-flex items-center gap-2">
                <TrainFront className="h-4 w-4" />
                {facility.nearestStation} 徒歩{facility.walkMinutes}分
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {facility.address}
              </span>
            </div>

            <p className="mt-6 max-w-4xl text-base leading-8 text-stone-700">
              {facility.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard label="総合評価" value={facility.averageRating.toFixed(1)} detail={<RatingStars rating={facility.averageRating} />} />
              <StatCard label="料金の目安" value={facility.priceInfo} detail="ドロップイン / 月額の両方を想定" />
              <StatCard label="静かさ" value={`${facility.quietnessLevel}/5`} detail="集中作業しやすさの目安" />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Actions</div>
              <div className="mt-4 space-y-3">
                {facility.officialUrl ? (
                  <a
                    href={facility.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                  >
                    公式サイトを見る
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={`/facilities/${facility.slug}/review`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
                >
                  口コミを書く
                </Link>
                {facility.businessInquiryAvailable ? (
                  <Link
                    href={`/business/contact?facility=${facility.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-full border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
                  >
                    法人利用を問い合わせる
                  </Link>
                ) : null}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5">
              <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Quick Facts</div>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-stone-500">営業時間</dt>
                  <dd className="mt-1 font-medium text-stone-900">{facility.businessHours}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">席タイプ</dt>
                  <dd className="mt-1 font-medium text-stone-900">{facility.seatTypes.join(" / ")}</dd>
                </div>
                <div>
                  <dt className="text-stone-500">ドロップイン</dt>
                  <dd className="mt-1 font-medium text-stone-900">{facility.hasDropIn ? "対応" : "非対応"}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,320px]">
        <div className="space-y-8">
          <section className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Basic Info</div>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">基本情報</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <InfoItem label="住所" value={facility.address} />
              <InfoItem label="最寄駅" value={`${facility.nearestStation} 徒歩${facility.walkMinutes}分`} />
              <InfoItem label="営業時間" value={facility.businessHours} />
              <InfoItem label="料金" value={facility.priceInfo} />
              <InfoItem label="席タイプ" value={facility.seatTypes.join(" / ")} />
              <InfoItem label="エリア" value={`${facility.prefecture} ${facility.city} / ${facility.area}`} />
            </div>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-sm">
            <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Features</div>
            <h2 className="mt-2 text-2xl font-semibold text-stone-900">設備・使いやすさ</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {featureItems.map((item) => (
                <div key={item.label} className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
                  <item.icon className={`h-5 w-5 ${item.enabled ? "text-emerald-600" : "text-stone-300"}`} />
                  <div className="mt-4 text-lg font-semibold text-stone-900">{item.label}</div>
                  <div className="mt-2 text-sm leading-6 text-stone-600">{item.detail}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-stone-500">Reviews</div>
                <h2 className="mt-2 text-2xl font-semibold text-stone-900">口コミ</h2>
                <p className="mt-1 text-sm text-stone-500">
                  静かさや通話しやすさまで見える、作業者目線のレビューを並べています。
                </p>
              </div>
              <Link
                href={`/facilities/${facility.slug}/review`}
                className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
              >
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

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <div className="text-xs uppercase tracking-[0.24em] text-stone-500">For Business</div>
            <h2 className="mt-2 text-xl font-semibold text-stone-900">法人向け問い合わせ</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              会議室利用やチームでのドロップイン相談など、法人利用の窓口として使えるようにしています。
            </p>
          </div>
          <InquiryForm facilityId={facility.id} />
        </aside>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.6rem] border border-stone-200 bg-stone-50 px-5 py-5">
      <div className="text-xs uppercase tracking-[0.2em] text-stone-500">{label}</div>
      <div className="mt-3 text-2xl font-semibold tracking-tight text-stone-900">{value}</div>
      <div className="mt-2 text-sm text-stone-600">{detail}</div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-stone-500">{label}</div>
      <div className="mt-2 text-base leading-7 text-stone-900">{value}</div>
    </div>
  );
}
