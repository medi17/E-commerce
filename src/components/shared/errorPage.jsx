const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-3">
        <h2 className="text-2xl font-semibold text-red-500">
            Something went wrong
        </h2>

        <p className="text-gray-600">{message}</p>

        {onRetry && (
            <button
            onClick={onRetry}
            className="mt-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
            Retry
            </button>
        )}
        </div>
    )
}

export default ErrorMessage