import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { PICKUP_INFO } from "@/data/ordering";

export const metadata = {
  title: "Contact \u2014 Boulevard Burger",
  description: "Reach the Boulevard Burger team.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Contact Us</h1>
          <p className="mt-2 text-neutral-700">
            We usually reply within business hours. For immediate order issues, call us.
          </p>
        </section>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold mb-2">Message</h2>
            <ContactForm />
          </div>

          <div className="bg-bb-paper border rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold mb-2">Visit / Pickup</h2>
            <p className="text-sm">
              <span className="font-semibold">Address:</span>{" "}
              <Link href={PICKUP_INFO.mapUrl} target="_blank" className="underline hover:text-[var(--color-bb-red)]">
                {PICKUP_INFO.address}
              </Link>
              <br />
              <span className="font-semibold">Phone:</span> {PICKUP_INFO.phone}
              <br />
              <span className="font-semibold">Hours:</span> {PICKUP_INFO.hours}
            </p>
            <p className="text-xs text-neutral-600 mt-3">
              Pickup instructions: {PICKUP_INFO.instructions}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


