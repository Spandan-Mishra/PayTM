import { useEffect, useState } from "react";
import { InputBox } from "./InputBox";
import { User } from "./User";
import axios from "axios";

export function Users() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response) => {
            console.log(response);
            setUsers(response.data.users);
        })
        console.log(users);
    }, [filter]);

    return <>
        <div className="w-screen flex justify-start items-center py-6 px-4">
            <InputBox label="Users" name="filter" placeholder="Search users.." type="text" onChange={(e) => setFilter(e.target.value)} size="lg" />
        </div>
        <div className="flex flex-col items-center px-8">
            {users && users.map(user => <User user={user} key={user._id}/>)}
        </div>
    </>
}