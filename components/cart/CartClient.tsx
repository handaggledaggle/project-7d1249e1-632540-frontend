"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CartItem = {
  id: string;
  title: string;
  artist: string;
  subtitle: string;
  priceLabel: string;
  options: string[];
  qty: number;
  thumbUrl: string;
};

export default function CartClient() {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          if (!mounted) return;
          setItems(data);
        } else {
          // fallback to INITIAL
          setItems(INITIAL);
        }
      } catch (e) {
        setItems(INITIAL);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const editing = useMemo(() => (items ? items.find((i) => i.id === editingId) ?? null : null), [items, editingId]);

  const inc = (id: string) =>
    setItems((prev) => (prev ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : prev));
  const dec = (id: string) =>
    setItems((prev) => (prev ? prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)) : prev));
  const remove = (id: string) => setItems((prev) => (prev ? prev.filter((i) => i.id !== id) : prev));

  if (!items) return <div className="w-full bg-[#E6FBFF]/60 px-[32px] py-[32px]">로딩 중...</div>;

  return (
    <>
      <main className="w-full bg-[#E6FBFF]/60 px-[32px] py-[32px]">
        <div className="flex w-full flex-row gap-[32px]">
          <section className="w-[880px] rounded-[6px] border border-printtie-border bg-white p-[20px] shadow-soft">
            <header className="mb-[20px]">
              <h2 className="mb-[12px] text-[18px] text-printtie-text">장바구니 ({items.length})</h2>
              <p className="text-[14px] text-printtie-text2/90">옵션을 확인하고 필요한 경우 수정하세요. 작가별 묶음 배송이 적용됩니다.</p>
            </header>

            <div className="flex w-full flex-col gap-[12px]">
              {items.map((it, idx) => (
                <article key={it.id} className={idx !== items.length - 1 ? "flex w-full flex-row items-start gap-[12px] border-b border-printtie-border pb-[12px]" : "flex w-full flex-row items-start gap-[12px]"}>
                  <Image src={it.thumbUrl} alt="작품 썸네일" width={96} height={96} className="h-[96px] w-[96px] rounded-[4px] bg-[#E6FBFF] object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex flex-row items-start justify-between">
                      <div>
                        <h3 className="text-[16px] text-printtie-text">{it.title} — {it.artist}</h3>
                        <p className="mt-[6px] text-[13px] text-printtie-text2/90">{it.subtitle}</p>
                      </div>
                      <div className="text-[16px] text-printtie-text">{it.priceLabel}</div>
                    </div>

                    <div className="mt-[10px] flex flex-row items-center gap-[12px]">
                      <div className="flex flex-row items-center gap-[8px]">
                        <span className="text-[13px] text-printtie-primary/60">옵션:</span>
                        {it.options.map((o) => (
                          <span key={o} className="text-[13px] text-printtie-text2/90">{o}</span>
                        ))}
                      </div>

                      <div className="ml-auto flex flex-row items-center gap-[8px]">
                        <Button type="button" variant="outline" onClick={() => dec(it.id)} className="h-[32px] rounded-[6px] border-printtie-border bg-white/70 px-[8px] text-printtie-text2">-</Button>
                        <input readOnly value={it.qty} className="h-[32px] w-[48px] rounded-[6px] border border-printtie-border bg-white text-center text-printtie-text2 outline-none" />
                        <Button type="button" variant="outline" onClick={() => inc(it.id)} className="h-[32px] rounded-[6px] border-printtie-border bg-white/70 px-[8px] text-printtie-text2">+</Button>
                        <Button type="button" variant="outline" onClick={() => setEditingId(it.id)} className="h-[32px] rounded-[6px] border-printtie-border bg-white/70 px-[12px] text-printtie-text2">옵션수정</Button>
                        <Button type="button" variant="outline" onClick={() => remove(it.id)} className="h-[32px] rounded-[6px] border-printtie-border bg-white/70 px-[12px] text-printtie-error">삭제</Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="mt-[20px] flex w-full flex-row items-center justify-between">
              <div className="text-[13px] text-printtie-text2/90">
                <p>총 작가 수: <span className="text-printtie-text">3</span></p>
                <p className="mt-[6px]">배송 그룹별 합산이 적용됩니다.</p>
              </div>
              <div className="flex flex-row items-center gap-[12px]">
                <Button type="button" variant="outline" className="h-[44px] rounded-[6px] border-printtie-border bg-white/80 px-[16px] text-printtie-text2">장바구니 저장</Button>
                <Button type="button" variant="outline" className="h-[44px] rounded-[6px] border-printtie-border bg-white/80 px-[16px] text-printtie-text2">선택 품목 저장</Button>
              </div>
            </aside>
          </section>

          <aside className="flex w-[400px] flex-col gap-[20px]">
            <section className="w-full rounded-[6px] border border-printtie-border bg-white p-[20px] shadow-soft">
              <h3 className="mb-[12px] text-[16px] text-printtie-text">주문 요약</h3>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-row justify-between text-[14px] text-printtie-text2/90"><span>상품 합계</span><span className="text-printtie-text">₩585,000</span></div>
                <div className="flex flex-row justify-between text-[14px] text-printtie-text2/90"><span>배송비</span><span>₩12,000</span></div>
                <div className="flex flex-row justify-between text-[14px] text-printtie-text2/90"><span>세금</span><span>₩58,700</span></div>
                <div className="mt-[12px] flex flex-row items-center justify-between border-t border-printtie-border pt-[12px]"><span className="text-[16px] text-printtie-text">총액</span><span className="text-[18px] text-printtie-text">₩655,700</span></div>
              </div>

              <div className="mt-[16px] text-[13px] text-printtie-text2/90">
                <p className="mb-[8px]">할인 코드 적용 또는 배송 옵션 변경은 결제 단계에서 확인할 수 있습니다.</p>
                <Button className="h-[44px] w-full rounded-[6px] bg-printtie-primary text-white shadow-mdsoft">결제 진행하기</Button>
              </div>
            </section>

            <section className="w-full rounded-[6px] border border-printtie-border bg-white p-[20px] shadow-soft">
              <h4 className="mb-[12px] text-[15px] text-printtie-text">다음 단계</h4>
              <div className="flex w-full flex-col gap-[12px]">
                <Button className="h-[44px] w-full rounded-[6px] bg-printtie-cta text-white shadow-mdsoft">체크아웃(결제로 이동)</Button>
                <div className="flex flex-row gap-[12px]">
                  <Button variant="outline" className="h-[44px] flex-1 rounded-[6px] border-printtie-border bg-white text-printtie-text2">계속 쇼핑</Button>
                  <Button variant="outline" className="h-[44px] flex-1 rounded-[6px] border-printtie-border bg-white text-printtie-text2">장바구니 저장</Button>
                </div>
              </div>
            </section>

            <section className="w-full rounded-[6px] border border-printtie-border bg-white p-[20px] shadow-soft">
              <h4 className="mb-[12px] text-[15px] text-printtie-text">이런 작품도 관심 있어할 수 있어요</h4>
              <ul className="flex flex-col gap-[12px]">
                {[{ title: "한정판 드로잉 — 작가D", meta: "사이즈: A3 · ₩80,000", seed: "reco-1" }, { title: "프린트 시리즈 — 작가E", meta: "사이즈: A2 · ₩34,000", seed: "reco-2" }].map((r) => (
                  <li key={r.seed} className="flex flex-row items-center gap-[12px]">
                    <Image src={`https://picsum.photos/seed/printtie-${r.seed}/112/112`} alt="추천작" width={56} height={56} className="h-[56px] w-[56px] rounded-[4px] bg-[#E6FBFF] object-cover" />
                    <div className="flex-1">
                      <p className="text-[13px] text-printtie-text">{r.title}</p>
                      <p className="text-[12px] text-printtie-text2/90">{r.meta}</p>
                    </div>
                    <Button type="button" variant="outline" className="h-[32px] rounded-[6px] border-printtie-border bg-white/80 px-[8px] text-printtie-text2">추가</Button>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </main>

      <Dialog open={!!editingId} onOpenChange={(open) => setEditingId(open ? editingId : null)}>
        <DialogContent className="max-w-[560px] border-printtie-border p-0">
          <div className="border border-printtie-border bg-white p-[20px] shadow-mdsoft">
            <DialogHeader>
              <DialogTitle className="text-[16px] text-printtie-text">옵션 수정</DialogTitle>
              <DialogDescription className="text-[13px] text-printtie-text2/90">사이즈, 액자, 원작/리프린트 여부를 선택하세요.</DialogDescription>
            </DialogHeader>

            <div className="mt-[12px] flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <label className="mb-[8px] text-[13px] text-printtie-text2/90">사이즈</label>
                <select className="h-[40px] rounded-[6px] border border-printtie-border bg-white px-[10px] text-printtie-text2 outline-none">
                  <option>선택하세요</option>
                  <option>A3</option>
                  <option>A2</option>
                  <option>M</option>
                  <option>원본</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-[8px] text-[13px] text-printtie-text2/90">액자</label>
                <select className="h-[40px] rounded-[6px] border border-printtie-border bg-white px-[10px] text-printtie-text2 outline-none">
                  <option>없음</option>
                  <option>심플 화이트</option>
                  <option>심플 블랙</option>
                  <option>우드</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-[8px] text-[13px] text-printtie-text2/90">원작 / 리프린트</label>
                <select className="h-[40px] rounded-[6px] border border-printtie-border bg-white px-[10px] text-printtie-text2 outline-none">
                  <option>리프린트</option>
                  <option>원작</option>
                </select>
              </div>

              <div className="mt-[8px] flex flex-row gap-[12px]">
                <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-[44px] flex-1 rounded-[6px] border-printtie-border bg-white text-printtie-text2">취소</Button>
                <Button type="button" variant="outline" onClick={() => setEditingId(null)} className="h-[44px] flex-1 rounded-[6px] border-printtie-border bg-white text-printtie-text shadow-soft">변경 적용</Button>
              </div>
            </div>

            {editing ? (
              <p className="mt-[12px] text-[12px] text-printtie-primary/60">편집 중: {editing.title} — {editing.artist}</p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

const INITIAL: CartItem[] = [
  {
    id: "c1",
    title: "작품 제목",
    artist: "작가명",
    subtitle: "한정판 리프린트",
    priceLabel: "₩120,000",
    options: ["사이즈: M", "액자: 없음"],
    qty: 1,
    thumbUrl: "https://picsum.photos/seed/printtie-cart-1/192/192",
  },
  {
    id: "c2",
    title: "포스터 컬렉션",
    artist: "작가B",
    subtitle: "리프린트",
    priceLabel: "₩45,000",
    options: ["사이즈: A2", "액자: 블랙"],
    qty: 2,
    thumbUrl: "https://picsum.photos/seed/printtie-cart-2/192/192",
  },
  {
    id: "c3",
    title: "원화 소품",
    artist: "작가C",
    subtitle: "원작",
    priceLabel: "₩420,000",
    options: ["사이즈: 원본", "배송: 특송"],
    qty: 1,
    thumbUrl: "https://picsum.photos/seed/printtie-cart-3/192/192",
  },
];
