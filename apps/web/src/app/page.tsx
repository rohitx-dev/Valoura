import { HomeHero } from "../components/home/home-hero";
import { HomeDiscovery } from "../components/home/home-discovery";
import { HomeInspiration } from "../components/home/home-inspiration";


export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeDiscovery />
      <HomeInspiration />
    </>
  );
}