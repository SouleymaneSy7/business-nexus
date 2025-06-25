"use client";

import { mockCollaborationRequests, mockInvestors } from "@/lib/mock-data";

import List from "@components/common/List";
import Title from "@components/common/Title";
import InvestorCard from "@components/dashboard/InvestorCard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CollaborationRequestCard from "@components/dashboard/CollaborationRequestCard";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8">
          <Title level="h1" ariaLevel={1} className="text-card-foreground mb-2 text-3xl font-bold">
            Investor Dashboard
          </Title>

          <p className="text-muted-foreground">
            Manage collaboration requests and discover investors.
          </p>
        </div>

        <div className="mb-6">
          <Title level="h2" className="text-card-foreground mb-2 text-2xl font-bold">
            Collaboration Requests
          </Title>
        </div>

        <List
          as={"div"}
          className="relative-grid mb-9"
          items={mockCollaborationRequests}
          renderItem={(collaborationRequest) => (
            <CollaborationRequestCard
              key={collaborationRequest.id}
              userRequests={collaborationRequest}
            />
          )}
        />

        <div>
          <Title
            level="h2"
            ariaLevel={2}
            className="text-card-foreground mb-4 text-2xl font-semibold"
          >
            Discover Investors
          </Title>

          <List
            as={"div"}
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
