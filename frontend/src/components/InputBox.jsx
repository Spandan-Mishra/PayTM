
export function InputBox({ label, placeholder, type }) {
    return <div className="flex flex-col mb-4 w-72 text-left">
        <div className="text-md text-black mb-2">
            {label}
        </div>
        <input className="rounded-md border border-slate-300 px-2 hover:shadow-md hover:shadow-blue-800 duration-100" placeholder={placeholder} type={type} />
    </div>
}