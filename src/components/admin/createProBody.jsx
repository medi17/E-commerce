import { useState } from "react"
import useProductsStore from "../../store/productStore"

const CreateProductBody = () => {
    const { createProduct, loading } = useProductsStore()

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct({ title, price })
        setTitle("")
        setPrice("")
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-10">
        
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Create Product
            </h2>

            
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Product Title
                    </label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Nike Shoes"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Price
                    </label>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 99.99"
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-Mypurple text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating..." : "Add Product"}
                </button>
            </form>
        </div>
    )
}

export default CreateProductBody