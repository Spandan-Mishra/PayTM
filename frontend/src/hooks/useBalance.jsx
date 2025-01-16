import axios from "axios";
import { useEffect, useState } from "react";

export function useBalance() {
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState("");

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: token
                }
            })
            
            setBalance(response.data.balance);
            setError("");
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    useEffect(() => {
        fetchBalance();
        let interval = setInterval(() => {
            fetchBalance();
        }, 20 * 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return { balance, error };
}