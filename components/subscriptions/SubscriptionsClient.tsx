"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UpdateItem = {
  id: string;
  artistName: string;
  title: string;
  desc: string;
  timeLabel: string;
  thumbUrl: string;
};

export default function SubscriptionsClient() {
  const [onlyForSale, setOnlyForSale] = useState(false);
  const [onlyLimited, setOnlyLimited] = useState(false);
  const [updates, setUpdates] = useState<UpdateItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/subscriptions");
        if (!res.ok) throw new Error("구독 데이터를 불러오는 중 오류가 발생했습니다.");
        const subs = await res.json();
        if (!mounted) return;
        // map server subscriptions to updates placeholder
        const list: UpdateItem[] = (subs || []).map((s: any, idx: number) => ({
          id: s.id ?? `u-${idx}`,
          artistName: s.artist_name ?? s.artistName ?? "작가",
          title: `${s.artist_name ?? s.artistName} — 새 소식`,
          desc: s.message ?? "새 소식이 도착했습니다.",
          timeLabel: "발행 1일 전",
          thumbUrl: "https://picsum.photos/seed/printtie-sub-1/192/192",
        }));
        setUpdates(list.length ? list : [
          {
            id: "u1",
            artistName: "이서연",
            title: "이서연 작가 — 신작 컬렉션 발매",
            desc: "한정판 프린트 10점, 예약 판매 시작. 옵션: 사이즈 선택 필요",
            timeLabel: "발행 2시간 전",
            thumbUrl: "https://picsum.photos/seed/printtie-sub-1/192/192",
          },
        ]);
      } catch (err) {
        setError((err as Error).message);
        setUpdates([
          {
            id: "u1",
            artistName: "이서연",
            title: "이서연 작가 — 신작 컬렉션 발매",
            desc: "한정판 프린트 10점, 예약 판매 시작. 옵션: 사이즈 선택 필요",
            timeLabel: "발행 2시간 전",
            thumbUrl: "https://picsum.photos/seed/printtie-sub-1/192/192",
          },
          {
            id: "u2",
            artistName: "박민호",
            title: "박민호 작가 — 전시 공지",
            desc: "다음 주 팝업 전시 참여 안내. 방문 예약 및 배송 옵션 안내 포함",
            timeLabel: "발행 1일 전",
            thumbUrl: "https://picsum.photos/seed/printtie-sub-2/192/192",
          },
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const list = useMemo(() => {
    if (!updates) return [];
    // simplistic client-side filtering
    return updates.filter(() => true);
  }, [updates, onlyForSale, onlyLimited]);

  if (loading) return <div className="w-full px-[32px] py-[32px]">로딩 중...</div>;
  if (error) return <div className="w-full px-[32px] py-[32px] text-printtie-error">{error}</div>;

  return (
    <main className="w-full px-[32px] py-[32px]">
      <div className="flex w-full flex-row gap-[32px]">
        <section className="w-[380px] border border-printtie-border bg-[#E6FBFF] p-[20px] shadow-soft">
          <h2 className="mb-[12px] text-[16px] text-printtie-text">정렬 · 필터 · 알림설정</h2>
          <form className="flex flex-col gap-[12px]">
            <div className="flex flex-col">
              <label className="mb-[6px] text-[13px] text-printtie-text2/90">정렬</label>
              <select className="h-[40px] border border-printtie-border bg-white px-[10px] text-[14px] text-printtie-text outline-none">
                <option>최신 활동 순</option>
                <option>작가 이름 A→Z</option>
                <option>알림 많은 순</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-[6px] text-[13px] text-printtie-text2/90">필터</label>
              <div className="flex flex-col gap-[8px]">
                <label className="flex flex-row items-center gap-[8px]">
                  <input type="checkbox" checked={onlyForSale} onChange={(e) => setOnlyForSale(e.target.checked)} className="h-[16px] w-[16px] accent-printtie-cta" />
                  <span className="text-[13px] text-printtie-text2/90">판매중인 작품만</span>
                </label>
                <label className="flex flex-row items-center gap-[8px]">
                  <input type="checkbox" checked={onlyLimited} onChange={(e) => setOnlyLimited(e.target.checked)} className="h-[16px] w-[16px] accent-printtie-cta" />
                  <span className="text-[13px] text-printtie-text2/90">한정판·드롭만</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-[6px] text-[13px] text-printtie-text2/90">글로벌 알림 설정</label>
              <div className="flex flex-row gap-[8px]">
                <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">모두 켜기</Button>
                <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">모두 끄기</Button>
              </div>
            </div>
          </form>

          <aside className="mt-[24px]">
            <h3 className="mb-[8px] text-[14px] text-printtie-text">알림 요약</h3>
            <div className="flex flex-col gap-[8px]">
              <div className="flex flex-row items-center justify-between border border-printtie-border bg-white p-[12px]">
                <span className="text-[13px] text-printtie-text2/90">이메일 수신</span>
                <span className="text-[13px] text-printtie-text2/90">활성</span>
              </div>
              <div className="flex flex-row items-center justify-between border border-printtie-border bg-white p-[12px]">
                <span className="text-[13px] text-printtie-text2/90">푸시 수신</span>
                <span className="text-[13px] text-printtie-primary/70">비활성</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="flex w-full flex-col gap-[24px] border border-printtie-border bg-white p-[24px] shadow-soft">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-[18px] text-printtie-text">구독 작가의 최신 소식</h2>
            <div className="flex flex-row gap-[8px]">
              <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">읽음 표시</Button>
              <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">필터 적용</Button>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            {list.map((u) => (
              <article key={u.id} className="flex flex-row gap-[16px] border border-printtie-border bg-[#E9FAFF] p-[16px] shadow-soft">
                <Image src={u.thumbUrl} alt="작가 썸네일" width={96} height={96} className="h-[96px] w-[96px] rounded-[6px] bg-white object-cover" />
                <div className="flex w-full flex-col">
                  <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col">
                      <h3 className="text-[15px] text-printtie-text">{u.title}</h3>
                      <p className="mt-[8px] text-[13px] text-printtie-text2/90">{u.desc}</p>
                      <p className="mt-[8px] text-[12px] text-printtie-primary/60">{u.timeLabel}</p>
                    </div>
                    <div className="flex flex-col items-end gap-[8px]">
                      <div className="flex flex-row gap-[8px]">
                        <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">작품 보기</Button>
                        <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">읽음</Button>
                      </div>
                      <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">작가 페이지</Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="border border-printtie-border bg-white p-[16px] text-center text-[14px] text-printtie-primary/60">
              더 많은 업데이트를 보려면 구독 작가를 추가하거나 필터를 확인하세요.
            </div>
          </div>
        </section>

        <aside className="flex w-[320px] flex-col gap-[24px]">
          <section className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">구독 작가 (6)</h3>
            <ul className="flex flex-col gap-[12px]">
              {[{ name: "김아람", time: "최근 활동: 3시간 전", seed: "3" }, { name: "오승현", time: "최근 활동: 2일 전", seed: "4" }].map((a) => (
                <li key={a.name} className="flex flex-row items-center justify-between border border-printtie-border bg-[#E6FBFF] p-[10px]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <Image src={`https://picsum.photos/seed/printtie-sub-artist-${a.seed}/96/96`} alt="작가" width={48} height={48} className="h-[48px] w-[48px] rounded-full bg-white object-cover" />
                    <div className="flex flex-col">
                      <span className={cn("text-[14px]", "text-printtie-text")}>{a.name}</span>
                      <span className="text-[12px] text-printtie-primary/60">{a.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[10px] text-printtie-text shadow-soft">알림</Button>
                    <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[10px] text-printtie-text shadow-soft">언팔로우</Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-[12px] flex flex-row justify-center">
              <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[12px] text-printtie-text shadow-soft">전체 보기</Button>
            </div>
          </section>

          <section className="w-full border border-printtie-border bg-[#E6FBFF] p-[16px]">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">알림 설정</h3>
            <div className="flex flex-col gap-[12px]">
              {[{ title: "이메일", desc: "작가 업데이트 및 주문 관련 알림" }, { title: "푸시", desc: "신작 드롭·긴급 공지" }].map((n) => (
                <div key={n.title} className="flex flex-row items-center justify-between border border-printtie-border bg-white p-[10px]">
                  <div className="flex flex-col">
                    <div className="text-[13px] text-printtie-text2/90">{n.title}</div>
                    <div className="text-[12px] text-printtie-primary/60">{n.desc}</div>
                  </div>
                  <div className="flex flex-row gap-[8px]">
                    <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[10px] text-printtie-success shadow-soft">구독</Button>
                    <Button type="button" variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[10px] text-printtie-primary/80 shadow-soft">해지</Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-[12px] text-[12px] text-printtie-primary/60">알림 수신 비율을 높이면 신작 노출과 구매 전환이 개선됩니다.</p>
          </section>

          <section className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
            <h3 className="mb-[12px] text-[16px] text-printtie-text">추천 작가</h3>
            <p className="mb-[12px] text-[13px] text-printtie-text2/90">구독 작가가 없거나 확장하고 싶다면, 아래 작가들을 확인하세요.</p>
            <ul className="flex flex-col gap-[12px]">
              {[{ name: "최지윤", meta: "최근 드롭: 2주 전", seed: "5" }, { name: "이준형", meta: "추천 이유: 인기 작품 다수", seed: "6" }].map((r) => (
                <li key={r.name} className="flex flex-row items-center justify-between border border-printtie-border bg-[#E9FAFF] p-[10px]">
                  <div className="flex flex-row items-center gap-[12px]">
                    <Image src={`https://picsum.photos/seed/printtie-reco-${r.seed}/96/96`} alt="추천작가" width={48} height={48} className="h-[48px] w-[48px] rounded-full bg-white object-cover" />
                    <div className="flex flex-col">
                      <span className="text-[14px] text-printtie-text">{r.name}</span>
                      <span className="text-[12px] text-printtie-primary/60">{r.meta}</span>
                    </div>
                  </div>
                  <Button className="h-[40px] rounded-[6px] bg-printtie-cta px-[10px] text-white shadow-mdsoft">구독</Button>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
