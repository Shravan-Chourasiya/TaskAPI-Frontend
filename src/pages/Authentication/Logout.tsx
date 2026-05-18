import { Button } from "@/components/ui/button"
import { config } from "@/utils/config";
import axios from "axios";

const Logout = () => {
    const handleLogout = async () => {
        const res = await axios.post(
            `${config.SERVER_URL}/api/v1/auth/logout`,
            {},
            { withCredentials: true }
        ).catch((err) => {
            console.error("Logout failed:", err);
            alert("Logout failed. Please try again.");
        });
        console.log(res);
        window.location.href = '/login';
    }


    return (
        <div>
            <Button onClick={handleLogout}>Logout </Button>
        </div>
    )
}

export default Logout
