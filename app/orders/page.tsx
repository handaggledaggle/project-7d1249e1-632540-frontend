import OrdersClient from "@/components/orders/OrdersClient";

export default function OrdersPage() {
  return (
    <main>
      <div className="mx-auto w-[1440px]">
        <header className="w-full border-b border-printtie-border bg-white px-[32px] py-[24px] backdrop-blur-sm">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-printtie-text">printtie</h1>
              <p className="text-[12px] text-printtie-text2/90">작가와 팬을 잇는, 작품 발견에서 배송까지</p>
            </div>
            <div className="flex flex-row items-center gap-[12px]">
              <button className="h-[40px] border border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">
                계정
              </button>
              <button className="h-[40px] border border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">
                고객센터
              </button>
            </div>
          </div>
        </header>

        <OrdersClient />
      </div>
    </main>
  );
}
