'use client';
import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = "https://favorite-server-0.onrender.com";

const WishlistContext = createContext();

const fetchWishlist = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return []; // If no token, return an empty array
    const res = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.data;
};

export const WishlistProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // Fetch the wishlist using useQuery
    const { data: wishlist = [], isLoading, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: fetchWishlist
    });

    // Mutation for adding a product
    const addToWishlistMutation = useMutation({
        mutationFn: (productId) => {
            const token = localStorage.getItem('authToken');
            return axios.post(`${API_URL}/api/wishlist`, { productId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            // When successful, refetch the wishlist data to update the UI
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    });

    // Mutation for removing a product
    const removeFromWishlistMutation = useMutation({
        mutationFn: (productId) => {
            const token = localStorage.getItem('authToken');
            return axios.delete(`${API_URL}/api/wishlist/${productId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        }
    });

    // Helper function to check if a product is in the wishlist
    const isWishlisted = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const value = {
        wishlist,
        isLoading,
        error,
        addToWishlist: addToWishlistMutation.mutate,
        removeFromWishlist: removeFromWishlistMutation.mutate,
        isWishlisted
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);