"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MENU = [
  { label: "Feed", href: "/feed" },
  { label: "Artists", href: "/artists/kim-sujin" },
  { label: "Subscriptions", href: "/my/subscriptions" },
  { label: "Cart", href: "/cart" },
  { label: "Orders", href: "/orders" },
] as const;

export default function GlobalNav() {
  const pathname = usePathname();
  const isFeed = pathname === "/feed";

  return (
    <nav
      className={cn(
        "fixed top-0 left-1/2 z-50 w-[1440px] -translate-x-1/2 border-b shadow-soft backdrop-blur-sm",
        isFeed
          ? "bg-[#ECFEFF]/60 border-printtie-border/80"
          : "bg-white border-printtie-border/70"
      )}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <Link
          href="/feed"
          className={cn(
            "text-lg font-semibold",
            isFeed ? "text-printtie-text" : "text-printtie-text"
          )}
        >
          printtie
        </Link>

        <div className="flex items-center space-x-6">
          {MENU.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[14px]",
                  active ? "text-printtie-text" : "text-printtie-primary/90",
                  "hover:text-printtie-text"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
