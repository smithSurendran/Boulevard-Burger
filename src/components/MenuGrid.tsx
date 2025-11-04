import MenuCard from "./MenuCard";
import { menu, type MenuItem, type MenuCategory } from "@/data/menu";

export default function MenuGrid({ categoryId }: { categoryId: MenuCategory["id"] }) {
  // Find the correct category from your menu.ts
  const category = menu.categories.find((cat) => cat.id === categoryId);

  // TypeScript now knows this is a MenuItem[]
  const items: MenuItem[] = category ? category.items : [];

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-center text-gray-500">Category not found.</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-[var(--font-display)] uppercase mb-4">
          {category.title}
        </h2>
        <p className="text-center text-gray-500">No menu items found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Section Title */}
      <h2 className="text-2xl font-[var(--font-display)] uppercase mb-6 border-b-4 border-[var(--color-bb-red)] inline-block">
        {category.title}
      </h2>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: MenuItem) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
