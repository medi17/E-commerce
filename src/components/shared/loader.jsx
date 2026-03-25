const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  )
}

export default Loader