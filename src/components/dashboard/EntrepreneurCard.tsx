import * as React from "react";
import Link from "next/link";

import { Button } from "@components/ui/button";
import { getNameInitials } from "@/utils/getNameInitials";
import { EntrepreneurDataType } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPinIcon, BuildingIcon, MessageCircleIcon, EyeIcon } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card";

interface EntrepreneurCardPropsType {
  entrepreneur: EntrepreneurDataType[number];
}

const EntrepreneurCard: React.FC<EntrepreneurCardPropsType> = ({ entrepreneur }) => (
  <Card className="rounded-lg bg-white p-6 shadow-md">
    <CardHeader className="flex items-start space-x-4 p-0">
      <Avatar className="size-20 shrink-0">
        <AvatarImage src={entrepreneur.avatar} alt={entrepreneur.name} />
        <AvatarFallback>{getNameInitials(entrepreneur.name)}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <CardTitle level="h2" ariaLevel={2} className="text-lg font-semibold text-gray-900">
          {entrepreneur.name}
        </CardTitle>

        <p className="text-primary text-sm font-medium">{entrepreneur.startupName}</p>
        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <MapPinIcon className="mr-1 h-4 w-4" />
            {entrepreneur.location}
          </span>

          <span className="flex items-center">
            <BuildingIcon className="mr-1 h-4 w-4" />
            {entrepreneur.industry}
          </span>
        </div>
      </div>
    </CardHeader>

    <CardDescription className="mt-4 line-clamp-3 text-gray-600">
      {entrepreneur.startupDescription}
    </CardDescription>

    <CardFooter className="mt-4 flex items-center justify-between border-t border-gray-100 px-0 pt-4">
      <div className="text-sm">
        <span className="text-gray-500">Funding Need: </span>
        <span className="font-semibold text-green-600">{entrepreneur.fundingNeed}</span>
      </div>

      <div className="flex space-x-2">
        <Button
          asChild
          className="bg-primary/30 text-primary hover:bg-primary/40 flex cursor-pointer items-center rounded-lg px-3 py-1 text-sm transition-colors"
        >
          <Link href={`/chat/${entrepreneur.id}`}>
            <MessageCircleIcon className="mr-1 h-4 w-4" />
            Message
          </Link>
        </Button>

        <Button
          asChild
          className="flex cursor-pointer items-center rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-200"
        >
          <Link href={`/profile/entrepreneur/${entrepreneur.id}`}>
            <EyeIcon className="mr-1 h-4 w-4" />
            View Profile
          </Link>
        </Button>
      </div>
    </CardFooter>
  </Card>
);

export default EntrepreneurCard;
