import axiosInstance from "@/lib/axios";
import { removeUser } from "@/lib/store/authSlice";
import { Gem, LayoutDashboard, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { Icons } from "./Icons";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { RootState } from "@/lib/store";

const UserAccountNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {user?.name && (
              <p className="font-medium text-sm text-black">{user.name}</p>
            )}
            {user?.email && (
              <p className="w-[200px] truncate text-xs text-zinc-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" to="/dashboard">
            <LayoutDashboard className="text-blue-600 h-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" to="/pricing">
            <Gem className="text-blue-600 h-4" />
            Upgrade
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <button
            onClick={handleSignOut}
            className="text-red-500 flex items-center"
          >
            <LogOut className="h-4" /> <span>Log out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
