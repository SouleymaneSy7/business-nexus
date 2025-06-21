import * as React from "react";

import { SidebarInset, SidebarTrigger } from "@components/ui/sidebar";
import { AppSidebar } from "@components/shared/AppSidebar";
import Container from "@components/common/Container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <React.Fragment>
      <AppSidebar />

      <SidebarInset>
        <Container className="max-w-7xl p-6">
          <SidebarTrigger />
        </Container>
        <main>{children}</main>
      </SidebarInset>
    </React.Fragment>
  );
};

export default DashboardLayout;
