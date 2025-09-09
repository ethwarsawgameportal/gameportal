import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/src/components/ui/badge";
import { Step, FeatureCarousel } from "../shared";

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
              title="Play games"
              text="Play exciting arcade games and earn points. The interface guides you through each game."
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
              title="Sign score"
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

export default HowItWorks;
