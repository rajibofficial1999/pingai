import { RootState } from "@/lib/store";
import { ArrowRight, MoveRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import MaxWidthWrapper from "./MaxWidthWrapper";
import MobileNav from "./MobileNav";
import { Button, buttonVariants } from "./ui/button";
import UserNavDropdown from "./UserNavDropdown";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link to="/" className="flex z-40 font-semibold">
            <img src="/images/logo.svg" alt="logo" width={150} />
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  to="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>
                <Button
                  asChild
                  className="h-9 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600"
                  size="sm"
                >
                  <Link to="/dashboard">
                    <span>Get started</span> <MoveRight className="size-5" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserNavDropdown />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
