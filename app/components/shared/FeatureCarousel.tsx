import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Gauge,
  Zap,
  Globe,
  Link as LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Feature items for the carousel
const FEATURE_CARDS = [
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Self-Custody",
    text: "No intermediaries. Two clicks to sign and you're live on Base.",
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

export default FeatureCarousel;
