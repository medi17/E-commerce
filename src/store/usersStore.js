import { create } from "zustand";
import { persist } from "zustand/middleware";


const useUsersStore = create(
    persist(
        (set, get) => ({
            users: [],
            loading: false,
            error: null,
            page: 1,
            limit: 3,
            hasMore: true,

            fetchUsers: async () => {

                try{
                    const { page, limit } = get()

                    set({ loading: true, error: null}) 
                  
                    const res = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`)
                    const data = await res.json()

                    set({ users: data, loading: false, page, hasMore: data.length === limit})
                } catch(err) {
                    set({error: "Failed to fetch users", loading: false })
                }
            },

            setPage: (newPage) => {
                set({ page: newPage });
            }
        }),
        {
            name: 'users-storage',
        }
    )
)

export default useUsersStore