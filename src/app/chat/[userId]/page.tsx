import Chat from "@components/chat/Chat";
import { mockEntrepreneurs } from "@/lib/mock-data";
import DashboardLayout from "@components/dashboard/DashboardLayout";

export type PagePropsType = Promise<{ userId: string | number }>;

const user = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@techstartup.com",
  phone: "+1-555-0101",
  startupName: "TechFlow Solutions",
  bio: "Passionate entrepreneur with 8 years of experience in fintech and blockchain technology.",
  startupDescription:
    "Revolutionary payment processing platform that reduces transaction fees by 40% using blockchain technology.",
  fundingNeed: "$2.5M",
  industry: "Fintech",
  location: "San Francisco, CA",
  website: "www.techflow.com",
  foundedYear: 2023,
  teamSize: 12,
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b169a920?w=150&h=150&fit=crop&crop=faces",
  role: "entrepreneur",
};

const page = async (props: { params: PagePropsType }) => {
  const params = await props.params;
  const otherUser = mockEntrepreneurs.find((e) => e.id == params.userId);

  if (!otherUser) {
    return (
      <DashboardLayout>
        <div className="grid h-svh place-items-center">There is no Messages</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Chat currentUser={user} otherUser={otherUser} />
    </DashboardLayout>
  );
};

export default page;
