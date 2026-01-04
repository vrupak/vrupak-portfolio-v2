import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import EthosBlocks from "@/components/EthosBlock";
import Footer from "@/components/Footer";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <main>
        <Hero />
        <FeaturedWork />
        <EthosBlocks />
        <Footer />
      </main>
    </>
  );
}
