import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

export default Description;
