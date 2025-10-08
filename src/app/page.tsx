import Header from "../components/Header";
import Hero from "../components/Hero";
import MenuGrid from "../components/MenuGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <MenuGrid categoryId="burgers" />
      <MenuGrid categoryId="sides" />
      <Footer />
    </>
  );
}
