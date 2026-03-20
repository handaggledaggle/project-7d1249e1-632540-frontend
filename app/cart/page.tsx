import { Button } from "@/components/ui/button";
import CartClient from "@/components/cart/CartClient";

export default function CartPage() {
  return (
    <main>
      <div className="mx-auto w-[1440px]">
        <header className="w-full bg-white px-[32px] py-[24px] shadow-soft">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-printtie-text">printtie</h1>
              <p className="text-[12px] text-printtie-text2/90">작가와 팬을 잇는, 작품 발견에서 배송까지</p>
            </div>
            <div className="flex flex-row items-center gap-[12px]">
              <Button
                variant="outline"
                className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft"
              >
                계속 쇼핑
              </Button>
              <Button
                variant="outline"
                className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft"
              >
                내 계정
              </Button>
            </div>
          </div>
        </header>

        <CartClient />

        <section className="w-full border-t border-printtie-border bg-white px-[32px] py-[32px]">
          <div className="flex w-full flex-row items-start gap-[24px]">
            <div className="flex w-[280px] flex-col">
              <h3 className="text-[18px] text-printtie-text">장바구니가 비어 있습니다</h3>
              <p className="mt-[8px] text-[13px] text-printtie-text2/90">
                좋아하는 작가의 작품을 발견하고 장바구니에 담아보세요. 옵션 비교 후 결제까지
                자연스럽게 이어집니다.
              </p>
              <div className="mt-[16px] flex flex-row gap-[12px]">
                <Button
                  variant="outline"
                  className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2"
                >
                  추천 작품 보기
                </Button>
                <Button
                  variant="outline"
                  className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2"
                >
                  구매 가이드
                </Button>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-[12px]">
              <h4 className="text-[15px] text-printtie-text">추천 작품</h4>
              <ul className="flex flex-row gap-[12px]">
                <li className="h-[160px] w-[160px] rounded-[4px] bg-[#E6FBFF]" />
                <li className="h-[160px] w-[160px] rounded-[4px] bg-[#E6FBFF]" />
                <li className="h-[160px] w-[160px] rounded-[4px] bg-[#E6FBFF]" />
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
