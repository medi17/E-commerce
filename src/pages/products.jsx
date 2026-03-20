import { useState } from 'react'
import { products } from '../data'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import Header from '../components/shared/header'


export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const addToCart = useCartStore(state => state.addToCart)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  const categories = ['All', ...new Set(products.map(p => p.category))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)
  
  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart')
      return
    }
    addToCart(product)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
        <Header/>
      
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap
                ${selectedCategory === category 
                  ? 'bg-Mypurple text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-Mypurple">
                    ${product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-Mypurple text-white px-4 py-2 hover:bg-Mypurple rounded-3xl"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}