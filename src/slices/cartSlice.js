import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload
            const existingItem = state.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.push({...product, quantity: 1})
            }
        },
        
        reduceCart: (state, action) => {
            const product = action.payload
            const existingItem = state.find(item => item.id === product.id)

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
            } else {
               return state.filter(item => item.id !== product.id)
            }
        }, 
        
        removeFromCart: (state, action) => {
            const product = action.payload
            return state.filter(item => item.id !== product.id)
        }, 
        
        clearCart: (state) => {
            return [];
        }       
    }
})

export const {addToCart, reduceCart, removeFromCart, clearCart} = cartSlice.actions

export const getItemCount = (state) => state.cart.length
export const getTotal = (state) => {
    return state.cart.reduce((total, item) => {
        if (!item) return total;
        return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
}

export default cartSlice.reducer