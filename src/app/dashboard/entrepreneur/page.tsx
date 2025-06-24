"use client";

import { mockCollaborationRequests, mockEntrepreneurs } from "@/lib/mock-data";

import List from "@components/common/List";
import Title from "@components/common/Title";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EntrepreneurCard from "@components/dashboard/EntrepreneurCard";
import CollaborationRequestCard from "@components/dashboard/CollaborationRequestCard";

const Page = () => {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6">
          <Title level="h2" className="text-card-foreground mb-2 text-3xl font-bold">
            Collaboration Requests
          </Title>
        </div>

        <List
          className="mb-9 grid grid-cols-1 gap-6 md:grid-cols-2"
          items={mockCollaborationRequests}
          renderItem={(collaborationRequest) => (
            <CollaborationRequestCard
              key={collaborationRequest.id}
              userRequests={collaborationRequest}
            />
          )}
        />

        <div className="mb-6">
          <Title level="h3" ariaLevel={3} className="text-card-foreground mb-2 text-3xl font-bold">
            Discover Entrepreneurs
          </Title>
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
