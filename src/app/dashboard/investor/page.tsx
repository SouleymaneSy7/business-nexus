"use client";

import { mockInvestors } from "@/lib/mock-data";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import List from "@components/common/List";
import InvestorCard from "@components/dashboard/InvestorCard";
import Title from "@components/common/Title";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <Title level="h1" ariaLevel={1} className="mb-2 text-3xl font-bold text-gray-900">
            Your Dashboard
          </Title>

          <p className="text-gray-600">Manage collaboration requests and discover investors.</p>
        </div>

        <div>
          <Title level="h2" ariaLevel={2} className="mb-4 text-xl font-semibold text-gray-900">
            Discover Investors
          </Title>

          <List
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            items={mockInvestors}
            renderItem={(investor) => <InvestorCard key={investor.id} investor={investor} />}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
