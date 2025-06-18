'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/hooks/CartContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast'; // NEW: Import toast from react-hot-toast

const API_URL = "https://favorite-server-0.onrender.com";

const CheckoutPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { cart, cartTotal, itemCount, isLoading } = useCart() || { cart: { items: [] }, cartTotal: 0, itemCount: 0 };
    
    // State for the delivery form
    const [fullName, setFullName] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Redirect to home if cart is empty and the page is done loading
    useEffect(() => {
        if (!isLoading && itemCount === 0 && !isOrderPlaced) {
            router.replace('/home');
        }
    }, [isLoading, itemCount, isOrderPlaced, router]);

    const placeOrderMutation = useMutation({
        mutationFn: (orderDetails) => {
            const token = localStorage.getItem('authToken');
            return axios.post(`${API_URL}/api/orders`, orderDetails, {
                headers: { Authorization: `Bearer ${token}` }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            setIsOrderPlaced(true);
            // Show a success toast when the order is placed
            toast.success("Your order has been placed successfully!");
        },
        onError: (error) => {
            // FIX: Use toast for error messages instead of alert
            toast.error(error.response?.data?.message || 'Error placing order. Please try again.');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!shippingAddress || !contactPhone || !fullName) {
            // FIX: Use toast for validation errors
            toast.error('Please fill in all delivery details.');
            return;
        }
        placeOrderMutation.mutate({ shippingAddress, contactPhone, fullName });
    };

    if (isLoading) {
        return (
          <div className='flex items-center justify-center min-h-screen'>
            <FaSpinner size={40} className="animate-spin text-blue-500" />
          </div>
        );
    }
    
    // Success screen after placing an order
    if (isOrderPlaced) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
                <FaCheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Thank You for Your Order!</h1>
                <p className="text-gray-600 mb-6">You'll receive a confirmation email shortly. Our team will begin processing your order.</p>
                <Link href="/home">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Delivery Information Form */}
                <div className="w-full lg:w-3/5 bg-white p-6 rounded-lg shadow-md border">
                    <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                                id="fullName" 
                                value={fullName} 
                                onChange={(e) => setFullName(e.target.value)}
                                required 
                            />
                        </div>
                        <div>
                            <Label htmlFor="contactPhone">Contact Phone Number</Label>
                            <Input 
                                id="contactPhone" 
                                type="tel"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                required 
                            />
                        </div>
                        <div>
                            <Label htmlFor="shippingAddress">Delivery Address</Label>
                            <Textarea 
                                id="shippingAddress" 
                                rows={4}
                                value={shippingAddress}
                                onChange={(e) => setShippingAddress(e.target.value)}
                                required
                                placeholder="Please provide your full street address, city, and state."
                            />
                        </div>
                         <Button 
                            type="submit" 
                            className="w-full text-lg py-6"
                            disabled={placeOrderMutation.isLoading}
                        >
                            {placeOrderMutation.isLoading ? <FaSpinner className="animate-spin" /> : 'Place Order'}
                        </Button>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-2/5">
                    <div className="bg-white p-6 rounded-lg shadow-md border sticky top-24">
                        <h2 className="text-xl font-bold border-b pb-4 mb-4">Your Order ({itemCount} items)</h2>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                            {cart?.items?.map(item => {
                                // FIX: Get the display image from the product's `images` array
                                const displayImage = item.product.images?.[0]?.url || '/default-placeholder.png';
                                
                                return (
                                    <div key={item.id} className="flex items-center gap-4 text-sm">
                                        <Image src={displayImage} alt={item.product.name} width={64} height={64} className="rounded-md object-cover h-16 w-16" />
                                        <div className="flex-grow">
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">₦{(item.product.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-t mt-4 pt-4 space-y-2">
                             <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>₦{cartTotal.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>₦{cartTotal.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckoutPage;
