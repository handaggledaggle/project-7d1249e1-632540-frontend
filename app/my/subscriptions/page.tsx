import { Button } from "@/components/ui/button";
import SubscriptionsClient from "@/components/subscriptions/SubscriptionsClient";

export default function MySubscriptionsPage() {
  return (
    <main>
      <div className="mx-auto w-[1440px]">
        <header className="w-full border-b border-printtie-border bg-white px-[32px] py-[24px] shadow-[0_1px_0_rgba(6,182,212,0.03)]">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-printtie-text">My Subscriptions</h1>
              <p className="mt-[8px] text-[14px] text-printtie-text2/90">
                printtie — 작가와 팬을 잇는, 작품 발견에서 배송까지
              </p>
            </div>
            <div className="flex flex-row items-center gap-[12px]">
              <Button
                variant="outline"
                className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text shadow-soft"
              >
                구독 전체 관리
              </Button>
              <Button
                variant="outline"
                className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text shadow-soft"
              >
                알림 보기
              </Button>
            </div>
          </div>
        </header>

        <SubscriptionsClient />
      </div>
    </main>
  );
}
