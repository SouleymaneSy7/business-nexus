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
  <Card className="rounded-lg bg-white p-6 shadow-md">
    <CardHeader className="flex items-start space-x-4 p-0">
      <Avatar className="size-20 shrink-0">
        <AvatarImage src={investor.avatar} alt={investor.name} />
        <AvatarFallback>{getNameInitials(investor.name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <CardTitle level="h3" ariaLevel={3} className="text-lg font-semibold text-gray-900">
          {investor.name}
        </CardTitle>

        <p className="text-primary font-medium">{investor.firm}</p>
        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
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

    <CardContent>
      <CardDescription className="mt-4 line-clamp-3 text-gray-600">{investor.bio}</CardDescription>

      <div className="mt-4">
        <div className="mb-2 text-sm text-gray-500">Investment Interests:</div>

        <div className="flex flex-wrap gap-1">
          {investor.investmentInterests.slice(0, 3).map((interest: string, index: any) => (
            <span key={index} className="text-primary bg-primary/30 rounded-full px-2 py-1 text-xs">
              {interest}
            </span>
          ))}

          {investor.investmentInterests.length > 3 && (
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
              +{investor.investmentInterests.length - 3} more
            </span>
          )}
        </div>
      </div>
    </CardContent>

    <CardFooter className="mt-4 flex flex-col flex-wrap items-start justify-start gap-3 border-t border-gray-100 p-0 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm">
        <span className="text-gray-500">Investment Range: </span>
        <span className="font-semibold text-green-600">{investor.investmentRange}</span>
      </div>

      <div className="flex space-x-2">
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
          className="flex items-center rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
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
