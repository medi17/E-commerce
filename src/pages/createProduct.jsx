

import Sidebar from "../components/shared/sideBar";
import { useState } from "react";
import { PanelsTopLeft } from "lucide-react";
import CreateProductBody from "../components/admin/createProBody";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../services/productServices'
import UpdateProduct from "../components/admin/updateProduct";
import { PenBox } from "lucide-react";
import { Trash } from "lucide-react";
import { MoveRight } from "lucide-react";
import { MoveLeftIcon } from "lucide-react";
import Loader from "../components/shared/loader"
import ErrorMessage from "../components/shared/errorPage"

export default function CreateProduct() {

    const [isOpen, setIsOpen] = useState(true)

    const handleSideBarToggle = () => {
        setIsOpen(!isOpen)
    }

    const [page, setPage] = useState(1)
    const [editingProduct, setEditingProduct] = useState(null)
    const queryClient = useQueryClient()
    const limit = 5

    const {
        data: allProducts = [],
        isLoading,
        error,
        isFetching,
        isError,
        refetch
    } = useQuery({
        queryKey: ['products', page], 
        queryFn: () => productService.getProducts({ page, limit }),
        retry: 3,
        retryDelay: 1000,
        refetchOnWindowFocus: true,
        staleTime: 5000, 
    })

    const totalProducts = allProducts.length
    const totalPages = Math.ceil(totalProducts / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const currentProducts = allProducts.slice(startIndex, endIndex)

    const deleteMutation = useMutation({
        mutationFn: productService.deleteProduct,
        onMutate: async (deletedId) => {
        await queryClient.cancelQueries({ queryKey: ['products'] })
        
        const previousProducts = queryClient.getQueryData(['products', page])
        
        queryClient.setQueryData(['products', page], (old) =>
            old.filter(product => product.id !== deletedId)
        )
        
        return { previousProducts }
        },

        onError: (err, deletedId, context) => {
            queryClient.setQueryData(['products', page], context.previousProducts)
            toast.error('Failed to delete product')
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] })
            toast.success('Product deleted!')
        }
    })

    if (isLoading) return <Loader />
    if (isError) return <ErrorMessage message={error} onRetry={() => fetchUsers(page)} />


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

                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold text-foreground">Want to create a Product?</h1>
                    <button
                        onClick={() => refetch()}
                        disabled={isFetching}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                        {isFetching ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                <CreateProductBody/>

                <UpdateProduct editingProduct={editingProduct} setEditingProduct={setEditingProduct}/>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Price</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 border">
                                <td className="p-2 text-center">{product.id}</td>
                                <td className="border p-2">{product.title}</td>
                                <td className="p-2">${product.price}</td>
                                <td className="border p-2">{product.category || 'N/A'}</td>
                                <td className="pt-3 text-center flex px-6 gap-2">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="text-blue-500 mr-2 cursor-pointer"
                                    >
                                        <PenBox/>
                                    </button>
                                    <button
                                        onClick={() => {
                                        if (confirm('Delete this product?')) {
                                            deleteMutation.mutate(product.id)
                                        }
                                        }}
                                        disabled={deleteMutation.isPending}
                                        className="text-red-500 mr-2 cursor-pointer"
                                    >
                                        <Trash/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
 
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                    >
                     <MoveLeftIcon/>
                    </button>
                        <span className="px-4 py-2">Page {page}</span>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
                        >
                        <MoveRight/>
                    </button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                    {isFetching && '🔄 Refreshing...'}
                    {!isFetching && '✅ Data up to date'}
                </div>
            </div>

        </div>
    );
}