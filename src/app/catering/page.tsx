import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Catering • Boulevard Burger",
  description: "Party trays, sliders, and sides for groups.",
};

const packages = [
  {
    title: "Slider Party (12 / 24 / 48)",
    desc: "Classic + BBQ + Three Alarm mix. Add vegan on request.",
    note: "Includes pickles, sauces, and labeled boxes.",
  },
  {
    title: "Sides Trays",
    desc: "Truffle Parm Fries, Tater Tots (loaded optional), Sweet Potato Fries, Onion Rings.",
    note: "Half & full pans available.",
  },
  {
    title: "Dogs & Steak",
    desc: "Rib Eye Cheesesteak tray, All American/Italian Dogs (single or double).",
    note: "Cut to share on request.",
  },
];

export default function CateringPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">Catering</h1>
          <p className="mt-2 text-neutral-700">
            Feed the crew with slider trays, sides, and salads. We’ll customize for dietary needs.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div key={p.title} className="bg-bb-paper border rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-neutral-700 mt-1">{p.desc}</p>
              <p className="text-xs text-neutral-500 mt-3">{p.note}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold">Request a Quote</h2>
            <p className="text-neutral-700 mt-2">
              Tell us the date, headcount, and items you want—we’ll reply with options and pricing.
            </p>
          </div>
          <ContactForm subjectPreset="Catering" buttonLabel="Request Catering" />
        </section>
      </main>
      <Footer />
    </>
  );
}
