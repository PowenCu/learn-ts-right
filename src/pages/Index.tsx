import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { QuickStartSection } from "@/components/QuickStartSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <QuickStartSection />
    </Layout>
  );
};

export default Index;
