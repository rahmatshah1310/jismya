"use client"

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { cartItems } from '@/constants/data'

export default function SingleCartItem() {
  const { id } = useParams()
  const router = useRouter()
  const { cart, addToCart, removeItem, loading } = useCart()

  const product = cartItems.find((item) => item.id === String(id))
  const cartItem = cart.find((item) => item.id === String(id))

  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState("")
  const [alreadyAdded, setAlreadyAdded] = useState(false)

  useEffect(() => {
    setQuantity(1)
    setSelectedOption("")
    setAlreadyAdded(!!cartItem)
  }, [id, cartItem])

  if (loading) return <h1 className="text-center py-20">Loading...</h1>
  if (!product) return <h1 className="text-center py-20">Item not found.</h1>

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedOption
    })
    setAlreadyAdded(true)
    alert('Item added to cart!')
  }

  const handleRemove = () => {
    removeItem(product.id)
    alert('Item removed from cart')
    router.push('/')
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Image */}
          <div className="flex justify-center items-center lg:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-md object-cover w-full max-w-sm bg-gray-100"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-xl text-pink-600 font-semibold mb-4">
                Rs. {product.price.toLocaleString()}
              </p>

              <div className="text-gray-600 mb-4 space-y-1 text-sm sm:text-base">
                <div><strong>Ships In:</strong> {product.delivery}</div>
                <div><strong>Delivery Area:</strong> {product.area}</div>
                <div><strong>Origin:</strong> {product.origin}</div>
                <div><strong>Shipped By:</strong> {product.shippedBy}</div>
              </div>

              {/* Size Selection */}
              <div className="mb-4">
                <label className="font-semibold block mb-1">Size:</label>
                <select
                  className="w-full sm:w-1/2 border border-gray-300 rounded px-2 py-2"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="">Choose an Option...</option>
                  {product.options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label className="font-semibold block mb-1">Quantity:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full sm:w-24 px-2 py-2 border border-gray-300 rounded"
                >
                  {(product.availableQuantities || ['1', '2', '3', '4']).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {!alreadyAdded && (
                <button
                  onClick={handleAddToCart}
                  disabled={alreadyAdded}
                  className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
              )}

              {cartItem && (
                <button
                  onClick={handleRemove}
                  className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-semibold transition"
                >
                  Remove
                </button>
              )}

              <Link
                href="/"
                className="w-full sm:w-auto text-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md font-semibold transition"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
