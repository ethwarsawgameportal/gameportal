import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Twitter,
  // Discord,
  Shield,
  Gauge,
  Zap,
  Globe,
  Link as LinkIcon,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

// If you use shadcn/ui in your stack, the imports below will map automatically in ChatGPT preview.
// In a real project, ensure shadcn/ui is installed & configured.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Landing page for a decentralized app on Base (React + TSX, Node/TS5-ready)
 * - Mobile-first, responsive, pastel/gradient, slight futurism
 * - Sections: Hero, About/Description, Carousel, How it works, Roadmap, Community, Footer
 * - No real actions wired yet; CTA is placeholder
 */

// Simple placeholder SVG logo
const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Project Logo"
  >
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9AE6B4" />
        <stop offset="50%" stopColor="#90CDF4" />
        <stop offset="100%" stopColor="#B794F4" />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="92" fill="url(#g)" />
    <path
      d="M60 120c0-22 18-40 40-40s40 18 40 40"
      fill="none"
      stroke="#0F172A"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <circle cx="100" cy="80" r="10" fill="#0F172A" />
  </svg>
);

// Feature items for the carousel
const FEATURE_CARDS = [
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Self-Custody",
    text: "No intermediaries. Two clicks to sign and you’re live on Base.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Low Fees",
    text: "L2 scalability on Base keeps transactions fast and cost‑effective.",
  },
  {
    icon: <Globe className="w-6 h-6" aria-hidden />,
    title: "Open & Borderless",
    text: "Accessible anywhere. Compose with the broader onchain ecosystem.",
  },
  {
    icon: <Gauge className="w-6 h-6" aria-hidden />,
    title: "Performance",
    text: "Optimistic throughput and crisp UX with instant feedback.",
  },
  {
    icon: <LinkIcon className="w-6 h-6" aria-hidden />,
    title: "Composable",
    text: "Smart contracts interoperate—plug your modules like Lego bricks.",
  },
];

const Step: React.FC<{ n: number; title: string; text: string }> = ({
  n,
  title,
  text,
}) => (
  <div className="flex items-start gap-4">
    <div className="shrink-0 rounded-full w-10 h-10 grid place-items-center bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">
      {n}
    </div>
    <div className="space-y-1">
      <h4 className="text-lg font-semibold tracking-tight">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {text}
      </p>
    </div>
  </div>
);

const RoadmapItem: React.FC<{
  q: string;
  title: string;
  points: string[];
  done?: boolean;
}> = ({ q, title, points, done }) => (
  <div className="relative pl-8 pb-8 last:pb-0">
    <div className="absolute left-1 top-1 w-1 h-full bg-slate-200 dark:bg-slate-700" />
    <div className="absolute -left-1 top-0 w-6 h-6 rounded-full grid place-items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
      {done ? (
        <CheckCircle2 className="w-4 h-4" />
      ) : (
        <div className="w-2 h-2 rounded-full bg-slate-400" />
      )}
    </div>
    <Badge variant="secondary" className="mb-2">
      {q}
    </Badge>
    <h4 className="text-lg font-semibold">{title}</h4>
    <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
      {points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </div>
);

const FeatureCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => FEATURE_CARDS, []);
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Use cases & features
              </h3>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  aria-label="Previous"
                  onClick={prev}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button size="icon" aria-label="Next" onClick={next}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="relative h-44 sm:h-36">
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {[0, 1, 2].map((offset) => {
                    const item = slides[(index + offset) % slides.length];
                    return (
                      <motion.div
                        key={offset}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: offset * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <Card className="shadow-sm">
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-base">
                              <motion.span
                                className="rounded-lg p-2 bg-slate-100 dark:bg-slate-800"
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.icon}
                              </motion.span>
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {item.text}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index
                  ? "bg-slate-900 dark:bg-white w-5"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: i === index ? 20 : 10,
                backgroundColor:
                  i === index ? "rgb(15 23 42)" : "rgb(203 213 225)",
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-sky-300 via-indigo-300 to-fuchsia-300"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-[38rem] h-[38rem] rounded-full blur-3xl opacity-40 bg-gradient-to-tr from-emerald-300 via-cyan-200 to-blue-300"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.25),transparent_40%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <motion.div
          className="flex flex-col items-center text-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15,
            }}
          >
            <Logo className="w-20 h-20" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Badge className="gap-2" variant="secondary">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              On Base — L2 ready
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Decentralized Future on Base
          </motion.h1>

          <motion.p
            className="max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Build, own, and use applications without intermediaries. Our dApp
            combines smart contract transparency with the speed and low fees of
            the Base network.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button size="lg" className="gap-2 text-base">
              Join in <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="secondary" className="gap-2 text-base">
              Docs <FileText className="w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" /> Audited contracts
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" /> Low gas
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" /> Open source
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Description: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>What is the application?</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Our dApp is an open platform for secure on-chain interactions — from
            token swaps to digital asset management. No central server, no
            closed APIs.
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Decentralized nature</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The logic lives in smart contracts. Ownership and permissions are
            recorded on-chain, and community decisions are made through
            governance mechanisms.
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Why Base?</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Base is an efficient Layer 2 in the Ethereum ecosystem, providing
            low fees, high throughput, and smooth on-ramp to the Web3 world —
            perfect for mass adoption.
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  </section>
);

const HowItWorks: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Badge variant="secondary">How it works</Badge>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          From click to transaction
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Simple user flow reduces Web3 complexity to a few user-friendly steps.
        </p>
        <motion.div
          className="mt-6 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Step
              n={1}
              title="Connect wallet"
              text="We support popular EVM wallets. Your keys — your assets."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Step
              n={2}
              title="Choose action"
              text="Swap, mint, stake or build your own module. The interface guides you step by step."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Step
              n={3}
              title="Approve and sign"
              text="Transaction signed locally. We provide clear cost overview."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Step
              n={4}
              title="Finalization on Base"
              text="Fast confirmations and low costs thanks to Layer 2."
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <FeatureCarousel />
      </motion.div>
    </motion.div>
  </section>
);

const Roadmap: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Badge variant="secondary">Roadmap</Badge>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        From MVP to mass adoption
      </h2>
    </motion.div>

    <motion.div
      className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <RoadmapItem
          q="Q3 2025"
          title="MVP & audits"
          done
          points={[
            "Core contracts (swap, mint)",
            "Testnet + bug bounty",
            "Initial security audit",
          ]}
        />
        <RoadmapItem
          q="Q4 2025"
          title="Base Mainnet"
          points={[
            "UI/UX 1.0 launch",
            "Bridges and on-ramps",
            "Developer program",
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <RoadmapItem
          q="Q1 2026"
          title="Governance & DAO"
          points={[
            "Functional token for voting",
            "Delegations and proposals",
            "Ecosystem fund",
          ]}
        />
        <RoadmapItem
          q="Q2 2026"
          title="Ecosystem expansion"
          points={[
            "Module marketplace",
            "DeFi/NFT dApp integrations",
            "Mobile wallet friendly",
          ]}
        />
      </motion.div>
    </motion.div>
  </section>
);

const Community: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
    <motion.div
      className="rounded-2xl border border-slate-200 dark:border-slate-700 p-8 sm:p-10 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <motion.div
          className="md:col-span-2 space-y-3"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Badge variant="secondary" className="w-fit">
            Community
          </Badge>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Join the community
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We build openly. Follow progress, share ideas and participate in
            testing.
          </p>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2" variant="default">
                <Twitter className="w-5 h-5" /> Twitter
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2" variant="outline">
                <FileText className="w-5 h-5" /> Whitepaper
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="justify-self-center md:justify-self-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="gap-2 text-base">
              Join in <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8" />
        <span className="text-sm text-slate-500">
          © 2025 Decentralized Future • All rights reserved
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <a className="hover:underline" href="#">
          Twitter
        </a>
        <a className="hover:underline" href="#">
          Discord
        </a>
        <a className="hover:underline" href="#">
          Docs
        </a>
      </div>
    </div>
  </footer>
);

const Header: React.FC = () => (
  <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo className="w-8 h-8" />
        <span className="font-semibold tracking-tight">
          Decentralized Future
        </span>
      </div>
      <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600 dark:text-slate-300">
        <a href="#about" className="hover:text-slate-900 dark:hover:text-white">
          About
        </a>
        <a href="#how" className="hover:text-slate-900 dark:hover:text-white">
          How it works
        </a>
        <a
          href="#roadmap"
          className="hover:text-slate-900 dark:hover:text-white"
        >
          Roadmap
        </a>
        <a
          href="#community"
          className="hover:text-slate-900 dark:hover:text-white"
        >
          Community
        </a>
      </nav>
      <Button className="gap-2">
        Launch App <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  </header>
);

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
    <Header />
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
      <SectionAnchor id="roadmap">
        <Roadmap />
      </SectionAnchor>
      <SectionAnchor id="community">
        <Community />
      </SectionAnchor>
    </PageShell>
  );
};

export default LandingDappOnBase;
