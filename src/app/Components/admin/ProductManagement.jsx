// 'use client';

// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useState } from 'react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { ProductModal } from '../../Components/modals/ProductModal';

// const API_URL = "https://favorite-server-0.onrender.com";

// const fetchProducts = async () => {
//   const res = await axios.get(`${API_URL}/api/products`);
//   return res.data.data;
// };

// export const ProductManagement = () => {
//   // --- THE FIX: Move the useQueryClient() call INSIDE the component ---
//   const queryClient = useQueryClient();

//   // --- STATE MANAGEMENT ---
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);

//   const { data: products, isLoading, error } = useQuery({
//     queryKey: ['products'],
//     queryFn: fetchProducts,
//   });

//   const deleteMutation = useMutation({
//     mutationFn: async (productId) => {
//       const token = localStorage.getItem('authToken');
//       if (!token) throw new Error("Authentication failed");
//       return await axios.delete(`${API_URL}/api/products/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['products'] });
//       alert('Product deleted successfully!');
//     },
//     onError: (error) => {
//       alert(`Error deleting product: ${error.response?.data?.message || error.message}`);
//     }
//   });

//   const handleDelete = (productId) => {
//     if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
//       deleteMutation.mutate(productId);
//     }
//   };

//   // --- EVENT HANDLERS ---
//   const handleOpenAddModal = () => {
//     setEditingProduct(null);
//     setIsModalOpen(true);
//   };

//   const handleOpenEditModal = (product) => {
//     setEditingProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingProduct(null);
//   };

//   return (
//     <div>
//       <div className="flex justify-end mb-4">
//         <Button variant="outline" onClick={handleOpenAddModal}>
//           Add New Product
//         </Button>
//       </div>

//       <div className="border rounded-lg">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Stock</TableHead>
//               <TableHead>Categories</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading && <TableRow><TableCell colSpan="5">Loading...</TableCell></TableRow>}
//             {error && <TableRow><TableCell colSpan="5" className="text-red-500">Failed to load products</TableCell></TableRow>}
//             {products?.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>
//                   <img src={`${API_URL}/${product.image}`} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
//                 </TableCell>
//                 <TableCell className="font-medium">{product.name}</TableCell>
//                 <TableCell>₦{product.price ? product.price.toFixed(2) : '0.00'}</TableCell>
//                 <TableCell>{product.quantity || 0}</TableCell>
//                 <TableCell>{product.category || 0}</TableCell>
//                 <TableCell>
//                   <div className="flex gap-2">
//                     <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(product)}>
//                       Edit
//                     </Button>
//                     <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
//                       Delete
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       <ProductModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         productToEdit={editingProduct}
//       />
//     </div>
//   );
// };

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductModal } from '../../Components/modals/ProductModal';
import { FaSpinner } from 'react-icons/fa'; // Import a spinner for loading state

const API_URL = "https://favorite-server-0.onrender.com";

const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products`);
  return res.data.data;
};

export const ProductManagement = () => {
  const queryClient = useQueryClient();

  // --- STATE MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // --- NEW: Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Show 10 products per page

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  // --- DELETE MUTATION (No changes needed) ---
  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication failed");
      return await axios.delete(`${API_URL}/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert('Product deleted successfully!');
    },
    onError: (error) => {
      alert(`Error deleting product: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(productId);
    }
  };

  // --- EVENT HANDLERS (No changes needed) ---
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // --- NEW: Pagination Logic ---
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products ? products.slice(startIndex, endIndex) : [];

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-[60vh]'>
        <FaSpinner className="animate-spin text-blue-500" size={32} /> 
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Failed to load products.</div>;
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleOpenAddModal}>
          Add New Product
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead> {/* FIX: Changed from Categories */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* We now map over 'currentProducts' instead of 'products' */}
            {currentProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={`${API_URL}/${product.image}`} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>₦{product.price ? product.price.toFixed(2) : '0.00'}</TableCell>
                <TableCell>{product.quantity || 0}</TableCell>
                <TableCell>{product.category}</TableCell> {/* FIX: Changed from category || 0 */}
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleOpenEditModal(product)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- NEW: Pagination Controls --- */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productToEdit={editingProduct}
      />
    </div>
  );
};
