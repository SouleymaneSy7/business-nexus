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

        <div className="flex flex-col min-h-screen w-full">
          <Container className="max-w-7xl p-6 mx-auto">
            <SidebarTrigger />
          </Container>
          <main role="main">{children}</main>
        </div>
      </SidebarProvider>
    </React.Fragment>
  );
};

export default DashboardLayout;
