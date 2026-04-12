import { FacilityCard } from "@/components/facility-card";
import { SearchFilters } from "@/components/search-filters";
import { getFacilities } from "@/lib/data";

type SearchParams = Record<string, string | string[] | undefined>;

export default async function FacilitiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const facilities = await getFacilities({
    q: typeof params.q === "string" ? params.q : undefined,
    area: typeof params.area === "string" ? params.area : undefined,
    station: typeof params.station === "string" ? params.station : undefined,
    dropIn: params.dropIn === "1",
    canCall: params.canCall === "1",
    privateRoom: params.privateRoom === "1",
    wifi: params.wifi === "1",
    power: params.power === "1",
    stationNearby: params.stationNearby === "1",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Search</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">施設一覧と検索</h1>
        <p className="mt-4 text-base leading-8 text-stone-600">
          MVPでは、作業場所を選ぶときに迷いやすい条件を中心に絞り込めるようにしています。
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[300px,1fr]">
        <SearchFilters />
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
            <div>
              <div className="text-sm text-stone-500">検索結果</div>
              <div className="text-2xl font-semibold text-stone-900">{facilities.length}件</div>
            </div>
            <div className="text-sm text-stone-500">並び順: おすすめ順</div>
          </div>

          {facilities.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center text-sm leading-7 text-stone-600">
              条件に合う施設が見つかりませんでした。まずはエリアや駅名を外して広めに探すのがおすすめです。
            </div>
          ) : (
            <div className="grid gap-6">
              {facilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
