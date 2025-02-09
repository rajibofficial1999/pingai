import { DashboardPage } from "@/components/DashboardPage";
import { PaymentSuccessModal } from "@/components/PaymentSuccessModal";

import { useSearchParams } from "react-router";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  return (
    <>
      {searchParams.has("payment_status") &&
        searchParams.get("payment_status") === "success" && (
          <PaymentSuccessModal />
        )}

      <DashboardPage title="Dashboard">
        <div>Dashboard</div>
      </DashboardPage>
    </>
  );
};

export default Dashboard;
