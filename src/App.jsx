import { createBrowserRouter } from 'react-router-dom'
import Cart from './pages/cart'
import Products from './pages/products'
import AuthPage from './pages/authPage'


const App = createBrowserRouter([
  {
    path: '/',
    element: <Products/>
  },
  {
    path: '/cart',
    element: <Cart/>    
  },
  {
    path: '/auth',
    element: <AuthPage/>    
  }
])

export default App