
const variantClasses = {
    "primary": "bg-blue-700 text-white rounded-lg px-4 py-2 w-full hover:bg-blue-800 hover:shadow-md hover:shadow-blue-500 hover:scale-105 duration-200",
    "secondary": "bg-black text-white rounded-lg px-4 py-2 w-full hover:shadow-md hover:bg-blue-600 hover:scale-105 duration-300"
}

export function Button({ label, onClick, variant }) {
    return <button onClick={onClick} className={variantClasses[variant]}>
        {label}
    </button>
}