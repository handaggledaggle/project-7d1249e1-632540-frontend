import FeedQuickFilters from "@/components/feed/FeedQuickFilters";
import ArtworkCard from "@/components/feed/ArtworkCard";
import type { ArtworkCardDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

const SAMPLE: ArtworkCardDTO[] = [
  {
    id: "art-001",
    title: "Blue Morning",
    artistId: "kim-sujin",
    artistName: "Kim Sujin",
    priceLabel: "₩120,000",
    saleStatus: "for_sale",
    type: "print",
    imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "art-002",
    title: "Calm Lake",
    artistId: "park-minseo",
    artistName: "Park Minseo",
    priceLabel: "₩98,000",
    saleStatus: "for_sale",
    type: "print",
    imageUrl: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "art-003",
    title: "Night Study",
    artistId: "lee-jihyun",
    artistName: "Lee Jihyun",
    priceLabel: "₩250,000",
    saleStatus: "reserved",
    type: "original",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

export default async function FeedPage() {
  // 빌드/배포 환경에서 DB/내부 API 유무와 무관하게 렌더되도록 샘플 데이터를 기본으로 사용합니다.
  const items = SAMPLE;

  return (
    <main>
      <div className="mx-auto w-[1440px]">
        <header className="w-full border-b border-printtie-border bg-white px-[32px] py-[24px] shadow-[0_1px_0_rgba(6,182,212,0.03)]">
          <div className="flex w-full flex-row items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-[20px] text-printtie-text">Feed</h1>
              <p className="mt-[8px] text-[14px] text-printtie-text2/90">
                printtie — 작가와 팬을 잇는, 작품 발견에서 배송까지
              </p>
            </div>
            <FeedQuickFilters />
          </div>
        </header>

        <section className="w-full bg-[#ECFEFF] px-[32px] py-[28px]">
          <div className="grid grid-cols-4 gap-[14px]">
            {items.map((item) => (
              <ArtworkCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
