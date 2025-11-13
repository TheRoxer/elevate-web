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

const ChartCard = () => {
  return (
    <Card className="card-chart card-height">
      <div className="flex justify-between align-middle">
        <CardHeader className="ml-5 mt-3 pr-0">
          <CardTitle className="text-2xl">Total Income</CardTitle>
          <CardDescription className="hidden lg:flex">
            Lorem ipsum dolor sit amet.
          </CardDescription>
        </CardHeader>
      </div>

      <CardContent>
        <Chart />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
