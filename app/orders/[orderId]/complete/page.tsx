import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrderCompletePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  return (
    <main>
      <div className="mx-auto w-[1440px] px-[32px] py-[40px]">
        <section className="w-full border border-printtie-border bg-white p-[24px] shadow-mdsoft">
          <h1 className="text-[24px] text-printtie-text">주문이 완료되었습니다</h1>
          <p className="mt-[8px] text-[14px] text-printtie-text2/90">
            주문번호 <span className="text-printtie-text">#{orderId}</span>
          </p>

          <div className="mt-[20px] grid grid-cols-3 gap-[12px]">
            <div className="border border-printtie-border bg-[#F1FDFF] p-[12px]">
              <div className="text-[13px] text-printtie-text2/90">결제금액</div>
              <div className="text-[18px] text-printtie-text">₩125,000</div>
            </div>
            <div className="border border-printtie-border bg-[#F1FDFF] p-[12px]">
              <div className="text-[13px] text-printtie-text2/90">배송지</div>
              <div className="text-[14px] text-printtie-text">서울특별시 강남구 테헤란로 12</div>
            </div>
            <div className="border border-printtie-border bg-[#F1FDFF] p-[12px]">
              <div className="text-[13px] text-printtie-text2/90">예상 배송</div>
              <div className="text-[14px] text-printtie-text">결제 후 3~5일</div>
            </div>
          </div>

          <div className="mt-[20px] flex flex-row gap-[12px]">
            <Button asChild className="h-[44px] rounded-[6px] bg-printtie-primary px-[16px] text-white shadow-mdsoft">
              <Link href={`/orders/${orderId}`}>주문 상세로</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2"
            >
              <Link href="/feed">계속 쇼핑</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
