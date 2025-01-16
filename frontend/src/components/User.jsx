import { Button } from "./Button";

export function User({ user }) {
    return <div key={user._id} className="flex justify-between items-center w-full bg-gray-200 shadow-md rounded-md py-3 px-8 mb-6 hover:shadow-lg duration-200">
        <div className=" flex justify-center items-center gap-5 font-bold text-2xl">
            <img src="/profile-icon.jpg" alt="profile" className="w-12 h-12 rounded-full" />
            <div>
                {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
            </div>
        </div>
        <div>
            <Button label="Send Money" variant="secondary" onClick={() => console.log("uff")} />
        </div>
    </div>
}