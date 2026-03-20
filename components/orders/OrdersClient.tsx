"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { OrderListItemDTO } from "@/lib/types";

export default function OrdersClient() {
  const [orders, setOrders] = useState<OrderListItemDTO[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("주문을 불러오는 중 오류가 발생했습니다.");
        const data = await res.json();
        if (!mounted) return;
        setOrders(data);
        setSelectedId(data[0]?.id ?? null);
      } catch (err) {
        setError((err as Error).message);
        setOrders(ORDERS);
        setSelectedId(ORDERS[0]?.id ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const selected = useMemo(() => (orders ? orders.find((o) => o.id === selectedId) ?? orders[0] : ORDERS[0]), [orders, selectedId]);

  if (loading) return <main className="w-full bg-[#E6FBFF] px-[32px] py-[32px]">로딩 중...</main>;
  if (error) return <main className="w-full bg-[#E6FBFF] px-[32px] py-[32px] text-printtie-error">{error}</main>;

  return (
    <main className="w-full bg-[#E6FBFF] px-[32px] py-[32px]">
      <div className="flex w-full flex-row gap-[24px]">
        <section className="flex w-[520px] flex-col gap-[16px] border border-printtie-border bg-white p-[16px] shadow-soft">
          <header>
            <h2 className="mb-[16px] text-[18px] text-printtie-text">주문 목록</h2>
            <div className="mb-[12px] flex flex-row gap-[12px]">
              {["전체", "배송중", "배송완료", "반품/교환"].map((f) => (
                <Button key={f} type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2 hover:bg-[#E6FBFF]">{f}</Button>
              ))}
            </div>
            <div className="flex flex-row items-center gap-[8px]">
              <input className="h-[40px] w-full border border-printtie-border bg-white px-[10px] text-[14px] text-printtie-text2 outline-none" placeholder="주문번호 또는 작품명 검색" />
              <select className="h-[40px] border border-printtie-border bg-white px-[10px] text-[14px] text-printtie-text2 outline-none">
                <option>전체 기간</option>
                <option>지난 30일</option>
                <option>지난 90일</option>
              </select>
            </div>
          </header>

          <div className="flex flex-col gap-[12px] overflow-y-auto" style={{ maxHeight: 560 }}>
            {orders?.map((o) => (
              <button key={o.id} type="button" onClick={() => setSelectedId(o.id)} className={"text-left border border-printtie-border p-[12px] shadow-soft " + (selectedId === o.id ? "bg-[#F1FDFF]" : "bg-white")}>
                <div className="flex flex-row items-start justify-between">
                  <div className="flex flex-col">
                    <p className="text-[14px] text-printtie-text2/90">주문번호 <span className="text-printtie-primary/60">#{o.id}</span></p>
                    <p className="text-[12px] text-printtie-primary/60">{o.createdAtLabel} · {o.paymentLabel}</p>
                  </div>
                  <div className="text-[14px] text-printtie-text2/90">{o.statusLabel}</div>
                </div>

                <div className="mt-[8px] flex flex-row items-center gap-[8px]">
                  <Image src={o.thumbUrl} alt="작품 썸네일" width={56} height={56} className="h-[56px] w-[56px] bg-[#E6FBFF] object-cover" />
                  <div className="flex flex-col">
                    <p className="text-[14px] text-printtie-text">{o.artworkTitle}</p>
                    <p className="text-[12px] text-printtie-text2/90">{o.artworkOptionLabel}</p>
                  </div>
                  <div className="ml-auto text-[14px] text-printtie-text2/90">{o.priceLabel}</div>
                </div>

                <div className="mt-[8px] flex flex-row gap-[8px]">
                  <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2" asChild onClick={(e) => e.stopPropagation()}>
                    <Link href={`/orders/${o.id}`}>상세보기</Link>
                  </Button>
                  <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2" onClick={(e) => e.stopPropagation()}>배송조회</Button>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-1 flex-col gap-[24px]">
          <div className="border border-printtie-border bg-white p-[20px] shadow-soft">
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col">
                <p className="text-[14px] text-printtie-text2/90">주문번호</p>
                <h2 className="mb-[12px] text-[18px] text-printtie-text">#{selected?.id}</h2>
                <p className="text-[12px] text-printtie-primary/60">{selected?.createdAtLabel} · 결제수단: 신용카드</p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[14px] text-printtie-text2/90">주문 상태</p>
                <p className="text-[16px] text-printtie-text">{selected?.statusLabel}</p>
              </div>
            </div>
          </div>

          <section className="border border-printtie-border bg-white p-[20px] shadow-soft">
            <h3 className="mb-[16px] text-[16px] text-printtie-text">주문 항목</h3>
            <article className="flex flex-row items-start gap-[12px] border border-printtie-border p-[12px]">
              <Image src={selected?.thumbUrl ?? "https://picsum.photos/seed/printtie-order-fallback/112/112"} alt="작품 썸네일" width={96} height={96} className="h-[96px] w-[96px] bg-[#E6FBFF] object-cover" />
              <div className="flex flex-col">
                <p className="text-[14px] text-printtie-text">{selected?.artworkTitle}</p>
                <p className="text-[12px] text-printtie-text2/90">{selected?.artworkOptionLabel}</p>
                <p className="text-[12px] text-printtie-text2/90">작가: —</p>
                <p className="text-[12px] text-printtie-primary/60">수량 1</p>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <p className="text-[14px] text-printtie-text2/90">{selected?.priceLabel}</p>
                <p className="text-[12px] text-printtie-primary/60">배송비: ₩3,000</p>
              </div>
            </article>

            <div className="mt-[12px] flex flex-col gap-[8px] border-t border-printtie-border pt-[12px] text-[14px]">
              <div className="flex flex-row justify-between"><span className="text-printtie-text2/90">상품합계</span><span className="text-printtie-text">₩45,000</span></div>
              <div className="flex flex-row justify-between"><span className="text-printtie-text2/90">배송비</span><span className="text-printtie-text">₩3,000</span></div>
              <div className="flex flex-row justify-between"><span className="text-printtie-text2/90">할인</span><span className="text-printtie-text">₩0</span></div>
              <div className="flex flex-row justify-between"><span className="text-printtie-text2/90">결제금액</span><span className="text-printtie-text">₩48,000</span></div>
            </div>
          </section>

          <section className="border border-printtie-border bg-white p-[20px] shadow-soft">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">배송 정보</h3>
            <div className="mb-[12px] flex flex-row items-center gap-[16px]">
              <div className="flex flex-col"><p className="text-[14px] text-printtie-text2/90">택배사</p><p className="text-[14px] text-printtie-text">한빛택배</p></div>
              <div className="flex flex-col"><p className="text-[14px] text-printtie-text2/90">운송장 번호</p><p className="text-[14px] text-printtie-text">HB123456789KR</p></div>
              <div className="ml-auto"><Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">택배사 사이트에서 보기</Button></div>
            </div>

            <div className="flex flex-col gap-[12px]">
              {[{ dot: "bg-printtie-cta", title: "2026-03-16 10:12 · 집하완료", sub: "서울 강남구 → 출발지" }, { dot: "bg-printtie-primary", title: "2026-03-17 08:45 · 배송중", sub: "배송기사 배차 완료" }, { dot: "bg-printtie-border", title: "예정 · 배송완료", sub: "도착 후 배송완료로 업데이트" }].map((t) => (
                <div key={t.title} className="flex flex-row items-start gap-[12px]"><div className={`mt-[6px] h-[8px] w-[8px] rounded-full ${t.dot}`} /><div className="flex flex-col"><p className="text-[13px] text-printtie-text2/90">{t.title}</p><p className="text-[12px] text-printtie-primary/60">{t.sub}</p></div></div>
              ))}
            </div>
          </section>

          <section className="border border-printtie-border bg-white p-[20px] shadow-soft">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">요청하기</h3>
            <div className="mb-[12px] flex flex-row gap-[12px]">
              <Button className="h-[44px] rounded-[10px] bg-printtie-primary px-[16px] text-white shadow-mdsoft">반품/교환 요청</Button>
              <Button variant="outline" className="h-[44px] rounded-[10px] border-printtie-border bg-white px-[16px] text-printtie-text2">판매자에 문의</Button>
              <Button variant="outline" className="h-[44px] rounded-[10px] border-printtie-border bg-white px-[16px] text-printtie-text2">영수증 다운로드</Button>
            </div>

            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col"><p className="text-[14px] text-printtie-text2/90">배송지 변경</p><p className="text-[12px] text-printtie-primary/60">상품 출고 전만 변경 가능합니다</p></div>
                <Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">배송지 변경</Button>
              </div>

              <div className="flex flex-col">
                <label className="mb-[8px] text-[13px] text-printtie-text2/90">반품/교환 사유</label>
                <textarea className="h-[80px] w-full border border-printtie-border bg-white p-[8px] text-printtie-text2 outline-none" placeholder="상세 사유를 적어주세요" />
                <div className="mt-[8px] flex flex-row gap-[8px]">
                  <Button className="h-[44px] rounded-[10px] bg-printtie-primary px-[16px] text-white shadow-mdsoft">요청 제출</Button>
                  <Button variant="outline" className="h-[44px] rounded-[10px] border-printtie-border bg-white px-[16px] text-printtie-text2">임시저장</Button>
                </div>
              </div>
            </div>
          </section>

          <section className="border border-printtie-border bg-white p-[20px] shadow-soft">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">정책 및 영수증</h3>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <p className="text-[14px] text-printtie-text2/90">반품 정책</p>
                <p className="mb-[8px] text-[12px] text-printtie-primary/60">상품 수령 후 7일 이내, 작품 및 액자 훼손 시 반품 불가. 상세 정책은 아래 링크에서 확인하세요.</p>
                <div className="flex flex-row gap-[8px]"><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">반품정책 보기</Button><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">교환정책 보기</Button></div>
              </div>

              <div className="flex flex-row items-center justify-between border-t border-printtie-border pt-[12px]">
                <div className="flex flex-col"><p className="text-[14px] text-printtie-text2/90">영수증</p><p className="text-[12px] text-printtie-primary/60">전자 영수증(PDF)으로 발행됩니다</p></div>
                <div className="flex flex-row gap-[8px]"><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">영수증 다운로드</Button><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">이메일로 보내기</Button></div>
              </div>
            </div>
          </section>
        </section>

        <aside className="flex w-[320px] flex-col gap-[24px]">
          <div className="border border-printtie-border bg-white p-[16px] shadow-soft">
            <h4 className="mb-[8px] text-[14px] text-printtie-text">배송지</h4>
            <p className="text-[13px] text-printtie-text2/90">홍길동 · 010-1234-5678</p>
            <p className="text-[12px] text-printtie-primary/60">서울특별시 강남구 강남대로 123, 5층 (역삼동)</p>
            <div className="mt-[12px] flex flex-row gap-[8px]"><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">편집</Button><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">기본배송지로 설정</Button></div>
          </div>

          <div className="border border-printtie-border bg-white p-[16px] shadow-soft">
            <h4 className="mb-[8px] text-[14px] text-printtie-text">배송 관련 문의</h4>
            <p className="text-[13px] text-printtie-text2/90">배송 지연이나 분실 시 고객센터에 문의하세요.</p>
            <div className="mt-[12px] flex flex-row gap-[8px]"><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">CS 문의하기</Button><Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2">운송장 재조회</Button></div>
          </div>
        </aside>
      </div>
    </main>
  );
}

const ORDERS: OrderListItemDTO[] = [
  {
    id: "20260317-0012",
    createdAtLabel: "주문일 2026-03-15",
    paymentLabel: "결제완료",
    statusLabel: "배송중",
    artworkTitle: "작품명: 꽃의 연대기",
    artworkOptionLabel: "옵션: A4 · 무광액자",
    priceLabel: "₩45,000",
    thumbUrl: "https://picsum.photos/seed/printtie-order-1/112/112",
  },
  {
    id: "20260310-0098",
    createdAtLabel: "주문일 2026-03-10",
    paymentLabel: "결제완료",
    statusLabel: "배송완료",
    artworkTitle: "작품명: 도시의 오후",
    artworkOptionLabel: "옵션: A3 · 유광",
    priceLabel: "₩68,000",
    thumbUrl: "https://picsum.photos/seed/printtie-order-2/112/112",
  },
];
