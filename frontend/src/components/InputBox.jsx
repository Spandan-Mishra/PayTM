
const headerSize = {
    "sm": "text-md",
    "md": "text-xl",
    "lg": "text-2xl",
}

const inputSize = {
    "sm": "px-2 py-1",
    "md": "px-3 py-2",
    "lg": "px-4 py-3",
}

export function InputBox({ label, name, placeholder, type, onChange, size }) {
    return <div className="flex flex-col mb-4 w-full text-left">
        <div className={headerSize[size]+" text-black font-bold mb-2 pl-2"}>
            {label}
        </div>
        <input name={name} onChange={onChange} className={inputSize[size]+" rounded-md border border-slate-300 focus:shadow-md focus:shadow-blue-800 focus:outline-none duration-200"} placeholder={placeholder} type={type} />
    </div>
}