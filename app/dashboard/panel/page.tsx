import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevate | Dashboard",
  description: "Elevate your business with our services",
};

import SideBar from "@/components/dashbard/Sidebar";
import Header from "@/components/dashbard/Header";

export default function Panel() {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <div className="content"></div>
      </div>
    </div>
  );
}
