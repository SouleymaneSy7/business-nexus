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
          <Title
            level="h1"
            ariaLevel={1}
            className="text-card-foreground mb-2 text-4xl font-extrabold tracking-tight"
          >
            Investor Dashboard
          </Title>

          <p className="text-muted-foreground">
            Unlock tailored investment opportunities designed to accelerate your company `&apos;`s
            growth and diversification.
          </p>
        </div>

        <div>
          <Title
            level="h2"
            ariaLevel={2}
            className="text-card-foreground mb-4 text-2xl font-semibold"
          >
            Discover Investors
          </Title>

          <List
            as={"section"}
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
