import { Route, Routes } from "react-router";
import GuestLayout from "@/layouts/GuestLayout";
import Home from "@/pages/Home";
import AuthLayout from "@/layouts/AuthLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/dashboard/Index";
import Pricing from "@/pages/Pricing";
import Billing from "@/pages/dashboard/Profile/Billing";
import Settings from "@/pages/dashboard/Profile/Settings";
import Profile from "@/pages/dashboard/Profile/Index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pricing" element={<Pricing />} />

      <Route element={<GuestLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default App;
