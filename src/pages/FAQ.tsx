import { Layout } from "@/components/layout/Layout";
import { FAQSection, faqs } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { SEOHead } from "@/components/seo/SEOHead";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { getFAQSEO } from "@/config/seo";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";

const FAQ = () => {
  return (
    <Layout>
      <SEOHead metadata={getFAQSEO()} />
      <SchemaScript schema={[
        generateFAQSchema(faqs),
        generateBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "FAQ", url: "/faq" },
        ]),
      ]} />
      <section className="hero-section">
        <div className="hero-overlay py-16 md:py-20">
          <div className="container-wide px-4 text-center text-primary-foreground">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Answers to common questions about our drainage services
            </p>
          </div>
        </div>
      </section>

      <FAQSection showAll />
      <CTASection />
    </Layout>
  );
};

export default FAQ;
