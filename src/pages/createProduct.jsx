

import Sidebar from "../components/shared/sideBar";
import { useState } from "react";
import { PanelsTopLeft } from "lucide-react";
import CreateProductBody from "../components/admin/createProBody";


export default function CreateProduct() {

    const [isOpen, setIsOpen] = useState(false)

    const handleSideBarToggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex dark:bg-gray-700">

            <div className={`transition-all duration-300 ease-in-out
                            ${isOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
                <Sidebar isOpen={isOpen} />
            </div>
            <button className="flex justify-start bg-white dark:bg-gray-700">
                <span className="text-gray-700 dark:text-white mt-2 mx-2 rounded-sm z-100"
                    onClick={handleSideBarToggle}
                    ><PanelsTopLeft />
                </span>
            </button>

            <div className="w-full mx-auto px-5 bg-white dark:bg-gray-700 pt-10">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">Want to create a Product?</h1>
                    <p className="text-muted-foreground mt-1 dark:text-gray-200">Just enter the title and price</p>
                </div>

                <CreateProductBody/>
 
            </div>
        </div>
    );
}