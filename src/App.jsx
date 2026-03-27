import { createBrowserRouter } from 'react-router-dom'
import Cart from './pages/cart'
import Products from './pages/products'
import AuthPage from './pages/authPage'
import Admin from './pages/admin'
import CreateProduct from './pages/createProduct'
import ProductsDashboard from './components/dashboard/ProductsDashboard'


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
  },
  {
    path: '/admin',
    element: <Admin/>   
  }, 
  {
    path: '/createproduct',
    element: <CreateProduct/>    
  },  
  {
    path: '/dashboard',
    element: <ProductsDashboard />
  }
])

export default App