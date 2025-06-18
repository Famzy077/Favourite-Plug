'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from 'lucide-react';

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
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setOldPrice('');
        setCategory('');
        setQuantity(1);
        setSelectedFiles([]);
        setPreviewUrls([]);
    };
    
    if (isOpen && isEditMode && productToEdit) {
      setProductName(productToEdit.name || '');
      setDescription(productToEdit.description || '');
      setPrice(productToEdit.price || '');
      setOldPrice(productToEdit.oldPrice || '');
      setCategory(productToEdit.category || '');
      setQuantity(productToEdit.quantity || 1);
      
      if (productToEdit.images && productToEdit.images.length > 0) {
        setPreviewUrls(productToEdit.images.map(img => img.url));
      } else {
        setPreviewUrls([]);
      }
      setSelectedFiles([]);
    } else {
      resetForm();
    }
  }, [isOpen, isEditMode, productToEdit]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      
      const fileUrls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(fileUrls);
    }
  };

  // --- NEW: Function to remove a selected image ---
  const handleRemoveImage = (indexToRemove) => {
    // This creates a new array excluding the file at the specified index
    const newSelectedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newSelectedFiles);

    // This creates a new array of preview URLs to match the new file list
    const newPreviewUrls = newSelectedFiles.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
  };

  const productMutation = useMutation({
    mutationFn: async ({ formData, productId }) => {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication failed");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      return productId
        ? axios.put(`${API_URL}/api/products/${productId}`, formData, config)
        : axios.post(`${API_URL}/api/products`, formData, config);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        alert(`Product ${isEditMode ? 'updated' : 'saved'} successfully!`);
        if(onClose) onClose();
    },
    onError: (error) => {
        alert(`Error: ${error.response?.data?.message || 'An error occurred.'}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isEditMode && selectedFiles.length === 0) {
      alert("Please select at least one image for the new product.");
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    if (oldPrice) formData.append('oldPrice', oldPrice);
    if (quantity) formData.append('quantity', quantity);

    if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
            formData.append('images', file);
        });
    }

    productMutation.mutate({ formData, productId: isEditMode ? productToEdit.id : undefined });
  };
  
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
                <Label htmlFor="pictures" className="text-right">Images</Label>
                <Input 
                  id="pictures" 
                  type="file" 
                  multiple
                  onChange={handleFileChange} 
                  className="col-span-3" 
                  accept="image/*"
                />
              </div>
              
              {/* --- UPDATED: Image preview section --- */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-4 gap-4 items-start">
                    <Label className="text-right pt-2">Previews</Label>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      {previewUrls.map((url, index) => (
                          <div key={index} className="relative">
                              <img src={url} alt={`Preview ${index + 1}`} className="h-24 w-24 object-cover rounded-md border" />
                              {/* --- NEW: The remove button for each image --- */}
                              <button
                                  type="button" // Important to prevent form submission
                                  onClick={() => handleRemoveImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 hover:bg-red-700 transition-colors"
                                  title="Remove image"
                              >
                                  <XIcon className="h-4 w-4" />
                              </button>
                          </div>
                      ))}
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