"use client";

import Chart from "./Chart";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChartCard = React.memo(() => {
  return (
    <Card className="card-height flex flex-col">
      <div className="flex justify-between align-middle">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Total Income</CardTitle>
          <CardDescription className="hidden sm:flex text-xs sm:text-sm">
            Lorem ipsum dolor sit amet.
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent className="flex-1 overflow-auto pb-4">
        <Chart />
      </CardContent>
    </Card>
  );
});

ChartCard.displayName = "ChartCard";

export default ChartCard;
