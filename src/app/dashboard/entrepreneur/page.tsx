"use client";

import { mockEntrepreneurs } from "@/lib/mock-data";

import List from "@components/common/List";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EntrepreneurCard from "@components/dashboard/EntrepreneurCard";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <h2 className="text-card-foreground mb-2 text-3xl font-bold">Discover Entrepreneurs</h2>
          <p className="text-muted-foreground">
            Find promising startups and entrepreneurs to invest in:
          </p>
        </div>

        <List
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          items={mockEntrepreneurs}
          renderItem={(entrepreneur) => (
            <EntrepreneurCard key={entrepreneur.id} entrepreneur={entrepreneur} />
          )}
        />
      </div>
    </DashboardLayout>
  );
};

export default Page;
