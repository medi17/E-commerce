import { useEffect } from "react"
import useUsersStore from "../store/usersStore"
import Loader from "../components/shared/loader"
import ErrorMessage from "../components/shared/errorPage"

export default function Users() {
    const {
        users,
        loading,
        error,
        fetchUsers,
        page,
        hasMore,
        setPage
    } = useUsersStore()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers, page])

    if (loading) return <Loader />
    if (error) return <ErrorMessage message={error} onRetry={() => fetchUsers(page)} />

    return (
        <div className="mt-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                    >
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">

                <button
                    onClick={() => {
                        if(page>1){
                            setPage(page - 1)
                        }}
                    }
                    disabled={page <= 1}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>

                <span className="text-gray-700 font-medium">
                    Page {page}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!hasMore}
                    className="px-4 py-2 bg-Mypurple text-white rounded-lg hover:bg-purple-800 disabled:opacity-50"
                >
                    Next
                </button>

            </div>
        </div>
    )
}