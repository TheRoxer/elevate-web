import { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "Elevate | Dashboard",
  description: "Elevate your business with our services",
};

import SideBar from "@/components/dashbard/Sidebar";
import Header from "@/components/dashbard/Header";
import ChartCard from "@/components/dashbard/ChartCard";
import RecentCard from "@/components/dashbard/RecentCard";

export default function Panel() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <div className="content">
          <ChartCard />
          <RecentCard />
        </div>
      </div>
    </div>
  );
}
