import { addOns } from "@/data/menu";

export default function AddOns() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold">Add-Ons</h2>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="font-semibold mb-3">Included</h3>
          <div className="flex flex-wrap gap-2">
            {addOns.included.map((x) => (
              <span key={x} className="text-xs border rounded-full px-3 py-1 bg-white">{x}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Premium</h3>
          <div className="flex flex-wrap gap-2">
            {addOns.premium.map((x) => (
              <span key={x} className="text-xs border rounded-full px-3 py-1 bg-white">{x}</span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-neutral-600">
        Gluten-free bun available. Ask about allergens.
      </p>
    </section>
  );
}
