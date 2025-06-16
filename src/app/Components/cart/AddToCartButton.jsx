'use client';

import { useCart } from "@/app/hooks/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const AddToCartButton = ({ productId, quantity = 1 }) => {
    const { addToCart, isLoading } = useCart();

    const handleAddToCart = () => {
        addToCart({ productId, quantity });
        // Optionally, show a toast notification here
        alert('Product added to cart!');
    };

    return (
        <Button onClick={handleAddToCart} disabled={isLoading} size="sm" className="w-full rounded-[5px] my-2 max-sm:text-[12px] cursor-pointer">
            <ShoppingCart className="mr-2 h-4 w-4 max-sm:h-2 max-sm:w-2" />
            Add to Cart
        </Button>
    );
};