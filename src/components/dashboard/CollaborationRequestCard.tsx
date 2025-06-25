import * as React from "react";
import Link from "next/link";

import Title from "@components/common/Title";

import { Button } from "@components/ui/button";
import { mockInvestors } from "@/lib/mock-data";
import { AwardIcon, MapPinIcon, ReplyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Card, CardDescription, CardFooter, CardHeader } from "@components/ui/card";
import { CollaborationRequestPropsType } from "@/types";
import DateFormat from "@components/shared/DateFormat";

const CollaborationRequestCard: React.FC<CollaborationRequestPropsType> = ({ userRequests }) => {
  const investor = mockInvestors.find((investor) => investor.id === userRequests.investorId);

  if (!investor) {
    <div>No Collaboration Request</div>;
  }

  return (
    <Card className="bg-card rounded-lg p-6 shadow-md">
      <CardHeader className="flex flex-wrap items-start justify-between gap-3 p-0 lg:flex-nowrap">
        <div className="flex flex-wrap items-start gap-6">
          <Avatar className="size-20 shrink-0">
            <AvatarImage src={investor?.avatar} alt={investor?.name} />
            <AvatarFallback>
              {investor?.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <Title level="h2" ariaLevel={2} className="text-card-foreground text-lg font-semibold">
              {investor?.name}
            </Title>
            <p className="text-primary text-sm font-medium">{investor?.firm}</p>
            <div className="text-muted-foreground mt-1 flex flex-wrap items-center space-x-4 text-sm">
              <span className="flex items-center">
                <MapPinIcon className="mr-1 h-4 w-4" />
                {investor?.location}
              </span>

              <span className="flex items-center">
                <AwardIcon className="mr-1 h-4 w-4" />
                {investor?.yearsExperience} years exp.
              </span>
            </div>
          </div>
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            userRequests.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : userRequests.status === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
          }`}
        >
          {userRequests.status}
        </span>
      </CardHeader>

      <CardDescription className="text-muted-foreground mt-2 line-clamp-3 p-0">
        {userRequests.message}
      </CardDescription>

      <CardFooter className="flex items-center justify-between p-0">
        <div>
          <DateFormat dateString={userRequests.createdAt} />
        </div>

        <Button
          asChild
          className="text-primary bg-primary/30 hover:bg-primary/70 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-4 text-sm transition-colors"
        >
          <Link href={`/chat/${investor?.id}`}>
            <ReplyIcon className="h-4 w-4" />
            Reply
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CollaborationRequestCard;
