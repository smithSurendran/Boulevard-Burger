import type { MenuItem } from "@/data/menu";

export default function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-bb-paper rounded-2xl shadow-card p-5 border">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
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
  );
}
