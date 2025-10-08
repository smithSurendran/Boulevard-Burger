import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PICKUP_INFO } from "@/data/ordering";

export const metadata = {
  title: "About • Boulevard Burger",
  description: "Our story, sourcing, and what makes our burgers different.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">About Boulevard Burger</h1>
          <p className="mt-2 text-neutral-700 max-w-2xl">
            We’re a ghost kitchen built for speed and quality—smashed patties, house-made sauces,
            and a menu that travels well. Gluten-free buns and vegan options always on deck.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold">Sourcing & Quality</h3>
            <p className="text-sm text-neutral-700 mt-2">
              Fresh ground beef, a blended-burger option (short rib, brisket, chuck), and produce
              prepped daily. We build for bold flavor without the mess in transit.
            </p>
          </div>
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold">Ghost Kitchen = Faster</h3>
            <p className="text-sm text-neutral-700 mt-2">
              No dining room, all focus on cooking and packaging. Order for pickup or delivery with
              accurate ETAs and insulated packaging.
            </p>
          </div>
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold">Dietary Options</h3>
            <p className="text-sm text-neutral-700 mt-2">
              Vegan patty, GF bun, and clear allergen notes. Ask us if you need ingredient details.
            </p>
          </div>
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-10">
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold mb-1">Where to Find Us</h3>
            <p className="text-sm">
              <span className="font-semibold">Address:</span>{" "}
              <Link href={PICKUP_INFO.mapUrl} target="_blank" className="underline hover:text-bb-fire">
                {PICKUP_INFO.address}
              </Link>
              <br />
              <span className="font-semibold">Hours:</span> {PICKUP_INFO.hours}
              <br />
              <span className="font-semibold">Phone:</span> {PICKUP_INFO.phone}
            </p>
          </div>
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h3 className="font-semibold mb-1">Contact</h3>
            <p className="text-sm">
              Questions, feedback, or partnerships?{" "}
              <Link href="/contact" className="underline hover:text-bb-fire">Get in touch</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
