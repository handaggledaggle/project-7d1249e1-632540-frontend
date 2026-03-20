"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabKey = "판매중" | "전체" | "종료";

type PortfolioItem = {
  id: string;
  title: string;
  meta: string;
  priceLabel: string;
  imageUrl: string;
  primaryCta?: string;
  secondaryCta?: string;
};

const ITEMS: Record<TabKey, PortfolioItem[]> = {
  판매중: [
    {
      id: "p1",
      title: "물의 표면 #1",
      meta: "한정판 프린트 · 30부 · 30x40cm",
      priceLabel: "₩180,000",
      imageUrl: "https://picsum.photos/seed/printtie-portfolio-1/900/600",
      primaryCta: "장바구니",
    },
    {
      id: "p2",
      title: "드로잉 시리즈 #3",
      meta: "오리지널 드로잉 · 21x29cm",
      priceLabel: "₩65,000",
      imageUrl: "https://picsum.photos/seed/printtie-portfolio-2/900/600",
      secondaryCta: "상세보기",
    },
    {
      id: "p3",
      title: "판화 #7",
      meta: "한정판 · 15부 · 25x35cm",
      priceLabel: "₩220,000",
      imageUrl: "https://picsum.photos/seed/printtie-portfolio-3/900/600",
      primaryCta: "장바구니",
    },
  ],
  전체: [
    {
      id: "a1",
      title: "아카이브 #12",
      meta: "프린트 · 40x60cm",
      priceLabel: "₩90,000",
      imageUrl: "https://picsum.photos/seed/printtie-portfolio-4/900/600",
      secondaryCta: "상세보기",
    },
    ...[1, 2, 3, 4, 5].map((n) => ({
      id: `a-${n}`,
      title: `아카이브 #${20 + n}`,
      meta: "드로잉 · 21x29cm",
      priceLabel: "₩45,000",
      imageUrl: `https://picsum.photos/seed/printtie-portfolio-all-${n}/900/600`,
      secondaryCta: "상세보기",
    })),
  ],
  종료: [
    {
      id: "e1",
      title: "완판 작품 #2",
      meta: "한정판 · 10부 · 종료",
      priceLabel: "SOLD OUT",
      imageUrl: "https://picsum.photos/seed/printtie-portfolio-ended/900/600",
      secondaryCta: "상세보기",
    },
  ],
};

export default function ArtistPortfolioTabs() {
  const [tab, setTab] = useState<TabKey>("판매중");
  const items = useMemo(() => ITEMS[tab], [tab]);

  return (
    <section className="w-full bg-[#E6FBFF] px-[32px] py-[40px]">
      <div className="mb-[20px] flex w-full flex-row items-center justify-between">
        <h2 className="text-[20px] text-printtie-text">포트폴리오</h2>
        <div className="flex flex-row gap-[12px]">
          {(["판매중", "전체", "종료"] as const).map((key) => {
            const active = tab === key;
            return (
              <Button
                key={key}
                type="button"
                variant="outline"
                onClick={() => setTab(key)}
                className={cn(
                  "h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] shadow-soft",
                  active ? "text-printtie-text" : "text-printtie-text2/80"
                )}
              >
                {key}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
        <div className="mb-[12px] flex flex-row items-center justify-between">
          <div className="text-[14px] text-printtie-text2/80">필터 · 정렬</div>
          <div className="text-[13px] text-printtie-primary/70">총 48개 작품</div>
        </div>

        <div className="grid w-full grid-cols-3 gap-[16px]">
          {items.map((it) => (
            <article key={it.id} className="border border-printtie-border bg-white p-[12px] shadow-soft">
              <Image
                src={it.imageUrl}
                alt={it.title}
                width={900}
                height={600}
                className="mb-[12px] h-[200px] w-full object-cover"
              />
              <h4 className="mb-[8px] text-[14px] text-printtie-text">{it.title}</h4>
              <p className="mb-[8px] text-[13px] text-printtie-text2/90">{it.meta}</p>
              <div className="flex flex-row items-center justify-between">
                <span className="text-[14px] text-printtie-text">{it.priceLabel}</span>
                {it.primaryCta ? (
                  <Button className="h-[36px] rounded-[6px] bg-printtie-primary px-[12px] text-white shadow-soft">
                    {it.primaryCta}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="h-[36px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text2 shadow-soft"
                  >
                    {it.secondaryCta ?? "상세보기"}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-[20px] flex w-full flex-row items-center justify-center">
          <Button
            variant="outline"
            className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[20px] text-printtie-text2 shadow-soft"
          >
            더 보기
          </Button>
        </div>
      </div>
    </section>
  );
}
