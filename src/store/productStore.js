import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";


const useProductsStore = create(
    persist(
        (set, get) => ({
            products: [],
            loading: false,
            error: null,

            fetchProducts: async () => {
                try{
                    set({ loading: true, error: null}) 
                  
                    const res = await fetch('https://fakestoreapi.com/products/')
                    const data = await res.json()

                    set({ products: data, loading: false})
                } catch(err) {
                    set({error: "Failed to fetch products", loading: false })
                }
            },

            createProduct: async (newUser) => {
                try{
                    set({loading: true, error: null})

                    const res = await fetch(`https://fakestoreapi.com/products/`,{
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newUser),
                    })

                    const data = await res.json()

                    set({ products: [data, ...get().products], loading: false })

                    toast.success("Product created successfully 🎉")
                } catch(err) {
                    set({ error: "Failed to create user", loading: false })

                    toast.error("Something went wrong!")
                }
            }            
        }),
        {
            name: 'products-storage',
        }
    )
)

export default useProductsStore