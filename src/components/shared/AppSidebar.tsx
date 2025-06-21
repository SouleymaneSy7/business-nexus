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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = {
    name: "Souleymane",
    email: "souleymane@example.com",
    avatar: "/avatars/shadcn.jpg",
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <a href="#">
            <Title level="h1" ariaLevel={1} className="text-lg font-semibold">
              Business Nexus
            </Title>
          </a>
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
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
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
        <SidebarUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
