import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/brand/hero.png"
        alt="Boulevard Burger Hero"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-70"
      />

      {/* Overlay gradient: deep red → transparent for warmth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bb-red)]/80 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
          <h1 className="text-5xl md:text-7xl font-[var(--font-display)] font-extrabold uppercase tracking-wide text-white drop-shadow-[4px_4px_0_#000]">
            Boulevard <span className="text-[var(--color-bb-red)]">Burger</span>
          </h1>

          <p className="mt-6 max-w-xl text-white/90 font-[var(--font-poppins)] text-lg">
            Stacked high. Smashed right. Always fresh — always Boulevard.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              href="/order"
              className="px-6 py-3 rounded-xl bg-[var(--color-bb-red)] text-white font-[var(--font-poppins)] shadow-[4px_4px_0_#000] hover:bg-[var(--color-bb-black)] transition-transform hover:scale-105"
            >
              Order Now
            </Link>

            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-white/90 text-[var(--color-bb-black)] border border-black/10 backdrop-blur-sm font-[var(--font-poppins)] hover:bg-white hover:scale-105 transition-transform"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
