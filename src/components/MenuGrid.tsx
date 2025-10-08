import { menu } from "@/data/menu";
import MenuCard from "./MenuCard";

export default function MenuGrid({ categoryId }: { categoryId: "burgers" | "dogs_steak" | "sides" }) {
  const cat = menu.categories.find((c) => c.id === categoryId);
  if (!cat) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold">{cat.title}</h2>
      <div className="grid gap-6 mt-6 md:grid-cols-3">
        {cat.items.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
