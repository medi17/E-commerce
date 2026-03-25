import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart, getTotal, reduceCart, removeFromCart } from '../slices/cartSlice'

export default function Cart() {
  const navigate = useNavigate()
  
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const total = useSelector(getTotal)
  
  const handleCheckout = () => {
    alert('Order placed successfully!')
    dispatch(clearCart())
    navigate('/products')
  }
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link 
            to="/" 
            className="bg-Mypurple text-white px-6 py-3 rounded-lg hover:bg-Mypurple"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => dispatch(reduceCart(item))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 border-x">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => dispatch(removeFromCart(item))}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 font-bold text-lg">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full bg-Mypurple text-white py-3 rounded-lg 
                         hover:opacity-80 font-semibold"
              >
                Proceed to Checkout
              </button>
              
              <Link 
                to="/products"
                className="block text-center mt-4 text-Mypurple hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}