

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/brand/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover opacity-70"
      />

      {/* Readability overlay: darker on the left, fades to clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative">
        <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
            Boulevard <span className="text-bb-fire">Burger</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/90">
            House-made sauces. Gluten-free buns. Delivery or pickup.
          </p>

          <div className="mt-8 flex gap-3">
            <Link
              href="/order"
              className="bg-bb-fire text-white px-5 py-3 rounded-2xl shadow-card hover:opacity-90"
            >
              Order Now
            </Link>

            {/* Made this filled & blurred so it pops over the photo */}
            <Link
              href="/menu"
              className="px-5 py-3 rounded-2xl bg-white/90 text-bb-ink border border-white/20 backdrop-blur hover:bg-white"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden">
//       <img
//         src="/brand/hero.png"
//         alt=""
//         className="absolute inset-0 h-full w-full object-cover opacity-70"
//       />
//       <div className="relative">
//         <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
//           <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
//             Boulevard <span className="text-bb-fire">Burger</span>
//           </h1>
//           <p className="mt-4 max-w-xl text-lg text-neutral-800">
//             House-made sauces. Gluten-free buns. Delivery or pickup.
//           </p>
//           <div className="mt-8 flex gap-3">
//             <Link href="/order" className="bg-bb-fire text-white px-5 py-3 rounded-2xl hover:opacity-90">
//               Order Now
//             </Link>
//             <Link href="/menu" className="px-5 py-3 rounded-2xl border">View Menu</Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
