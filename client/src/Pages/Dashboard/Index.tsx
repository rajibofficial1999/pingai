import { DashboardPage } from "@/components/DashboardPage";
import { PaymentSuccessModal } from "@/components/PaymentSuccessModal";
import { Button } from "@/components/ui/button.tsx";
import axiosInstance from "@/lib/axios.ts";
import { removeUser } from "@/lib/store/authSlice.ts";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const handleSignOut = async () => {
    try {
      const { data } = await axiosInstance.post("/auth/sign-out");
      if (data.success) {
        dispatch(removeUser());
      }

      navigate("/sign-in");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {searchParams.has("payment_status") &&
        searchParams.get("payment_status") === "success" && (
          <PaymentSuccessModal />
        )}

      <DashboardPage title="Dashboard">
        <div>Dashboard</div>
        <div>
          <Button onClick={handleSignOut}>Sign out</Button>
        </div>
      </DashboardPage>
    </>
  );
};

export default Dashboard;
