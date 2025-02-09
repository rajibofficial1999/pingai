import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Gem, LogOut, Settings, UserIcon} from "lucide-react";
import {Link, useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import axiosInstance from "@/lib/axios.ts";
import {removeUser} from "@/lib/store/authSlice.ts";

const UserButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                        <Link to='/account/profile'>
                            Profile
                            <DropdownMenuShortcut>
                                <UserIcon className='size-3'/>
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                        <Link to='/account/billing'>
                            Billings
                            <DropdownMenuShortcut>
                                <Gem className='size-3'/>
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className='cursor-pointer'>
                        <Link to='/account/settings'>
                            Settings
                            <DropdownMenuShortcut>
                                <Settings className='size-3'/>
                            </DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer' onClick={handleSignOut}>
                    <span className='text-rose-500'> Log out</span>
                    <DropdownMenuShortcut>
                        <LogOut className='size-3 text-rose-500'/>
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserButton;