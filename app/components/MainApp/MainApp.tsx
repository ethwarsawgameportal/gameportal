import React from "react";
import Header from "../Header";
import Hero from "../Hero";
import Description from "../Description";
import HowItWorks from "../HowItWorks";
import Roadmap from "../Roadmap";
import Community from "../Community";
import Footer from "../Footer";

const SectionAnchor: React.FC<{ id: string; children: React.ReactNode }> = ({
  id,
  children,
}) => (
  <section id={id} className="scroll-mt-24">
    {children}
  </section>
);

const PageShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white">
    <Header pageType="main" />
    {children}
    <Footer />
  </div>
);

const LandingDappOnBase: React.FC = () => {
  return (
    <PageShell>
      <Hero />
      <SectionAnchor id="about">
        <Description />
      </SectionAnchor>
      <SectionAnchor id="how">
        <HowItWorks />
      </SectionAnchor>
      {/* <SectionAnchor id="roadmap">
        <Roadmap />
      </SectionAnchor> */}
      <SectionAnchor id="community">
        <Community />
      </SectionAnchor>
    </PageShell>
  );
};

export default LandingDappOnBase;
