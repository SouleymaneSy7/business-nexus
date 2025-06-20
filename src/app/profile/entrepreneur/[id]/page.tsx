import { PagePropsType } from "@/types";
import { mockEntrepreneurs } from "@/lib/mock-data";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EntrepreneurProfile from "@components/profile/EntrepreneurProfile";

const page = async (props: { params: PagePropsType }) => {
  const params = await props.params;
  const entrepreneur = mockEntrepreneurs.find((event) => event.id == params.id);

  if (!entrepreneur) {
    return (
      <DashboardLayout>
        <div className="grid h-svh place-items-center">Investor Not Found</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <EntrepreneurProfile entrepreneur={entrepreneur} />
    </DashboardLayout>
  );
};

export default page;
