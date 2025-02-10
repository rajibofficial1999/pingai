
import {DashboardPage} from "@/components/DashboardPage.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";

const Settings = () => {
    const {user} = useSelector((state: RootState) => state.auth);

    return (
        <DashboardPage title="Account Settings">
            Account Settings <br/>
            {user?.name}
        </DashboardPage>
    )
}

export default Settings