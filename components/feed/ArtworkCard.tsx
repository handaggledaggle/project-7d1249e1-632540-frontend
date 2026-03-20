import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ArtworkCardDTO } from "@/lib/types";

export default function ArtworkCard({ item }: { item: ArtworkCardDTO }) {
  return (
    <article
      className={cn(
        "bg-[#E9FAFF] border border-printtie-border p-[12px] shadow-soft"
      )}
    >
      <div className="relative w-full overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={`${item.artistName} — ${item.title}`}
          width={320}
          height={200}
          className="h-auto w-full"
        />
      </div>
      <h3 className="mt-[8px] text-[14px] text-printtie-text">
        {item.artistName} — {item.title}
      </h3>
      <p className="text-[13px] text-printtie-text2/90">{item.priceLabel}</p>
      <div className="mt-[8px] flex flex-row items-center gap-[8px]">
        <Button
          asChild
          variant="outline"
          className="h-[36px] rounded-[6px] border-printtie-border bg-white px-[10px] text-[13px] text-printtie-text2 shadow-soft"
        >
          <Link href="#">상세보기</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-[36px] rounded-[6px] border-printtie-border bg-white px-[10px] text-[13px] text-printtie-text2 shadow-soft"
        >
          <Link href={`/artists/${item.artistId}`}>작가페이지</Link>
        </Button>
      </div>
    </article>
  );
}
