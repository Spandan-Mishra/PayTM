import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function TopBar() {
    const navigate = useNavigate();
    return <div className="flex justify-between items-center px-10 py-4 border-b border-slate-400">
        <div className="text-4xl font-bold text-blue-600">
            PayTM
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
            <div className="text-2xl">Hello, User</div>
            <Button onClick={() => {
                localStorage.removeItem("token");
                navigate("/signin");
            }} label="Logout" variant="primary" />
        </div>
    </div>
}