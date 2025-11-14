import { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "Elevate | Dashboard",
  description: "Elevate your business with our services",
};

import Header from "@/components/dashbard/Header";
import ChartCard from "@/components/dashbard/ChartCard";
import RecentCard from "@/components/dashbard/RecentCard";
import DashboardLayoutClient from "@/components/dashbard/DashboardLayoutClient";

export default function Panel() {
  return (
    <DashboardLayoutClient>
      <Header />
      <div className="content">
        <ChartCard />
        <RecentCard />
      </div>
    </DashboardLayoutClient>
  );
}
