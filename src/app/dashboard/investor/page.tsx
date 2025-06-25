"use client";

import { mockInvestors } from "@/lib/mock-data";

import List from "@components/common/List";
import Title from "@components/common/Title";
import InvestorCard from "@components/dashboard/InvestorCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <Title level="h1" ariaLevel={1} className="mb-2 text-3xl font-bold text-card-foreground">
            Your Dashboard
          </Title>

          <p className="text-muted-foreground">Manage collaboration requests and discover investors.</p>
        </div>

        <div>
          <Title level="h2" ariaLevel={2} className="mb-4 text-xl font-semibold text-card-foreground">
            Discover Investors
          </Title>

          <List
            className="relative-grid"
            items={mockInvestors}
            renderItem={(investor) => <InvestorCard key={investor.id} investor={investor} />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
