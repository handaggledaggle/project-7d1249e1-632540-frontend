import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <main>
      <div className="mx-auto w-[1440px] bg-[#E6FBFF] px-[32px] py-[32px]">
        <div className="mb-[16px]">
          <Button
            asChild
            variant="outline"
            className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2"
          >
            <Link href="/orders">← 주문 목록으로</Link>
          </Button>
        </div>

        <div className="flex flex-row gap-[24px]">
          <section className="flex-1 border border-printtie-border bg-white p-[20px] shadow-soft">
            <div className="flex flex-row items-start justify-between">
              <div>
                <p className="text-[14px] text-printtie-text2/90">주문번호</p>
                <h1 className="text-[22px] text-printtie-text">#{orderId}</h1>
                <p className="mt-[6px] text-[12px] text-printtie-primary/60">주문일 2026-03-15 · 결제수단: 신용카드</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] text-printtie-text2/90">주문 상태</p>
                <p className="text-[16px] text-printtie-text">배송중</p>
              </div>
            </div>

            <div className="mt-[20px] grid grid-cols-2 gap-[16px]">
              <div className="border border-printtie-border bg-[#F1FDFF] p-[12px]">
                <h2 className="mb-[8px] text-[14px] text-printtie-text">배송 정보</h2>
                <p className="text-[13px] text-printtie-text2/90">택배사: 한빛택배</p>
                <p className="text-[13px] text-printtie-text2/90">운송장: HB123456789KR</p>
              </div>
              <div className="border border-printtie-border bg-[#F1FDFF] p-[12px]">
                <h2 className="mb-[8px] text-[14px] text-printtie-text">결제 정보</h2>
                <p className="text-[13px] text-printtie-text2/90">결제금액: ₩48,000</p>
                <p className="text-[13px] text-printtie-text2/90">상태: 결제완료</p>
              </div>
            </div>

            <div className="mt-[16px] flex flex-row gap-[12px]">
              <Button className="h-[44px] rounded-[10px] bg-printtie-primary px-[16px] text-white shadow-mdsoft">
                반품/교환 요청
              </Button>
              <Button
                variant="outline"
                className="h-[44px] rounded-[10px] border-printtie-border bg-white px-[16px] text-printtie-text2"
              >
                영수증 다운로드
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-[44px] rounded-[10px] border-printtie-border bg-white px-[16px] text-printtie-text2"
              >
                <Link href={`/orders/${orderId}/complete`}>주문완료 화면 보기</Link>
              </Button>
            </div>
          </section>

          <aside className="w-[320px] border border-printtie-border bg-white p-[16px] shadow-soft">
            <h3 className="mb-[8px] text-[14px] text-printtie-text">안내</h3>
            <p className="text-[13px] text-printtie-text2/90">
              이 페이지는 UI-only 목업입니다. 실제 주문 데이터/추적 이벤트는 다음 단계에서 API로 연결됩니다.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
