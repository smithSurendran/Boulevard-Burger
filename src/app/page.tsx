import Header from "../component/Header";
import Hero from "../component/Hero";
import MenuGrid from "../component/MenuGrid";
import Footer from "../component/Footer";

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
