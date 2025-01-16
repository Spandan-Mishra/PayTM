
const sizes = {
    "sm": "text-sm",
    "md": "text-ld",
    "lg": "text-2xl",
}

export function Error({ label, size }) {
    return <div className="flex justify-center items-center w-72 mb-3">
        <div className={"text-red-500 " + sizes[size]}>
            {label}
        </div>
    </div>
}