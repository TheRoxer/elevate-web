import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Orders from "./RecentOrders";

const RecentCard = React.memo(() => {
  return (
    <Card className="card-height flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl">Recent orders</CardTitle>
        <CardDescription className="hidden sm:flex text-xs sm:text-sm">
          Lorem ipsum dolor sit amet.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto pb-4">
        <Orders />
      </CardContent>
    </Card>
  );
});

RecentCard.displayName = "RecentCard";

export default RecentCard;
