import { useNavigate, useSearchParams } from "react-router-dom"
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";
import { Error } from "../components/Error";
import BarLoader from "react-spinners/BarLoader";

export function Send() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState("");
    const [showTransfer, setShowTransfer] = useState(false);

    const handleSend = async () => {
        try {
            await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: id,
                amount: amount
            }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                }
            })
            
            setShowTransfer(true);
            setAmount(0);
            setError("");

            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } catch(e) {
            setError(e.response.data.message);
        }
    }

    return <>
    {showTransfer && (
        <div className={`flex justify-center items-center h-screen w-screen bg-black bg-opacity-90 fixed top-0 left-0 z-50`}>
            <div className="flex flex-col gap-4 justify-center items-center bg-white rounded-md shadow-md w-auto p-8">
                <div className="flex items-center gap-2">
                    <div className="text-3xl font-bold">Transaction Successful!</div>
                    <img src="/tick.png" alt="tick" className="w-20 h-20 pb-2" />
                </div>
                <div className="text-xl mb-4">Redirecting back to dashboard</div>
                <BarLoader color="#000" />
            </div>
        </div> 
    )}

    <div className="bg-sky-900 flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center min-w-96 max-w-full bg-white rounded-md shadow-md p-8">
            <div className="font-bold text-4xl text-center">Send Money</div>
            <div className="flex items-center gap-5 my-8">
                <img src="/profile-icon.jpg" alt="profile" className="w-12 h-12 rounded-full" />
                <div className="font-bold text-2xl">{name}</div>
            </div>
            <InputBox label="Amount (in Rs.)" name="amount" placeholder="Enter amount.." type="number" onChange={(e) => setAmount(e.target.value)} size="sm" />
            <Error label={error} size="sm" />
            <Button label="Send" variant="primary" onClick={handleSend} />
        </div>
    </div>
    </>
}