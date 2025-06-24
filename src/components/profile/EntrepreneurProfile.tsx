import * as React from "react";
import Link from "next/link";

import {
  ArrowLeftIcon,
  BuildingIcon,
  CalendarIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { EntrepreneurProfilePropsType } from "@/types";
import { getNameInitials } from "@/utils/getNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";

import Title from "@components/common/Title";
import Container from "@components/common/Container";
import VisuallyHidden from "@components/common/VisuallyHidden";

const EntrepreneurProfile: React.FC<EntrepreneurProfilePropsType> = ({ entrepreneur }) => (
  <Container className="mx-auto max-w-4xl p-6">
    <Button
      asChild
      variant={"ghost"}
      className="text-primary hover:bg-primary/30 hover:text-primary mb-6 transition-colors"
    >
      <Link href={"/dashboard/entrepreneur"} title="Go back to dashboard">
        <ArrowLeftIcon />
        Back to Dashboard
        <VisuallyHidden>Go back to dashboard</VisuallyHidden>
      </Link>
    </Button>

    <div className="bg-card overflow-hidden rounded-xl shadow-lg">
      <div className="text-card-foreground bg-gradient-to-r from-blue-600 to-purple-600 p-8">
        <div className="flex flex-col items-start space-y-3 md:flex-row md:space-x-6">
          <Avatar className="size-24 shrink-0 border-4 border-white">
            <AvatarImage src={entrepreneur.avatar} alt={entrepreneur.name} />
            <AvatarFallback>{getNameInitials(entrepreneur.name)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Title level="h1" ariaLevel={1} className="mb-2 text-3xl font-bold text-white">
              {entrepreneur.name}
            </Title>
            <p className="mb-2 text-xl text-blue-100">{entrepreneur.startupName}</p>

            <div className="flex flex-wrap items-center space-x-6 text-blue-100">
              <span className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4" />
                {entrepreneur.location}
              </span>

              <span className="flex items-center gap-2">
                <BuildingIcon className="h-4 w-4" />
                {entrepreneur.industry}
              </span>

              <span className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Founded {entrepreneur.foundedYear}
              </span>
            </div>
          </div>

          <Button
            asChild
            className="text-primary cursor-pointer bg-white px-6 py-2 font-medium transition-colors hover:bg-blue-50"
          >
            <Link href={`/chat/${entrepreneur.id}`} className="flex gap-2">
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
              <p className="text-muted-foreground leading-relaxed">{entrepreneur.bio}</p>
            </div>

            <div>
              <Title
                level="h2"
                ariaLevel={2}
                className="text-card-foreground mb-4 text-2xl font-bold"
              >
                Startup Description
              </Title>
              <p className="text-muted-foreground leading-relaxed">
                {entrepreneur.startupDescription}
              </p>
            </div>

            <div>
              <Title
                level="h2"
                ariaLevel={2}
                className="text-card-foreground mb-4 text-2xl font-bold"
              >
                Pitch Deck
              </Title>

              <div className="border-border bg-secondary rounded-lg border-2 border-dashed p-8 text-center">
                <p className="text-muted-foreground">Pitch deck will be available upon request</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary rounded-lg p-6">
              <Title
                level="h3"
                ariaLevel={3}
                className="text-card-foreground mb-4 text-lg font-semibold"
              >
                Key Metrics
              </Title>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding Need:</span>
                  <span className="font-semibold text-green-600">{entrepreneur.fundingNeed}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team Size:</span>
                  <span className="text-card-foreground font-semibold">
                    {entrepreneur.teamSize} people
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="text-card-foreground font-semibold">
                    {entrepreneur.foundedYear}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="text-card-foreground font-semibold">
                    {entrepreneur.industry}
                  </span>
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
                <a href="#" target="_blank" className="flex items-center space-x-2">
                  <MailIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground/50 text-sm">{entrepreneur.email}</span>
                </a>

                <div className="flex items-center space-x-2">
                  <PhoneIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-muted-foreground/50 text-sm">{entrepreneur.phone}</span>
                </div>

                <a href={"#"} target="_blank" className="flex items-center space-x-2">
                  <GlobeIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-primary text-sm">{entrepreneur.website}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default EntrepreneurProfile;
