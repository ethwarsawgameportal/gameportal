import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "../shared";

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
            Vibeez Arcade on Base
          </motion.h1>

          <motion.p
            className="max-w-2xl text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Play exciting arcade games and earn rewards! Our gaming portal
            brings classic and modern games to Web3, powered by the fast and
            affordable Base network.
          </motion.p>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Button
              size="lg"
              className="gap-2 text-base"
              onClick={() => (window.location.href = "/explore")}
            >
              Join in <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              className="gap-2 text-base"
              onClick={() => (window.location.href = "/leaderboard")}
            >
              Leaderboard <ArrowRight className="w-5 h-5" />
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

export default Hero;
