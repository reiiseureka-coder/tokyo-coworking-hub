import type { Review } from "@/types";
import { formatDate, formatRole } from "@/lib/utils";
import { RatingStars } from "./rating-stars";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-stone-900">{review.userName}</div>
          <div className="mt-1 text-sm text-stone-500">
            {formatRole(review.userRole)} ・ 利用日 {formatDate(review.visitedAt)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold text-stone-900">{review.rating.toFixed(1)}</div>
          <RatingStars rating={review.rating} className="justify-end" />
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-stone-700">{review.comment}</p>

      <dl className="mt-5 grid gap-3 rounded-2xl bg-stone-50 p-4 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-stone-500">静かさ</dt>
          <dd className="font-medium text-stone-900">{review.quietnessRating}/5</dd>
        </div>
        <div>
          <dt className="text-stone-500">通話しやすさ</dt>
          <dd className="font-medium text-stone-900">{review.callEaseRating}/5</dd>
        </div>
        <div>
          <dt className="text-stone-500">設備満足度</dt>
          <dd className="font-medium text-stone-900">{review.equipmentRating}/5</dd>
        </div>
      </dl>
    </article>
  );
}
