'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthAction } from './useAuthAction'; // Assuming this path is correct
import toast from 'react-hot-toast';

const API_URL = "https://favorite-server-0.onrender.com";

const CartContext = createContext();

const fetchCart = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return { items: [], total: 0 };
    const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
};

export const CartProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart,
        // Keep data fresh but don't refetch on every window focus,
        // as optimistic updates handle the UI.
        refetchOnWindowFocus: false, 
    });

    const addItemMutation = useMutation({
        mutationFn: ({ productId, quantity }) => {
            const token = localStorage.getItem('authToken');
            return axios.post(`${API_URL}/api/cart/items`, { productId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    // --- Mutation for updating quantity with Optimistic Update ---
    const updateItemMutation = useMutation({
        mutationFn: ({ productId, quantity }) => {
            const token = localStorage.getItem('authToken');
            return axios.put(`${API_URL}/api/cart/items/${productId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        // This function runs BEFORE the mutation
        onMutate: async (newItemData) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });
            const previousCart = queryClient.getQueryData(['cart']);

            //  Optimistically update to the new value
            queryClient.setQueryData(['cart'], oldCart => {
                const newItems = oldCart.items.map(item => 
                    item.productId === newItemData.productId 
                        ? { ...item, quantity: newItemData.quantity } 
                        : item
                );
                return { ...oldCart, items: newItems };
            });

            //Return a context object with the snapshotted value
            return { previousCart };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success("Item quantity updated successfully!");
        },
        // If the mutation fails, use the context returned from onMutate to roll back
        onError: (err, newItemData, context) => {
            queryClient.setQueryData(['cart'], context.previousCart);
            toast.error("Could not update item. Please try again.");
        },
        // Always refetch after the mutation is settled (either success or error)
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        },
    });

    // --- Mutation for removing an item with Optimistic Update ---
    const removeItemMutation = useMutation({
        mutationFn: (productId) => {
            const token = localStorage.getItem('authToken');
            return axios.delete(`${API_URL}/api/cart/items/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: ['cart'] });
            const previousCart = queryClient.getQueryData(['cart']);
            
            queryClient.setQueryData(['cart'], oldCart => ({
                ...oldCart,
                items: oldCart.items.filter(item => item.productId !== productId)
            }));

            return { previousCart };
        },
        onError: (err, productId, context) => {
            queryClient.setQueryData(['cart'], context.previousCart);
            toast.error("Could not remove item. Please try again.");
        },
        // onSuccess: () => {
        //     // THIS LINE WAS REMOVED
        // },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    const { withAuth } = useAuthAction();
    
    const value = {
        cart: cart || { items: [] },
        isLoading,
        // The addToCart can remain as it is, as immediate feedback is given by the toast.
        addToCart: (data) => withAuth(() => {
            addItemMutation.mutate(data);
        }),
        updateQuantity: (data) => withAuth(() => updateItemMutation.mutate(data)),
        removeFromCart: (productId) => withAuth(() => removeItemMutation.mutate(productId)),
        itemCount: cart?.items?.length || 0,
        cartTotal: cart?.total || 0
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
