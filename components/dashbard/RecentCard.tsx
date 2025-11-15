import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Orders from "./Orders";

const RecentCard = () => {
  return (
    <Card className="card-recent card-height">
      <CardHeader className="ml-5 mt-3">
        <CardTitle className="text-2xl">Recent orders</CardTitle>
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
