import * as React from "react";
import Link from "next/link";

import {
  ArrowLeftIcon,
  AwardIcon,
  BuildingIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { InvestorProfilePropsType } from "@/types";
import { getNameInitials } from "@/utils/getNameInitials";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import List from "@components/common/List";
import Title from "@components/common/Title";
import Container from "@components/common/Container";
import VisuallyHidden from "@components/common/VisuallyHidden";

const InvestorProfile: React.FC<InvestorProfilePropsType> = ({ investor }) => (
  <Container className="mx-auto max-w-4xl p-6">
    <Button
      asChild
      variant={"ghost"}
      className="text-primary hover:text-primary hover:bg-primary/30 mb-6 px-4 py-2 transition-colors"
    >
      <Link href={"/dashboard/investor"} title="Go back to dashboard">
        <ArrowLeftIcon />
        Back to Dashboard
        <VisuallyHidden>Go back to dashboard</VisuallyHidden>
      </Link>
    </Button>

    <div className="bg-card overflow-hidden rounded-xl shadow-lg">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
        <div className="flex items-start space-x-6">
          <Avatar className="size-24 shrink-0 border-4 border-white">
            <AvatarImage src={investor.avatar} alt={investor.name} />
            <AvatarFallback className="font-medium text-black">
              {getNameInitials(investor.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Title level="h1" ariaLevel={1} className="mb-2 text-3xl font-bold">
              {investor.name}
            </Title>
            <p className="mb-2 text-xl text-green-100">{investor.firm}</p>

            <div className="flex items-center space-x-6 text-green-100">
              <span className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {investor.location}
              </span>

              <span className="flex items-center gap-1">
                <AwardIcon className="h-4 w-4" />
                {investor.yearsExperience} years experience
              </span>

              <span className="flex items-center gap-1">
                <BuildingIcon className="h-4 w-4" />
                {investor.totalInvestments} investments
              </span>
            </div>
          </div>

          <Button
            asChild
            className="text-primary hover:bg-primary/15 cursor-pointer bg-white px-6 py-2 font-medium transition-colors"
          >
            <Link href={`/chat/${investor.id}`} className="flex gap-2">
              <MessageCircleIcon className="h-4 w-4" />
              Message
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <Title
                level="h2"
                ariaLevel={2}
                className="text-card-foreground mb-4 text-2xl font-bold"
              >
                About
              </Title>
              <p className="text-muted-foreground leading-relaxed">{investor.bio}</p>
            </div>

            <div>
              <Title
                level="h2"
                ariaLevel={2}
                className="text-card-foreground mb-4 text-2xl font-bold"
              >
                Investment Interests
              </Title>

              <List
                className="flex flex-wrap gap-2"
                items={investor.investmentInterests}
                renderItem={(interest) => (
                  <li key={interest}>
                    <span className="bg-primary/30 text-primary rounded-full px-3 py-1 text-sm font-medium">
                      {interest}
                    </span>
                  </li>
                )}
              />
            </div>

            <div>
              <Title
                level="h2"
                ariaLevel={2}
                className="text-card-foreground mb-4 text-2xl font-bold"
              >
                Companies
              </Title>

              <List
                className="grid grid-cols-2 gap-4"
                items={investor.portfolioCompanies}
                renderItem={(item) => (
                  <li key={item}>
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-secondary-foreground text-sm font-medium">{item}</div>
                    </div>
                  </li>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary rounded-lg p-6">
              <Title
                level="h3"
                ariaLevel={3}
                className="text-card-foreground mb-4 text-lg font-semibold"
              >
                Investment Details
              </Title>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Range:</span>
                  <span className="font-semibold text-green-600">{investor.investmentRange}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-semibold">{investor.yearsExperience} years</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investments:</span>
                  <span className="font-semibold">{investor.totalInvestments}</span>
                </div>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <Title
                level="h3"
                ariaLevel={3}
                className="text-card-foreground mb-4 text-lg font-semibold"
              >
                Contact Information
              </Title>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MailIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground/50 text-sm">{investor.email}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <PhoneIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground/50 text-sm">{investor.phone}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <GlobeIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-primary text-sm">{investor.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default InvestorProfile;
