import { Avatar, AvatarFallback } from "./ui/avatar";
import { Icons } from "./Icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import React from "react";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  iconClassName?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  iconClassName,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Avatar className={cn("relative w-8 h-8", className)}>
      {user?.avatar ? (
        <div className="relative aspect-square h-full w-full">
          <img
            src={user.avatar}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className={cn("h-4 w-4 text-zinc-900", iconClassName)} />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
