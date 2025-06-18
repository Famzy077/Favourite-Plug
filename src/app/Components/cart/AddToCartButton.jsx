'use client';
import { useCart } from "@/app/hooks/CartContext";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";


export const AddToCartButton = ({ productId, quantity = 1 }) => {
    const { addToCart } = useCart() || {};

    const handleAddToCart = () => {
        if (!productId) return;
        if (addToCart) {
            toast.success("Product added to cart!", {
                description: "You can view it in your cart now.",
                action: {
                    label: "View Cart",
                    onClick: () => window.location.href = '/cart',
                },
            });
            addToCart({ productId, quantity });
        }
    };

    return (
        <Button onClick={handleAddToCart} size="lg" className="w-full rounded-[5px] my-2 max-sm:text-[12px] cursor-pointer text-lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
        </Button>
    );
};