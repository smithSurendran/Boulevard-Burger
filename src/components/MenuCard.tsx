"use client";
import type { MenuItem } from "@/data/menu";
import Image from "next/image";

export default function MenuCard({ item }: { item: MenuItem }) {
  const hasDetails = (item.ingredients && item.ingredients.length > 0) || item.desc;
  return (
    <div
      className="group relative bg-bb-paper rounded-2xl shadow-[4px_4px_0_#000] border border-black/10 overflow-hidden focus-within:ring-2 focus-within:ring-black/20"
      tabIndex={0}
    >
      {item.image && (
        <div className="relative h-40">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wide">{item.name}</h3>
            {item.desc && <p className="text-sm text-neutral-600 mt-1">{item.desc}</p>}
            {item.badges?.length ? (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.badges.map((b) => (
                  <span key={b} className="text-xs border rounded-full px-2 py-0.5">{b}</span>
                ))}
              </div>
            ) : null}
          </div>
          {"price" in item && item.price !== undefined && (
            <div className="font-semibold">${item.price.toFixed(2)}</div>
          )}
        </div>
      </div>

      {hasDetails && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <div className="px-5 py-4 text-white text-sm max-w-[90%]">
            {item.ingredients && item.ingredients.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {item.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            ) : (
              <p>{item.desc}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

