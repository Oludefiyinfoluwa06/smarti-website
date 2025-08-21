import { Features } from "@/components/pages/home/Features";
import { Hero } from "@/components/pages/home/Hero";
import { NewsLetter } from "@/components/pages/home/NewsLetter";
import { Pricing } from "@/components/pages/home/Pricing";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <div data-newsletter>
        <NewsLetter />
      </div>
    </>
  );
};

export default Home;
