'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthAction } from './useAuthAction'; // We'll use this to protect actions
import { toast } from 'sonner';

const API_URL = "https://favorite-server-0.onrender.com";

const CartContext = createContext();

const fetchCart = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return { items: [], total: 0 }; // Return empty cart if not logged in
    const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
};

export const CartProvider = ({ children }) => {
    const queryClient = useQueryClient();

    const { data: cart, isLoading } = useQuery({
        queryKey: ['cart'],
        queryFn: fetchCart
    });

    // --- MUTATIONS to interact with the backend ---

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

    const updateItemMutation = useMutation({
        mutationFn: ({ productId, quantity }) => {
            const token = localStorage.getItem('authToken');
            return axios.put(`${API_URL}/api/cart/items/${productId}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    const removeItemMutation = useMutation({
        mutationFn: (productId) => {
            const token = localStorage.getItem('authToken');
            return axios.delete(`${API_URL}/api/cart/items/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    const { withAuth } = useAuthAction();
    
    const value = {
        cart: cart || { items: [] }, // Provide a default empty cart
        isLoading,
        // MODIFIED: All mutation calls now use .mutateAsync to return a promise
        addToCart: (data) => withAuth(() => addItemMutation.mutateAsync(data)),
        updateQuantity: (data) => withAuth(() => updateItemMutation.mutateAsync(data)),
        removeFromCart: (productId) => withAuth(() => removeItemMutation.mutateAsync(productId)),
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