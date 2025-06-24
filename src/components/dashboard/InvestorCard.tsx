import * as React from "react";
import Link from "next/link";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { MapPinIcon, AwardIcon, MessageCircleIcon, EyeIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { getNameInitials } from "@/utils/getNameInitials";
import { InvestorCardProps } from "@/types";

const InvestorCard: React.FC<InvestorCardProps> = ({ investor }) => (
  <Card className="bg-card rounded-lg p-6 shadow-md">
    <CardHeader className="flex flex-wrap items-start space-x-4 p-0 lg:flex-nowrap">
      <Avatar className="size-20 shrink-0">
        <AvatarImage src={investor.avatar} alt={investor.name} />
        <AvatarFallback>{getNameInitials(investor.name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <CardTitle level="h3" ariaLevel={3} className="text-card-foreground text-lg font-semibold">
          {investor.name}
        </CardTitle>

        <p className="text-primary font-medium">{investor.firm}</p>
        <div className="text-muted-foreground mt-1 flex flex-wrap items-center space-x-4 text-sm lg:flex-nowrap">
          <span className="flex items-center">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {investor.location}
          </span>

          <span className="flex items-center">
            <AwardIcon className="mr-1 h-4 w-4" />
            {investor.yearsExperience} years exp.
          </span>
        </div>
      </div>
    </CardHeader>

    <CardContent className="p-0">
      <CardDescription className="text-muted-foreground mt-4 line-clamp-3">
        {investor.bio}
      </CardDescription>

      <div className="mt-4">
        <div className="text-muted-foreground mb-2 text-sm">Investment Interests:</div>

        <div className="flex flex-wrap gap-1">
          {investor.investmentInterests.slice(0, 3).map((interest: string, index: number) => (
            <span key={index} className="text-primary bg-primary/30 rounded-full px-2 py-1 text-xs">
              {interest}
            </span>
          ))}

          {investor.investmentInterests.length > 3 && (
            <span className="bg-secondary text-card-foreground rounded-full px-2 py-1 text-xs">
              +{investor.investmentInterests.length - 3} more
            </span>
          )}
        </div>
      </div>
    </CardContent>

    <CardFooter className="border-border mt-4 flex flex-col flex-wrap items-start justify-start gap-3 border-t p-0 lg:flex-row lg:flex-nowrap lg:items-center lg:justify-between">
      <div className="text-sm">
        <span className="text-muted-foreground">Investment Range: </span>
        <span className="font-semibold text-green-600">{investor.investmentRange}</span>
      </div>

      <div className="flex flex-wrap gap-3 space-x-2 lg:flex-nowrap">
        <Button
          asChild
          className="text-primary bg-primary/30 hover:bg-primary/70 flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1 text-sm transition-colors"
        >
          <Link href={`/chat/${investor.id}`}>
            <MessageCircleIcon className="h-4 w-4" />
            Message
          </Link>
        </Button>

        <Button
          asChild
          className="bg-secondary text-card-foreground dark:hover:bg-secondary/30 flex items-center rounded-lg px-3 py-1 text-sm transition-colors hover:bg-gray-200"
        >
          <Link href={`/profile/investor/${investor.id}`}>
            <EyeIcon className="mr-1 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default InvestorCard;
