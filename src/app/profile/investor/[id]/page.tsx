import { PagePropsType } from "@/types";
import { mockInvestors } from "@/lib/mock-data";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvestorProfile from "@components/profile/InvestorProfile";

const page = async (props: { params: PagePropsType }) => {
  const params = await props.params;
  const investor = mockInvestors.find((event) => event.id == params.id);

  if (!investor) {
    return (
      <DashboardLayout>
        <div className="grid h-svh place-items-center">Investor Not Found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <InvestorProfile investor={investor} />
    </DashboardLayout>
  );
};

export default page;
