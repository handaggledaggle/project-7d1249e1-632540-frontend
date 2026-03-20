import Image from "next/image";
import { Button } from "@/components/ui/button";
import ArtistPortfolioTabs from "@/components/artists/ArtistPortfolioTabs";
import type { ArtistProfileDTO } from "@/lib/types";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;

  // Try to fetch artist data from API; fall back to mock if API not available
  let artist: ArtistProfileDTO;
  try {
    const res = await fetch(`/api/artists?id=${artistId}`);
    if (res.ok) {
      const data = await res.json();
      artist = {
        id: data.id,
        displayName: data.display_name ?? data.displayName,
        bio: data.bio,
        location: data.location ?? "",
        tags: data.tags ?? "",
        avatarUrl: data.avatar_url ?? data.avatarUrl ?? "https://picsum.photos/seed/printtie-artist-avatar/240/240",
        followersLabel: data.followers_label ?? data.followersLabel ?? "0",
        worksCountLabel: data.works_count_label ?? data.worksCountLabel ?? "0",
        subscribersLabel: data.subscribers_label ?? data.subscribersLabel ?? "0",
        socials: data.socials ?? data.socials ?? [],
        exhibitions: data.exhibitions ?? data.exhibitions ?? [],
      };
    } else {
      throw new Error("API 오류");
    }
  } catch (e) {
    // fallback mock
    artist = {
      id: artistId,
      displayName: "김수진",
      bio:
        "김수진은 판화와 드로잉을 중심으로 작업하는 서울 기반 작가입니다. 전통적 판화기법과 디지털 프로세스를 결합해 한정판 에디션과 프린트를 제작합니다. 최근 개인전 '조용한 표면'을 열었으며 한정판 시리즈로 컬렉터들의 관심을 받고 있습니다.\n\n주요 활동: 개인전 2024 '조용한 표면' (서울), 그룹전 '선과 색' (2023)",
      location: "서울",
      tags: "작가 · 판화·드로잉 · 서울 기반",
      avatarUrl: "https://picsum.photos/seed/printtie-artist-avatar/240/240",
      followersLabel: "12.3k",
      worksCountLabel: "48",
      subscribersLabel: "1.1k",
      socials: [
        { label: "Instagram · @sujin_prints", href: "#" },
        { label: "Twitter · @sujin_art", href: "#" },
        { label: "Email · contact@sujinprints.com", href: "#" },
      ],
      exhibitions: [
        "2024 — 개인전 '조용한 표면' · 갤러리 산",
        "2023 — 그룹전 '선과 색' · 아트스페이스",
        "2021 — 레지던시 '판화의 시간' · 판화공방",
      ],
    };
  }

  return (
    <main>
      <div className="mx-auto w-[1440px]">
        <section className="w-full bg-white px-[32px] py-[40px]">
          <header className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-[20px]">
              <div className="flex h-[120px] w-[120px] items-center justify-center rounded-[8px] border border-printtie-border bg-[#E6FBFF] shadow-soft">
                <Image
                  src={artist.avatarUrl}
                  alt="작가 아바타"
                  width={112}
                  height={112}
                  className="h-[112px] w-[112px] object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="mb-[12px] text-[28px] text-printtie-text">{artist.displayName}</h1>
                <p className="mb-[8px] text-[14px] text-printtie-text2/90">{artist.tags}</p>
                <p className="text-[13px] text-printtie-primary/70">Tagline: 작가와 팬을 잇는, 작품 발견에서 배송까지</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-[12px]">
              <div className="flex flex-col items-end">
                <div className="flex flex-row gap-[12px]">
                  <Button className="h-[44px] rounded-[6px] bg-printtie-primary px-[20px] text-white shadow-mdsoft">구독하기</Button>
                  <Button variant="outline" className="h-[44px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">팔로우</Button>
                </div>
                <div className="mt-[12px] flex flex-row gap-[16px] text-[14px] text-printtie-text2/90">
                  <span>팔로워 <span className="text-printtie-text">{artist.followersLabel}</span></span>
                  <span>작품 <span className="text-printtie-text">{artist.worksCountLabel}</span></span>
                  <span>구독자 <span className="text-printtie-text">{artist.subscribersLabel}</span></span>
                </div>
              </div>
            </div>
          </header>
        </section>

        <section className="w-full bg-[#E6FBFF] px-[32px] py-[40px]">
          <div className="flex w-full flex-row gap-[24px]">
            <div className="flex w-[720px] flex-col">
              <h2 className="mb-[16px] text-[20px] text-printtie-text">작가 소개</h2>
              <div className="w-full border border-printtie-border bg-white p-[20px] shadow-soft">
                <p className="whitespace-pre-line text-[14px] text-printtie-text2/90">{artist.bio}</p>
              </div>

              <h3 className="mb-[12px] mt-[24px] text-[16px] text-printtie-text">전시·아카이브</h3>
              <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
                <ul className="flex flex-col gap-[8px]">
                  {artist.exhibitions.map((line) => (
                    <li key={line} className="text-[14px] text-printtie-text2/90">{line}</li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="flex w-[360px] flex-col gap-[16px]">
              <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
                <h4 className="mb-[8px] text-[14px] text-printtie-text">연락·SNS</h4>
                <div className="flex flex-col gap-[8px]">
                  {artist.socials.map((s: any) => (
                    <a key={s.label} href={s.href} className="text-[14px] text-printtie-primary/90">{s.label}</a>
                  ))}
                </div>
              </div>

              <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
                <h4 className="mb-[8px] text-[14px] text-printtie-text">구독 혜택</h4>
                <p className="mb-[8px] text-[14px] text-printtie-text2/90">구독 시 신작 알림, 한정판 우선 구매권, 배송 추적 업데이트를 제공합니다.</p>
                <div className="flex flex-row gap-[12px]">
                  <Button className="h-[40px] rounded-[6px] bg-printtie-primary px-[16px] text-white shadow-mdsoft">월 구독 시작</Button>
                  <Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">혜택 보기</Button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="w-full bg-white px-[32px] py-[40px]">
          <h2 className="mb-[16px] text-[20px] text-printtie-text">공지 & 신작 안내</h2>
          <div className="flex w-full flex-col gap-[12px]">
            <article className="w-full border border-printtie-border bg-[#E9FAFF] p-[16px] shadow-soft">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-[14px] text-printtie-text">신작 에디션 발매</p>
                  <p className="text-[14px] text-printtie-text2/90">2026-03-10 · 한정 에디션 '물의 표면' 30부 발매 예정</p>
                </div>
                <div className="text-[14px] text-printtie-success">신규</div>
              </div>
            </article>

            <article className="w-full border border-printtie-border bg-[#E9FAFF] p-[16px] shadow-soft">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="text-[14px] text-printtie-text">전시 참여 안내</p>
                  <p className="text-[14px] text-printtie-text2/90">2026-02-05 · '지역 작가 그룹전' 참여, 전시 기간 예약 가능</p>
                </div>
                <div className="text-[14px] text-printtie-primary/50">지난 공지</div>
              </div>
            </article>
          </div>
        </section>

        <ArtistPortfolioTabs />

        <section className="w-full bg-white px-[32px] py-[40px]">
          <div className="flex w-full flex-row gap-[24px]">
            <aside className="flex w-[520px] flex-col gap-[12px]">
              <div className="w-full border border-printtie-border bg-[#E9FAFF] p-[16px] shadow-soft">
                <Image src="https://picsum.photos/seed/printtie-featured/980/720" alt="대표작 이미지" width={980} height={720} className="mb-[12px] h-[300px] w-full object-cover" />
                <h3 className="mb-[8px] text-[14px] text-printtie-text">대표작: 물의 표면 #1</h3>
                <p className="text-[14px] text-printtie-text2/90">한정판 프린트 · 30부 · 작가 직접 서명 · 안전 포장 및 배송</p>
              </div>

              <div className="w-full border border-printtie-border bg-white p-[12px] shadow-soft">
                <h4 className="mb-[8px] text-[14px] text-printtie-text">공유하기</h4>
                <div className="flex flex-row gap-[12px]">
                  <Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">링크 복사</Button>
                  <Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">SNS 공유</Button>
                  <Button variant="outline" className="h-[40px] rounded-[6px] border-printtie-border bg-white px-[16px] text-printtie-text2 shadow-soft">추천하기</Button>
                </div>
              </div>
            </aside>

            <div className="flex flex-1 flex-col gap-[12px]">
              <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
                <h4 className="mb-[12px] text-[14px] text-printtie-text">신뢰 정보</h4>
                <div className="flex flex-col gap-[8px] text-[14px] text-printtie-text2/90">
                  <p>평균 배송 리드타임: <span className="text-printtie-text">5-8 영업일</span></p>
                  <p>반품/교환 정책: <span className="text-printtie-text">수령 후 7일 이내 접수</span></p>
                  <p>구매자 후기: <span className="text-printtie-text">4.8/5 (평균 만족도)</span></p>
                </div>
              </div>

              <div className="w-full border border-printtie-border bg-[#E9FAFF] p-[16px] shadow-soft">
                <h4 className="mb-[12px] text-[14px] text-printtie-text">대표 정보</h4>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-printtie-text2/90">위치</span>
                    <span className="text-[14px] text-printtie-text">서울</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-printtie-text2/90">응답 속도</span>
                    <span className="text-[14px] text-printtie-text">24시간 내</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] text-printtie-text2/90">인증</span>
                    <span className="text-[14px] text-printtie-text">신원 확인 완료</span>
                  </div>
                </div>
              </div>

              <div className="w-full border border-printtie-border bg-white p-[16px] shadow-soft">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <p className="mb-[8px] text-[16px] text-printtie-text">작가 구독으로 더 많은 신작을 받아보세요</p>
                    <p className="text-[14px] text-printtie-text2/90">구독자는 우선 구매권, 전용 알림, 할인 혜택을 받습니다.</p>
                  </div>
                  <div className="flex flex-row gap-[12px]">
                    <Button className="h-[48px] rounded-[6px] bg-printtie-primary px-[20px] text-white shadow-mdsoft">구독 시작</Button>
                    <Button variant="outline" className="h-[48px] rounded-[6px] border-printtie-border bg-white px-[20px] text-printtie-text2 shadow-soft">문의하기</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
