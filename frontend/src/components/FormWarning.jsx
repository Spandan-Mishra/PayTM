import { Link } from "react-router-dom";

export function FormWarning({ label, text, to }) {
    return <div className="text-sm flex justify-center items-center w-72 mt-3">
        <div>{label}</div>
        <Link className="cursor-pointer underline font-bold pl-1" to={to}>{text}</Link>
    </div>
}