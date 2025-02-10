import Navbar from "@/components/Navbar";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router";

const GuestLayout = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <div className="min-h-screen w-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1 flex-col justify-center font-[sans-serif] w-full p-4 h-full">
          <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
            <div className="text-center mb-12">
              <Link to="/">
                <img
                  src="/images/logo.svg"
                  alt="logo"
                  className="w-40 inline-block"
                />
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestLayout;
