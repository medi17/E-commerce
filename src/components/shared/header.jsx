
import { ShoppingCart } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import useCartStore from '../../store/cartStore'
import useAuthStore from '../../store/authStore'
import { CircleUser } from 'lucide-react'

const Header = () => {

    const itemCount = useCartStore(state => state.getItemCount())
    const isAuthenticated = useAuthStore(state => state.isAuthenticated)


    return (
        <div className="flex justify-between items-center sticky top-0 py-3 px-7 w-full bg-gray-200 dark:bg-gray-800 text-white shadow-sm z-50">
            <NavLink to="/">
                <h1 className="text-[24px] font-semibold text-Mypurple">EcoShop</h1>
            </NavLink>
            <div className="flex justify-between items-center gap-2">
                <NavLink to="/cart" className={`relative`}>
                    <ShoppingCart strokeWidth={2.5} className='text-Mypurple font-bold'/>
                    {itemCount > 0 && (
                        <span className="absolute -top-3 -right-2 bg-violet-700 text-white 
                                    text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {itemCount}
                        </span>
                    )}                
                </NavLink>
                <NavLink to="/auth">
                    <button className="cursor-pointer header text-white text-[20px] font-medium py-1 px-3 border- rounded-3xl hover:opacity-90">
                        {isAuthenticated ? (<CircleUser strokeWidth={2.5} />) : 'Login'}
                    </button>
                </NavLink>                          
            </div>
        </div>
    )
}

export default Header