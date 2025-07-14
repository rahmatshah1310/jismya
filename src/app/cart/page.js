'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import InputField from '@/components/ui/InputField'
import { cartItems as mockCartItems } from '@/constants/data'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems)
  const { id } = useParams()
    const itemId = parseInt(id)
    const router = useRouter()
  
    const [cartItem, setCartItem] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [selectedOption, setSelectedOption] = useState("")
  
    // Load the cart item from localStorage
    useEffect(() => {
      const cart = JSON.parse(localStorage.getItem('cart')) || []
      const foundItem = cart.find(item => item.id === itemId)
  
      if (foundItem) {
        setCartItem(foundItem)
        setQuantity(foundItem.quantity || 1)
        setSelectedOption(foundItem.selectedOption || "")
      }
    }, [itemId])


  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="min-h-[60vh] py-12 px-4 bg-[var(--color-gray-50)]">
      <div className="max-w-[90%] mx-auto bg-[var(--color-white)] rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-[var(--color-pink-600)]">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-[var(--color-gray-600)] py-12">
            Your cart is empty.
            <br />
            <Link href="/" className="text-[var(--color-pink-500)] hover:underline mt-2 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row gap-6 min-w[100%]">
                    <div className="flex-shrink-0 flex justify-center items-center">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={180}
                        height={180}
                        className="rounded object-cover w-full h-full bg-gray-100"
                      />
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h2>
                      <p className="text-pink-600 text-lg font-semibold mb-2">Rs. {item.price.toLocaleString()}</p>

                      <div className="mb-2 text-gray-600 text-sm">
                        <div><strong>Ships In:</strong> {item.delivery}</div>
                        <div><strong>Delivery Area:</strong> {item.area}</div>
                        <div><strong>Origin:</strong> {item.origin}</div>
                        <div><strong>Shipped By:</strong> {item.shippedBy}</div>
                      </div>

                      <div className="my-2 flex items-center gap-2">
                        {item.selectedOption || "selectedOption"}
                      </div>

                      <div className="my-2 flex items-center gap-2">
                       {item.quantity || "quantity"}
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="font-bold text-lg text-gray-700">Total:</div>
              <div className="font-bold text-xl text-[var(--color-pink-600)]">Rs. {total.toLocaleString()}</div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-[var(--color-pink-500)] hover:bg-[var(--color-pink-600)] text-white py-3 rounded-md font-semibold transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
