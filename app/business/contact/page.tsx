import { InquiryForm } from "@/components/inquiry-form";

export default async function BusinessContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const facility = typeof params.facility === "string" ? params.facility : undefined;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Business Contact</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">法人向け問い合わせ</h1>
        <p className="mt-4 text-sm leading-7 text-stone-600">
          {facility
            ? `施設 ${facility} に関する相談を受けられるように、問い合わせ導線をページとして独立させています。`
            : "初期MVPでは資料請求ではなく問い合わせ送客を優先し、入力負荷を抑えたフォームにしています。"}
        </p>
      </div>
      <InquiryForm />
    </div>
  );
}
