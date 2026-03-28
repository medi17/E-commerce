import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../../services/productServices'

const CreateProductBody = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: productService.createProduct,
        onMutate: async (newProduct) => {

            await queryClient.cancelQueries({ queryKey: ['products'] })
        
            const previousProducts = queryClient.getQueryData(['products', page])
            
            queryClient.setQueryData(['products', page], (old) => [
                { ...newProduct, id: Date.now() },
                ...old || []
            ])
        
            return { previousProducts }
        },

        onError: (err, newProduct, context) => {
            queryClient.setQueryData(['products', page], context.previousProducts)
            toast.error('Failed to create product')
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Product created!')
        }
    })  
    
    const handleCreate = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newProduct = {
            title: formData.get('title'),
            price: parseFloat(formData.get('price')),
            description: formData.get('description'),
            category: formData.get('category'),
        }
        createMutation.mutate(newProduct)
        e.target.reset()
    }    

    return (
        <div className="mx-auto bg-purple-100 shadow-lg rounded-2xl p-6 mt-5 mb-10">

            
            <form onSubmit={handleCreate} className="space-y-4 grid grid-cols-1 md:grid-cols-4 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Product Title
                    </label>
                    <input
                        name="title"
                        placeholder="e.g. Nike Shoes"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Price
                    </label>
                    <input
                        name="price"
                        placeholder="e.g. 99.99"
                        type="number"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Category
                    </label>
                    <input
                        name="category"
                        placeholder="e.g. men&rsquo;s cloth"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                        Description
                    </label>
                    <input
                        name="description"
                        placeholder="write description"
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                    />
                </div>                

                <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="w-full bg-Mypurple text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {createMutation.isPending ? "Creating..." : "Add Product"}
                </button>
            </form>
        </div>
    )
}

export default CreateProductBody