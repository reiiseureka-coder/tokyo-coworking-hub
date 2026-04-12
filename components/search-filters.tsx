"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AREAS, STATIONS } from "@/lib/constants";

function boolFromParams(value: string | null) {
  return value === "1";
}

export function SearchFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const update = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <aside className="space-y-6 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-stone-900">絞り込み条件</h2>
        <p className="mt-1 text-sm text-stone-500">MVPでは使いやすい条件だけに絞っています。</p>
      </div>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-stone-700">キーワード</span>
        <input
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="エリア、駅名、施設名"
          className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              update("q", (event.target as HTMLInputElement).value);
            }
          }}
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-stone-700">エリア</span>
        <select
          value={searchParams.get("area") ?? ""}
          className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
          onChange={(event) => update("area", event.target.value || null)}
        >
          <option value="">指定なし</option>
          {AREAS.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-stone-700">駅名</span>
        <select
          value={searchParams.get("station") ?? ""}
          className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-stone-900"
          onChange={(event) => update("station", event.target.value || null)}
        >
          <option value="">指定なし</option>
          {STATIONS.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-3 text-sm">
        {[
          ["dropIn", "ドロップイン可能"],
          ["canCall", "通話可能"],
          ["privateRoom", "個室あり"],
          ["wifi", "Wi-Fiあり"],
          ["power", "電源あり"],
          ["stationNearby", "駅徒歩5分以内"],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-3 text-stone-700">
            <input
              type="checkbox"
              checked={boolFromParams(searchParams.get(key))}
              onChange={(event) => update(key, event.target.checked ? "1" : null)}
              className="h-4 w-4 rounded border-stone-300"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </aside>
  );
}
