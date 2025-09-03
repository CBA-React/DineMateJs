import { HeroSection } from "/src/components/home/HeroSection";
import { FeatureOrbitSection } from "/src/components/home/OrbitRing";
import { HowItWorks } from "/src/components/home/HowItWorks";
import { Restaurants } from "/src/components/home/Restaurants";
import { Stories } from "/src/components/home/Stories";
import { FooterCTA } from "/src/components/home/FooterCTA";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureOrbitSection/>
      <HowItWorks />
      <Restaurants />
      <Stories />
      <FooterCTA />
    </>
  );
};

export default Home;
