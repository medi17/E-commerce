import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../../services/productServices'

export default function UpdateProduct({editingProduct, setEditingProduct}) {
    const [page, setPage] = useState(1)
    const queryClient = useQueryClient()

    const updateMutation = useMutation({
        mutationFn: productService.updateProduct,
        onMutate: async (updatedProduct) => {
        await queryClient.cancelQueries({ queryKey: ['products'] })
        
        const previousProducts = queryClient.getQueryData(['products', page])
        
        queryClient.setQueryData(['products', page], (old) =>
            old.map(product =>
            product.id === updatedProduct.id
                ? { ...product, ...updatedProduct }
                : product
            )
        )
        
        return { previousProducts }
        },

        onError: (err, updatedProduct, context) => {
            queryClient.setQueryData(['products', page], context.previousProducts)
            toast.error('Failed to update product')
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Product updated!')
            setEditingProduct(null)
        }
    })
    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        updateMutation.mutate({
        id: editingProduct.id,
        title: formData.get('title'),
        price: parseFloat(formData.get('price')),
        description: formData.get('description'),
        category: formData.get('category'),
        })
    }   

    return( 
        <>
            {editingProduct && (
                <div className="mx-auto bg-purple-100 shadow-lg rounded-2xl p-6 my-10">                      
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Update Product
                    </h2>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input
                                name="title"
                                defaultValue={editingProduct.title}
                                placeholder="Title"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                            />
                           
                            <input
                                name="price"
                                type="number"
                                defaultValue={editingProduct.price}
                                placeholder="Price"
                                required
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                            />
                            <input
                                name="category"
                                defaultValue={editingProduct.category}
                                placeholder="Category"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                            />
                            <input
                                name="description"
                                defaultValue={editingProduct.description}
                                placeholder="Description"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
                            />
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button
                                type="submit"
                                disabled={updateMutation.isPending}
                                className="px-4 py-2 bg-Mypurple text-white rounded hover:bg-purple-600"
                            >
                                {updateMutation.isPending ? 'Updating...' : 'Update'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>)}
        </>  
    )
}
