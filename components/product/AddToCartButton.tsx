'use client'

import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cart-store'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface AddToCartButtonProps {
    productId: string
    disabled?: boolean
}

export default function AddToCartButton({ productId, disabled }: AddToCartButtonProps) {
    const { addItem, toggleCart } = useCartStore()
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        try {
            await addItem(productId, 1)
            toggleCart() // Open cart sidebar
        } catch (error) {
            console.error('Error adding to cart:', error)
        } finally {
            setIsAdding(false)
        }
    }

    return (
        <Button
            onClick={handleAddToCart}
            disabled={disabled || isAdding}
            isLoading={isAdding}
            size="lg"
            className="w-full"
        >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {disabled ? 'Out of Stock' : 'Add to Cart'}
        </Button>
    )
}
