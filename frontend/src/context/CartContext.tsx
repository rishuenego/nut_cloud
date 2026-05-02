import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { CartItem, Product } from '../types'
import { useAuth } from './AuthContext'
import { API_URL } from '../services/api'

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity: number, weight: string, texture: string) => void
  removeFromCart: (productId: number, weight: string, texture: string) => void
  updateQuantity: (productId: number, weight: string, texture: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  appliedCoupon: AppliedCoupon | null
  applyCoupon: (coupon: AppliedCoupon) => void
  removeCoupon: () => void
  shippingConfig: {
    freeShippingThreshold: number;
    shippingCharge: number;
  }
  refreshShippingConfig: () => Promise<void>
}

interface AppliedCoupon {
  code: string
  discountPercentage: number
  discountAmount: number
  minOrderAmount?: number
  maxDiscountAmount?: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper to get storage key based on user
const getCartStorageKey = (userId: number | null) => {
  return userId ? `cart_user_${userId}` : 'cart_guest'
}

const getCouponStorageKey = (userId: number | null) => {
  return userId ? `coupon_user_${userId}` : 'coupon_guest'
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth()
  
  const [items, setItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const [shippingConfig, setShippingConfig] = useState({
    freeShippingThreshold: 499,
    shippingCharge: 49,
  })

  // Fetch shipping settings
  const fetchShippingSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/settings`, { credentials: 'include' })
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.settings) {
          setShippingConfig({
            freeShippingThreshold: data.settings.freeShippingThreshold,
            shippingCharge: data.settings.shippingCharge,
          })
        }
      }
    } catch (error) {
      console.error('Failed to fetch shipping settings:', error)
    }
  }, [])

  // Fetch settings on mount and expose refresh function
  useEffect(() => {
    fetchShippingSettings()
  }, [fetchShippingSettings])

  // Load cart data when user changes (login/logout)
  useEffect(() => {
    if (authLoading) return

    const userId = user?.id || null
    const cartKey = getCartStorageKey(userId)
    const couponKey = getCouponStorageKey(userId)

    // Migrate from old 'cart' and 'appliedCoupon' keys if they exist
    const oldCart = localStorage.getItem('cart')
    const oldCoupon = localStorage.getItem('appliedCoupon')
    if (oldCart || oldCoupon) {
      // Remove old keys after reading
      localStorage.removeItem('cart')
      localStorage.removeItem('appliedCoupon')
    }

    // Load user-specific cart
    const savedCart = localStorage.getItem(cartKey)
    const savedCoupon = localStorage.getItem(couponKey)

    setItems(savedCart ? JSON.parse(savedCart) : [])
    setAppliedCoupon(savedCoupon ? JSON.parse(savedCoupon) : null)
    setIsInitialized(true)

    // Clear guest cart when user logs in
    if (user) {
      localStorage.removeItem('cart_guest')
      localStorage.removeItem('coupon_guest')
    }
  }, [user, authLoading])

  // Save cart to user-specific storage when items change
  useEffect(() => {
    if (!isInitialized) return

    const userId = user?.id || null
    const cartKey = getCartStorageKey(userId)
    localStorage.setItem(cartKey, JSON.stringify(items))

    // Auto-remove coupon if subtotal falls below minimum
    if (appliedCoupon && appliedCoupon.minOrderAmount) {
      const currentSubtotal = items.reduce((total, item) => {
        const weightOptions = item.product.weightOptions as any[]
        const selectedOption = Array.isArray(weightOptions)
          ? weightOptions.find(opt => opt.size === item.selectedWeight)
          : null
        const price = selectedOption ? Number(selectedOption.salePrice) : Number(item.product.salePrice)
        return total + price * item.quantity
      }, 0)

      if (currentSubtotal < appliedCoupon.minOrderAmount) {
        setAppliedCoupon(null)
      }
    }
  }, [items, appliedCoupon, user, isInitialized])

  // Save coupon to user-specific storage when coupon changes
  useEffect(() => {
    if (!isInitialized) return

    const userId = user?.id || null
    const couponKey = getCouponStorageKey(userId)

    if (appliedCoupon) {
      localStorage.setItem(couponKey, JSON.stringify(appliedCoupon))
    } else {
      localStorage.removeItem(couponKey)
    }
  }, [appliedCoupon, user, isInitialized])

  const addToCart = (product: Product, quantity: number, weight: string, texture: string) => {
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(
        item =>
          item.product.id === product.id &&
          item.selectedWeight === weight &&
          item.selectedTexture === texture
      )

      if (existingIndex >= 0) {
        const newItems = [...prevItems]
        newItems[existingIndex].quantity += quantity
        return newItems
      }

      return [...prevItems, { product, quantity, selectedWeight: weight, selectedTexture: texture }]
    })
  }

  const removeFromCart = (productId: number, weight: string, texture: string) => {
    setItems(prevItems =>
      prevItems.filter(
        item =>
          !(item.product.id === productId &&
            item.selectedWeight === weight &&
            item.selectedTexture === texture)
      )
    )
  }

  const updateQuantity = (productId: number, weight: string, texture: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight, texture)
      return
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId &&
          item.selectedWeight === weight &&
          item.selectedTexture === texture
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setAppliedCoupon(null)
    // Also clear from storage
    const userId = user?.id || null
    const cartKey = getCartStorageKey(userId)
    const couponKey = getCouponStorageKey(userId)
    localStorage.removeItem(cartKey)
    localStorage.removeItem(couponKey)
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      // Find the price for the specific size selected
      const weightOptions = item.product.weightOptions as any[]
      const selectedOption = Array.isArray(weightOptions)
        ? weightOptions.find(opt => opt.size === item.selectedWeight)
        : null

      const price = selectedOption ? Number(selectedOption.salePrice) : Number(item.product.salePrice)
      return total + price * item.quantity
    }, 0)
  }

  const getCartCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0)
  }

  const applyCoupon = (coupon: AppliedCoupon) => {
    setAppliedCoupon(coupon)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shippingConfig,
        refreshShippingConfig: fetchShippingSettings,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
