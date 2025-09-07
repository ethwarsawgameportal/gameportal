import React from "react";
import { motion } from "framer-motion";
// import { ArrowRight, Twitter, FileText } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
          {/* <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            We build openly. Follow progress, share ideas and participate in
            testing.
          </p> */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <span className="text-slate-500 dark:text-slate-400">
                Coming soon
              </span>
            </motion.div>
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="gap-2" variant="outline">
                <FileText className="w-5 h-5" /> Whitepaper
              </Button>
            </motion.div> */}
          </motion.div>
        </motion.div>

        {/* <motion.div
          className="justify-self-center md:justify-self-end"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="gap-2 text-base"
              onClick={() => (window.location.href = "/explore")}
            >
              Join in <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div> */}
      </div>
    </motion.div>
  </section>
);

export default Community;
