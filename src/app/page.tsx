import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/sections/Hero";
import StatBar from "@/components/sections/StatBar";
import HowItWorks from "@/components/sections/HowItWorks";
import AppPreviews from "@/components/sections/AppPreviews";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import FinalCta from "@/components/sections/FinalCta";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  LEGAL_ENTITY,
} from "@/lib/config";

const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: SITE_NAME,
  operatingSystem: "iOS",
  applicationCategory: "LifestyleApplication",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: LEGAL_ENTITY },
};

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <StatBar />
        <HowItWorks />
        <AppPreviews />
        <Features />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
    </>
  );
}
