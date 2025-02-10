import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Gem, LogOut, Settings, UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "@/lib/axios.ts";
import { removeUser } from "@/lib/store/authSlice.ts";
import UserAvatar from "./UserAvatar";
import { RootState } from "@/lib/store";

const UserButton = () => {
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
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="outline-none border-none ring-0 flex items-center"
        >
          <UserAvatar className="size-10" iconClassName="size-5" />
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 justify-start leading-none">
              {user?.name && (
                <p className="font-medium text-left text-sm text-black">
                  {user.name}
                </p>
              )}
              {user?.email && (
                <p className="w-[200px] text-left truncate text-xs text-zinc-700">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/dashboard/profile">
              Profile
              <DropdownMenuShortcut>
                <UserIcon className="size-3" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/dashboard/billing">
              Billings
              <DropdownMenuShortcut>
                <Gem className="size-3" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/dashboard/settings">
              Settings
              <DropdownMenuShortcut>
                <Settings className="size-3" />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <span className="text-rose-500"> Log out</span>
          <DropdownMenuShortcut>
            <LogOut className="size-3 text-rose-500" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
