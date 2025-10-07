import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/brand/hero.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Boulevard <span className="text-bb-fire">Burger</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg text-neutral-800">
            House-made sauces. Gluten-free buns. Delivery or pickup.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/order" className="bg-bb-fire text-white px-5 py-3 rounded-2xl hover:opacity-90">
              Order Now
            </Link>
            <Link href="/menu" className="px-5 py-3 rounded-2xl border">View Menu</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
