
export function Balance({ balance }) {
    return <div className="w-screen flex justify-center items-center py-6">
        <div className="text-xl text-black">
            Your Balance: <span className="font-bold">{balance}</span>
        </div>
    </div>
}