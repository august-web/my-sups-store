import { Hero } from "@/components/home/Hero";
import { ShopByMood } from "@/components/home/ShopByMood";
import { Bestsellers } from "@/components/home/Bestsellers";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialProof } from "@/components/home/SocialProof";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ShopByMood />
      <Bestsellers />
      <HowItWorks />
      <SocialProof />
      <NewsletterCTA />
    </>
  );
}
