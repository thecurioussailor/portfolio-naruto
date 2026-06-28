import Nav from "@/components/ui/Nav";
import ParticleField from "@/components/ui/ParticleField";
import Hero from "@/components/sections/Hero";
import Origin from "@/components/sections/Origin";
import Jutsu from "@/components/sections/Jutsu";
import Missions from "@/components/sections/Missions";
import Journey from "@/components/sections/Journey";
import Summon from "@/components/sections/Summon";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="relative w-full bg-ink">
      <ParticleField />
      <Nav />
      <Hero />
      <Origin />
      <Jutsu />
      <Missions />
      <Journey />
      <Summon />
      <Footer />
    </div>
  );
}
