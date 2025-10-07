"use client";
import { ORDER_LINKS } from "@/data/ordering";
import { Bike, ShoppingBag, Store } from "lucide-react";

const partners = [
  { key: "doordash",  label: "DoorDash",  icon: Bike,         bg: "bg-[#EB1700]/85" },
  { key: "ubereats",  label: "Uber Eats", icon: ShoppingBag,  bg: "bg-[#06C167]" },
  { key: "grubhub",   label: "Grubhub",   icon: Bike,         bg: "bg-[#F63440]/85" },
  { key: "website",   label: "Order on Our Site", icon: Store, bg: "bg-bb-green" },
] as const;

export default function PartnerButtons({ disabled = false }: { disabled?: boolean }) {
  // ... keep your partners array
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {partners.map(p => {
        const href = ORDER_LINKS[p.key];
        if (!href) return null;
        const Icon = p.icon;
        return (
          <a
            key={p.key}
            href={disabled ? undefined : href}
            aria-disabled={disabled}
            target={disabled ? undefined : "_blank"}
            rel={disabled ? undefined : "noopener noreferrer"}
            className={`group ${p.bg} text-white rounded-2xl px-4 py-4 flex items-center justify-between shadow-card
              ${disabled ? "opacity-50 pointer-events-none" : "hover:opacity-95"}`}
          >
            <span className="flex items-center gap-3 text-base font-semibold">
              <Icon className="h-5 w-5" />
              {p.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
