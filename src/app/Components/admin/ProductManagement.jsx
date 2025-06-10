'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductModal } from '../../Components/modals/ProductModal';

// Fetch all products (this is a public route, no token needed)
const url = "https://favorite-server-0.onrender.com";

const fetchProducts = async () => {
  const res = await axios.get(`${url}/api/products`);
  return res.data.data;
};

export const ProductManagement = () => {
  const queryClient = useQueryClient();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: (productId) => {
        const token = localStorage.getItem('authToken');
        return axios.delete(`${url}/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    },
    onSuccess: () => {
        // When a product is deleted, refetch the product list to update the table
        queryClient.invalidateQueries({ queryKey: ['products'] });
        alert('Product deleted successfully!');
    },
    onError: (error) => {
        alert(`Error deleting product: ${error.response.data.message}`);
    }
  });

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        deleteMutation.mutate(productId);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <ProductModal /> {/* Your "Add New Product" button and modal */}
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan="5">Loading...</TableCell></TableRow>}
            {error && <TableRow><TableCell colSpan="5" className="text-red-500">Failed to load products</TableCell></TableRow>}
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                    {/* <img src={`http://localhost:5000/${product.image}`} alt={product.name} className="h-12 w-12 object-cover rounded-md" /> */}
                    <img src={`${url}/${product.image}`} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product.id)}>Edit</Button> {/* TODO: Hook this up to the modal */}
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};