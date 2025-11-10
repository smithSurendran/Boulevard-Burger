"use client";
import { useState } from "react";
import MenuGrid from "@/components/MenuGrid";
import AddOns from "@/components/AddOns";

const categories = [
  { id: "burgers" as const, label: "Burgers" },
  { id: "dogs_steak" as const, label: "Steak & Dogs" },
  { id: "sides" as const, label: "Sides" },
];

export default function MenuView() {
  const [active, setActive] = useState<(typeof categories)[number]["id"]>("burgers");
  const [vegan, setVegan] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const filters = [vegan ? "Vegan" : null, spicy ? "Spicy" : null].filter(Boolean) as string[];

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">Menu</h1>
        <p className="mt-2 text-neutral-700">House-made sauces. Gluten-free buns.</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 py-2 rounded-full border shadow-card ${active === c.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-neutral-50'}`}
            >
              {c.label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setVegan((v) => !v)} className={`px-3 py-1.5 rounded-full text-sm border ${vegan ? 'bg-[var(--color-bb-red)] text-white' : 'bg-white text-black'}`}>Vegan</button>
            <button onClick={() => setSpicy((s) => !s)} className={`px-3 py-1.5 rounded-full text-sm border ${spicy ? 'bg-[var(--color-bb-red)] text-white' : 'bg-white text-black'}`}>Spicy</button>
          </div>
        </div>
      </div>

      <MenuGrid categoryId={active} badgeFilters={filters} />
      <AddOns />
    </main>
  );
}
