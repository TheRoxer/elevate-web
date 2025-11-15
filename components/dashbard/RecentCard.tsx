import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Orders from "./RecentOrders";

const RecentCard = () => {
  return (
    <Card className="card-recent card-height">
      <CardHeader className="">
        <CardTitle className="">Recent orders</CardTitle>
        <CardDescription className="hidden lg:flex">
          Lorem ipsum dolor sit amet.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Orders />
      </CardContent>
    </Card>
  );
};

export default RecentCard;
