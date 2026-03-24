import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        if(email && password){
          set({
            user:{
              id: 12345,
              email: email,
              name: id + email
            },
            isAuthenticated: true
          })

          return true
        }

        return false
      },

      logout: () => {
        set({user: null, isAuthenticated: false})
      },

      register: (name, email, password) => {
        if(email && password){
          set({
            user:{
              id: 12345,
              email,
              name
            },
            isAuthenticated: true
          })
          return true 
        }
      }

    }),
    {
      name: 'auth-storage',
    }
  )
)

export default useAuthStore 
