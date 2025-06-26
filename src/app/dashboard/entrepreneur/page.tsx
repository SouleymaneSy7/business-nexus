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
        <div className="mb-8">
          <Title
            level="h1"
            ariaLevel={1}
            className="text-card-foreground mb-2 text-4xl font-extrabold"
          >
            Welcome to Your Entrepreneur Dashboard
          </Title>

          <p className="text-muted-foreground mb-4">
            Track collaboration requests and discover new entrepreneurs to connect and grow your
            business.
          </p>
        </div>

        <div className="mb-6">
          <Title level="h2" className="text-card-foreground mb-2 text-3xl font-bold">
            Collaboration Requests
          </Title>

          <p className="text-muted-foreground mb-4">
            Review and manage collaboration requests from entrepreneurs:
          </p>
        </div>

        <List
          className="relative-grid mb-9"
          items={mockCollaborationRequests}
          renderItem={(collaborationRequest) => (
            <li key={collaborationRequest.id}>
              <CollaborationRequestCard userRequests={collaborationRequest} />
            </li>
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
          className="relative-grid"
          items={mockEntrepreneurs}
          renderItem={(entrepreneur) => (
            <li key={entrepreneur.id}>
              <EntrepreneurCard entrepreneur={entrepreneur} />
            </li>
          )}
        />
      </div>
    </DashboardLayout>
  );
};

export default Page;
