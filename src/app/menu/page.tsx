import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MenuView from "./MenuView";

export const metadata = {
  title: "Menu \u2014 Boulevard Burger",
  description: "Burgers, steak & dogs, sides, and add-ons.",
};

export default function MenuPage() {
  return (
    <>
      <Header />
      <MenuView />
      <Footer />
    </>
  );
}
