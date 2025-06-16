'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/app/hooks/CartContext';
import { FaSpinner } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Plus, Minus } from 'lucide-react'; // Import icons for buttons

const CartPage = () => {
  // FIX: Provide a default empty object to prevent destructuring errors
  const { cart = { items: [] }, updateQuantity, removeFromCart, isLoading, cartTotal } = useCart() || {};

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <FaSpinner size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!cart || cart.items.length === 0) {
    return (
        <div className="text-center min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/home">
                <Button>Start Shopping</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Cart Items List */}
        <div className="w-full lg:w-2/3 space-y-4">
          {cart.items.map(item => {
            if (!item || !item.product) return null; // Safety check for bad data

            const handleQuantityChange = (newQuantity) => {
              if (newQuantity < 1) return; // Don't allow quantity less than 1
              updateQuantity({ productId: item.productId, quantity: newQuantity });
            };

            return (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm border">
                <Image src={item.product.image} alt={item.product.name} width={96} height={96} className="rounded-md object-cover h-24 w-24 max-sm:h-20 max-sm:w-20" />
                <div className="flex-grow ml-4">
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-sm text-gray-500">₦{item.product.price.toLocaleString()}</p>
                   <Button variant="link" size="sm" className="text-red-500 p-0 h-auto mt-2" onClick={() => removeFromCart(item.productId)}>Remove</Button>
                </div>
                
                {/* --- NEW: Quantity Selector with +/- buttons --- */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit border">
          <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₦{cartTotal ? cartTotal.toLocaleString() : '0.00'}</p>
            </div>
            <div className="flex justify-between text-gray-500">
              <p>Shipping</p>
              <p>Calculated at checkout</p>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₦{cartTotal ? cartTotal.toLocaleString() : '0.00'}</p>
            </div>
          </div>
          <Button className="w-full mt-6 text-lg py-6">Proceed to Checkout</Button>
        </div>

      </div>
    </div>
  );
};

export default CartPage;