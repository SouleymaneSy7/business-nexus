import * as React from "react";

import { DashboardLayoutPropsType } from "@/types";
import { AppSidebar } from "@components/shared/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";

import Container from "@components/common/Container";

const DashboardLayout: React.FC<DashboardLayoutPropsType> = ({ children }) => {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AppSidebar />

        <div>
          <Container className="max-w-7xl p-6">
            <SidebarTrigger />
          </Container>
          <main role="main">{children}</main>
        </div>
      </SidebarProvider>
    </React.Fragment>
  );
};

export default DashboardLayout;
