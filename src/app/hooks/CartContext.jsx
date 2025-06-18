'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthAction } from './useAuthAction';
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
        queryFn: fetchCart
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
            // The toast for adding is handled in the AddToCartButton component
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
            // --- NEW: Toast for updating quantity ---
            toast.success("Cart updated successfully.");
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
            // --- NEW: Toast for removing an item ---
            toast.error("Item removed from cart.");
        }
    });

    const { withAuth } = useAuthAction();
    
    const value = {
        cart: cart || { items: [] },
        isLoading,
        addToCart: (data) => withAuth(() => addItemMutation.mutate(data)),
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