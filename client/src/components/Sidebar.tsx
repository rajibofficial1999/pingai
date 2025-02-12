import { cn } from "@/lib/utils";
import { Gem, Home, LucideIcon, Settings } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "./ui/button";
import UserSidebarDropDown from "@/components/UserSidebarDropDown";

interface SidebarItem {
  href: string;
  icon: LucideIcon;
  text: string;
}

interface SidebarCategory {
  category: string;
  items: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [
      { href: "/dashboard/billing", icon: Gem, text: "Billing" },
      {
        href: "/dashboard/account-settings",
        icon: Settings,
        text: "Settings",
      },
    ],
  },
  {
    category: "Test",
    items: [{ href: "/dashboard/test", icon: Gem, text: "Test" }],
  },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="space-y-4 md:space-y-6 relative z-20 flex flex-col h-full">
      {/* logo */}
      <Link to="/">
        <img src="/images/logo.svg" alt="logo" width={150} />
      </Link>

      {/* navigation items */}
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    to={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-3 w-full h-px bg-gray-100" />
        <UserSidebarDropDown />
      </div>
    </div>
  );
};

export default Sidebar;
