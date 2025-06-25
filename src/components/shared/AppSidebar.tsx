"use client";
import * as React from "react";
import Link from "next/link";

import { BuildingIcon, DollarSignIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import List from "@components/common/List";
import Title from "@components/common/Title";
import SidebarUser from "./SidebarUser";
import { ThemeToggle } from "./ThemeToggle";
import Container from "@components/common/Container";
import { useRouter } from "next/router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const user = {
    name: "Souleymane",
    email: "souleymane@example.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
  };

  const navItems = [
    {
      title: "Entrepreneur Dashboard",
      url: "/dashboard/entrepreneur",
      icon: BuildingIcon,
    },
    {
      title: "Investor Dashboard",
      url: "/dashboard/investor",
      icon: DollarSignIcon,
    },
  ];

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild variant={"default"}>
          <Link href="/">
            <Title level="h1" ariaLevel={1} className="text-primary text-2xl font-semibold">
              Business Nexus
            </Title>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <List
                items={navItems}
                renderItem={(item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={router.pathname === item.url}>
                        <Link href={item.url} title={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }}
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Container className="flex items-center gap-4">
          <SidebarUser user={user} />
          <ThemeToggle />
        </Container>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
