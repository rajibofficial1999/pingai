import { Route, Routes } from "react-router";
import GuestLayout from "@/Layouts/GuestLayout.tsx";
import Home from "@/Pages/Home.tsx";
import AuthLayout from "@/Layouts/AuthLayout.tsx";
import SignIn from "@/Pages/Auth/SignIn.tsx";
import SignUp from "@/Pages/Auth/SignUp.tsx";
import Dashboard from "@/Pages/Dashboard/Index";
import Pricing from "@/Pages/Pricing";
import Billing from "@/Pages/Dashboard/Billing";

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
        <Route path="/dashboard/billing" element={<Billing />} />
      </Route>
    </Routes>
  );
};

export default App;
