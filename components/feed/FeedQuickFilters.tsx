"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = ["인기", "신작", "한정판", "무료배송"] as const;

export default function FeedQuickFilters() {
  const [active, setActive] = useState<string | null>(null);
  const chips = useMemo(() => FILTERS, []);

  return (
    <div className="flex flex-row items-center gap-[8px]">
      <span className="text-[13px] text-printtie-primary/80">빠른필터:</span>
      {chips.map((label) => {
        const on = active === label;
        return (
          <Button
            key={label}
            type="button"
            variant="outline"
            onClick={() => setActive((prev) => (prev === label ? null : label))}
            className={cn(
              "h-[32px] rounded-[6px] px-[10px] text-[13px] shadow-soft",
              "border-printtie-border bg-white text-printtie-text2",
              on && "border-printtie-primary/40 bg-[#ECFEFF] text-printtie-text"
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
