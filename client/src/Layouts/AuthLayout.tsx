import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { Modal } from "@/components/ui/modal";
import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
      {/* sidebar for desktop */}
      <div className="hidden md:block w-64 lg:w-80 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* mobile header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-lg/7 font-semibold text-brand-900">
            Ping<span className="text-brand-700">Panda</span>
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        {/* main content area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
          <div className="relative min-h-full flex flex-col">
            <div className="h-full flex flex-col flex-1 space-y-4">
              <Outlet />
            </div>
          </div>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg/7 font-semibold text-brand-900">
              Ping<span className="text-brand-700">Panda</span>
            </p>
          </div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  );
};

export default AuthLayout;
