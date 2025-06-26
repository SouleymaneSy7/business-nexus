import * as React from "react";

import { DashboardLayoutPropsType } from "@/types";
import { AppSidebar } from "@components/shared/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";

import Container from "@components/common/Container";



const DashboardLayout: React.FC<DashboardLayoutPropsType> = ({ children }) => {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <Container className="max-w-7xl p-6">
            <SidebarTrigger />
          </Container>
          <main role="main">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </React.Fragment>
  );
};

export default DashboardLayout;
