"use client";

import { Metadata } from "next";
import "./page.css";
import { motion } from "framer-motion";

import Header from "@/components/dashbard/Header";
import ChartCard from "@/components/dashbard/ChartCard";
import RecentCard from "@/components/dashbard/RecentCard";
import DashboardLayoutClient from "@/components/dashbard/DashboardLayoutClient";

export default function Panel() {
  return (
    <DashboardLayoutClient>
      <Header />
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-chart"
        >
          <ChartCard />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="card-recent"
        >
          <RecentCard />
        </motion.div>
      </div>
    </DashboardLayoutClient>
  );
}
