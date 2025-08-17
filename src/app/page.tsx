import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Features } from "./components/pages/home/Features";
import { Hero } from "./components/pages/home/Hero";
import { NewsLetter } from "./components/pages/home/NewsLetter";
import { Pricing } from "./components/pages/home/Pricing";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <div data-newsletter>
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
