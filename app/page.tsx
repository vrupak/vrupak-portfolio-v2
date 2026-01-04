import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import EthosBlocks from "@/components/EthosBlock";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <EthosBlocks />
      <Footer />
    </main>
  );
}
