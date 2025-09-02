import { HeroSection } from "/src/components/home/HeroSection";
import { FeatureOrbitSection } from "/src/components/home/OrbitRing";

const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureOrbitSection/>
      <div className="bg-gray-400 h-screen"></div>
    </>
  );
};

export default Home;
