import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get)=>({
      cart: [],

      // Add to Cart
      addToCart: (product) => {
        const currentItems = get().cart
        const existingItem = currentItems.find(item => item.id === product.id)

        if(existingItem){
          set({
            cart: currentItems.map(item => 
              item.id === product.id
              ? {...item, quantity: item.quantity + 1}
              : item 
            )               
          }) 
          
        } else {
          set({cart:[ ...currentItems, {...product, quantity: 1}]})
        }

      },

      reduceCart: (product) => {
        const currentItems = get().cart
        const existingItems = currentItems.find(item => item.id === product.id)

        if(existingItems && existingItems.quantity > 1){
          set({
            cart: currentItems.map(item => 
              item.id === product.id
              ? {...item, quantity: Math.max(item.quantity - 1, 1)}
              : item 
            )            
          })
        } else {
          set({cart: currentItems.filter(item => item.id !== product.id)})
        }        
      },      

      removeFromCart: (product) => {
        set({ cart: get().cart.filter(item => item.id !== product.id) })
      },


      clearCart: () => {
        set({ cart: []})
      },
      
      getItemCount: () => {
        return get().cart.length
      },

      getTotal: () => {
        return get().cart.reduce((total, item) => {
          if (!item) return total
          return total + (item.price || 0) * (item.quantity || 0)
        }, 0)
      }

    }),
    {
      name: 'cart-storage',
    }
  )
)

export default useCartStore