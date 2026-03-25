import { Users } from "lucide-react";
import { House } from "lucide-react";
import { SquarePlus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({isOpen}) {
    return (
        <aside className={`h-screen sticky top-0 left-0 bg-gray-200 dark:bg-gray-800
                        text-gray-700 dark:text-gray-100 flex flex-col py-4 px-7 
                        transition-transform duration-300 ease-in-out ${isOpen? 'translate-x-0' : '-translate-x-full'}`} 
        >

            <h1 className="font-bold mb-8"><span className="text-Myblue text-2xl pr-1">EcoShop</span>Dashboard</h1>
            <nav className="flex flex-col gap-3">

                <NavLink
                    to="/admin"
                    className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                >
                    <Users size={16}/> Users
                </NavLink>
                <NavLink
                    to="/createproduct"
                    className="flex items-center gap-1 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                >
                    <SquarePlus size={16}/>  Create Products
                </NavLink>        
            </nav>

        </aside>
    );
}