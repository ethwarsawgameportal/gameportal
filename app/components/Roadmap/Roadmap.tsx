// import React from "react";
// import { motion } from "framer-motion";
// import { Badge } from "@/components/ui/badge";
// import { RoadmapItem } from "../shared";

// const Roadmap: React.FC = () => (
//   <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
//     <motion.div
//       className="space-y-3"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       <Badge variant="secondary">Roadmap</Badge>
//       <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//         From MVP to mass adoption
//       </h2>
//     </motion.div>

//     <motion.div
//       className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-100px" }}
//       transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
//     >
//       <motion.div
//         initial={{ opacity: 0, x: -30 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: 0.3 }}
//       >
//         <RoadmapItem
//           q="Q3 2025"
//           title="MVP & audits"
//           done
//           points={[
//             "Core contracts (swap, mint)",
//             "Testnet + bug bounty",
//             "Initial security audit",
//           ]}
//         />
//         <RoadmapItem
//           q="Q4 2025"
//           title="Base Mainnet"
//           points={[
//             "UI/UX 1.0 launch",
//             "Bridges and on-ramps",
//             "Developer program",
//           ]}
//         />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, x: 30 }}
//         whileInView={{ opacity: 1, x: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//       >
//         <RoadmapItem
//           q="Q1 2026"
//           title="Governance & DAO"
//           points={[
//             "Functional token for voting",
//             "Delegations and proposals",
//             "Ecosystem fund",
//           ]}
//         />
//         <RoadmapItem
//           q="Q2 2026"
//           title="Ecosystem expansion"
//           points={[
//             "Module marketplace",
//             "DeFi/NFT dApp integrations",
//             "Mobile wallet friendly",
//           ]}
//         />
//       </motion.div>
//     </motion.div>
//   </section>
// );

// export default Roadmap;
