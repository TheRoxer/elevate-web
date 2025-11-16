"use client";

import React, { ReactNode } from "react";
import { useRequireAuth } from "@/hooks/useRequireAuth";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // const { loading } = useRequireAuth();

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
