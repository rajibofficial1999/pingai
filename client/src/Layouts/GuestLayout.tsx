import {Navigate, Outlet} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";

const GuestLayout = () => {
    const {isLoggedIn} = useSelector((state: RootState) => state.auth)

    if(isLoggedIn) {
        return <Navigate to='/dashboard'/>
    }
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default GuestLayout;