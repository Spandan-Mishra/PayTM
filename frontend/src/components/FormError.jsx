
export function FormError({ label }) {
    return <div className="flex justify-center items-center w-72 mb-3">
        <div className="text-red-500 text-sm">
            {label}
        </div>
    </div>
}