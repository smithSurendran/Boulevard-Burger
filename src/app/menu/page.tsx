import Header from "@/component/Header";
import Footer from "@/component/Footer";
import MenuGrid from "@/component/MenuGrid";
import AddOns from "@/component/AddOns";

export const metadata = {
  title: "Menu • Boulevard Burger",
  description: "Burgers, steak & dogs, sides, and add-ons.",
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold">Menu</h1>
          <p className="mt-2 text-neutral-700">House-made sauces. Gluten-free buns.</p>
        </div>

        <MenuGrid categoryId="burgers" />
        <MenuGrid categoryId="dogs_steak" />
        <MenuGrid categoryId="sides" />

        <AddOns />
      </main>
      <Footer />
    </>
  );
}
