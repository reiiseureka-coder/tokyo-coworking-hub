import Link from "next/link";
import Image from "next/image";
import { DoorOpen, Phone, Wifi, Zap } from "lucide-react";
import type { Facility } from "@/types";
import { RatingStars } from "./rating-stars";

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link
      href={`/facilities/${facility.slug}`}
      className="grid overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg lg:grid-cols-[320px,1fr]"
    >
      <div className="relative min-h-64">
        <Image
          src={facility.imageUrl}
          alt={facility.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 320px"
        />
      </div>
      <div className="flex flex-col justify-between gap-6 p-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-800">
              {facility.area}
            </span>
            {facility.featured ? (
              <span className="rounded-full bg-stone-900 px-3 py-1 font-medium text-white">
                おすすめ
              </span>
            ) : null}
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight text-stone-900">{facility.name}</h3>
              <div className="text-right">
                <div className="text-lg font-semibold text-stone-900">{facility.averageRating.toFixed(1)}</div>
                <div className="text-xs text-stone-500">{facility.reviewCount}件の口コミ</div>
              </div>
            </div>
            <RatingStars rating={facility.averageRating} />
            <p className="text-sm leading-6 text-stone-600">{facility.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-stone-600">
          <span>{facility.nearestStation} 徒歩{facility.walkMinutes}分</span>
          <span>{facility.priceInfo}</span>
          <span className="inline-flex items-center gap-1">
            <Wifi className={facility.hasWifi ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-stone-300"} />
            Wi-Fi
          </span>
          <span className="inline-flex items-center gap-1">
            <Zap className={facility.hasPower ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-stone-300"} />
            電源
          </span>
          <span className="inline-flex items-center gap-1">
            <Phone className={facility.canCall ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-stone-300"} />
            通話
          </span>
          <span className="inline-flex items-center gap-1">
            <DoorOpen
              className={facility.hasPrivateRoom ? "h-4 w-4 text-emerald-600" : "h-4 w-4 text-stone-300"}
            />
            個室
          </span>
        </div>
      </div>
    </Link>
  );
}
