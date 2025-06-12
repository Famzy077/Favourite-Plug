'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "https://favorite-server-0.onrender.com";

export const ProductModal = ({ productToEdit = null, isOpen, onClose }) => {
  const isEditMode = !!productToEdit;
  const queryClient = useQueryClient();

  // Form state
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Reset form
  const resetForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setOldPrice('');
    setCategory('');
    setQuantity(1);
    setSelectedFile(null);
    setPreviewUrl('');
  };

  // Fill form if editing
  useEffect(() => {
    if (isOpen && isEditMode && productToEdit) {
      setProductName(productToEdit.name || '');
      setDescription(productToEdit.description || '');
      setPrice(productToEdit.price || '');
      setOldPrice(productToEdit.oldPrice || '');
      setCategory(productToEdit.category || '');
      setQuantity(productToEdit.quantity || 1);
      setPreviewUrl(productToEdit.image ? `${API_URL}/${productToEdit.image}` : '');
    } else if (isOpen && !isEditMode) {
      resetForm();
    }
  }, [isOpen, isEditMode, productToEdit]);

  // Mutation
  const productMutation = useMutation({
    mutationFn: async ({ formData, productId }) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("User is not authenticated.");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      return productId
        ? axios.put(`${API_URL}/api/products/${productId}`, formData, config)
        : axios.post(`${API_URL}/api/products`, formData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      alert(`Product ${isEditMode ? 'updated' : 'created'} successfully!`);
      resetForm();
      if(onClose) onClose();
    },
    onError: (error) => {
      alert(`Error: ${error.response?.data?.message || 'Failed to save product.'}`);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditMode && !selectedFile) {
      alert("Please select an image for the new product.");
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (oldPrice) formData.append('oldPrice', oldPrice);
    if (quantity) formData.append('quantity', quantity);
    if (selectedFile) formData.append('image', selectedFile);

    productMutation.mutate({
      formData,
      productId: isEditMode ? productToEdit.id : undefined,
    });
  };

  // We constrain the height and tell it to handle vertical overflow with a scrollbar.
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onClose}
    >
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
        <div className="max-h-[80vh] overflow-y-auto scrollbar-hide p-6 max-sm:px-0">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? 'Update the product details below.'
                : 'Fill in the product information.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="pr-2">
            <div className="grid gap-4 py-4 max-sm:px-0">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right max-sm:text-[0.8rem]">Name</Label>
                <Input id="name" value={productName} onChange={(e) => setProductName(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right max-sm:text-[0.8rem]">Category</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right max-sm:text-[0.8rem]">Description</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right max-sm:text-[0.8rem]">Price (₦)</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPrice" className="text-right max-sm:text-[0.8rem]">Old Price (₦)</Label>
                <Input id="oldPrice" type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right max-sm:text-[0.8rem]">Quantity</Label>
                <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="picture" className="text-right max-sm:text-[0.8rem]">Image</Label>
                <Input id="picture" type="file" onChange={handleFileChange} className="col-span-3" accept="image/*" required={!isEditMode} />
              </div>
              {previewUrl && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right max-sm:text-[0.8rem]">Preview</Label>
                  <div className="col-span-3">
                    <img src={previewUrl} alt="Preview" className="h-24 w-24 object-cover rounded-md" />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={productMutation.isLoading}>
                {productMutation.isLoading
                  ? 'Saving...'
                  : isEditMode
                    ? 'Update Product'
                    : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};