import { Balance } from "../components/Balance";
import { TopBar } from "../components/TopBar";
import { useBalance } from "../hooks/useBalance";
import { Error } from "../components/Error";
import { Users } from "../components/Users";

export function Dashboard() {
    const { balance, error } = useBalance();
    return (
        <div className="h-screen bg-gray-100">
            {error != "" 
            ? <div className="flex justify-center items-center pt-10">
                <Error label={error} size="lg" />
                </div>
            : <div>
                <TopBar />
                <Balance balance={balance/100} />
                <Users />
            </div>}
        </div>
    )
}