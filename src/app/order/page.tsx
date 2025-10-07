import Header from "@/component/Header";
import Footer from "@/component/Footer";
import PartnerButtons from "@/component/PartnerButtons";
import { PICKUP_INFO } from "@/data/ordering";
import Link from "next/link";
import { isOpenNow } from "@/lib/hours";

export const metadata = {
  title: "Order • Boulevard Burger",
  description: "Order Boulevard Burger for delivery or pickup.",
};

export default function OrderPage() {
    const open = isOpenNow();
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero-ish heading */}
        <section className="mb-2 flex items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-extrabold">Order Now</h1>
          <span className={`text-xs px-2.5 py-1 rounded-full border
            ${open ? "border-green-600 text-green-700 bg-green-50"
                   : "border-neutral-400 text-neutral-600 bg-neutral-50"}`}>
            {open ? "Open now" : "Closed — opens 11am"}
          </span>
        </section>

        <section className="mb-14">
          <PartnerButtons disabled={!open} />
          <p className="mt-3 text-xs text-neutral-600">
            Delivery fees and availability are determined by each partner.
          </p>
        </section>

        {/* Pickup info */}
        <section className="mb-20 grid gap-6 md:grid-cols-2">
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold mb-2">Pickup</h2>
            <p className="text-neutral-700">{PICKUP_INFO.instructions}</p>
            <div className="mt-4 space-y-1 text-sm">
              <div><span className="font-semibold">Address:</span> <Link href={PICKUP_INFO.mapUrl} className="underline hover:text-bb-fire" target="_blank">{PICKUP_INFO.address}</Link></div>
              <div><span className="font-semibold">Phone:</span> {PICKUP_INFO.phone}</div>
              <div><span className="font-semibold">Hours:</span> {PICKUP_INFO.hours}</div>
            </div>
          </div>

          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold mb-2">Popular Right Now</h2>
            <ul className="text-sm list-disc pl-5 text-neutral-700">
              <li>BBQ Burger + Truffle Parm Fries</li>
              <li>Three Alarm (Spicy) + Sweet Potato Fries</li>
              <li>Vegan Burger + Cauliflower Fries</li>
            </ul>
            <Link href="/menu" className="inline-block mt-4 rounded-2xl border px-4 py-2 hover:bg-white">
              View Full Menu
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
