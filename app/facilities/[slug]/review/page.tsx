import { ReviewForm } from "@/components/review-form";
import { getFacilityBySlug } from "@/lib/data";

export default async function ReviewPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const facility = await getFacilityBySlug(slug);

  if (!facility) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-stone-900">施設が見つかりませんでした</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Review</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">{facility.name} の口コミを投稿</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          初期MVPでは、入力項目を増やしすぎず、投稿率が落ちにくい範囲に絞っています。
        </p>
      </div>
      <ReviewForm facilityId={facility.id} facilitySlug={facility.slug} />
    </div>
  );
}
