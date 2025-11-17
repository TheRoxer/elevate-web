"use client";

import { Metadata } from "next";
import "./page.css";
import { motion } from "framer-motion";
import { useAdminOnly } from "@/hooks/useAdminOnly";

import Header from "@/components/dashboard/Header";
import ChartCard from "@/components/dashboard/ChartCard";
import RecentCard from "@/components/dashboard/RecentCard";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export default function Panel() {
  const { loading } = useAdminOnly();

  // if (loading) {
  //   return (
  //     <DashboardLayoutClient>
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="text-center">
  //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //           <p className="text-muted-foreground">Loading...</p>
  //         </div>
  //       </div>
  //     </DashboardLayoutClient>
  //   );
  // }

  return (
    <DashboardLayoutClient>
      <Header />
      <div className="flex flex-col gap-4 p-4 md:p-6 lg:p-8 overflow-auto h-[calc(100vh-69px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <ChartCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full"
        >
          <RecentCard />
        </motion.div>
      </div>
    </DashboardLayoutClient>
  );
}
