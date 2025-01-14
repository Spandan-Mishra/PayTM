
export function Button({ label, onClick }) {
    return <button onClick={onClick} className="bg-blue-800 text-white rounded-md px-4 py-2 w-72 hover:bg-blue-900 hover:shadow-lg hover:shadow-blue-500 duration-100">
        {label}
    </button>
}