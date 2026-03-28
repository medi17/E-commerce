const API_URL = 'https://fakestoreapi.com/products'

export const productService = {

  getProducts: async ({ page = 1, limit = 5 }) => {
    const response = await fetch(
      `${API_URL}?_page=${page}&_limit=${limit}`
    )
    if (!response.ok) throw new Error('Failed to fetch products')
    return response.json()
  },

  createProduct: async (newProduct) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
    if (!response.ok) throw new Error('Failed to create product')
    return response.json()
  },


  updateProduct: async ({ id, ...updates }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update product')
    return response.json()
  },

  deleteProduct: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete product')
    return { id }
  },
}