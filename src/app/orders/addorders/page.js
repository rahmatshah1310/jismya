'use client'

import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function OrderPage() {
  const { cart, totalPrice } = useCart()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'Cash on Delivery'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const order = {
      userId: 'user_12345', // Replace with actual logged-in user ID
      items: cart.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        selectedOption: item.selectedOption,
      })),
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
      shippingAddress: {
        fullName: form.fullName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        street: form.street,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
      paymentMethod: form.paymentMethod,
      orderStatus: 'pending',
    }

    // TODO: Send to backend API
    console.log(order)
    alert('Order submitted!')
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      {/* Shipping Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold">Shipping Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full Name" className="border p-2 rounded" />
          <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" type="email" className="border p-2 rounded" />
          <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required placeholder="Phone Number" className="border p-2 rounded" />
          <input name="street" value={form.street} onChange={handleChange} required placeholder="Street Address" className="border p-2 rounded col-span-full" />
          <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="border p-2 rounded" />
          <input name="postalCode" value={form.postalCode} onChange={handleChange} required placeholder="Postal Code" className="border p-2 rounded" />
          <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" className="border p-2 rounded" />
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="font-medium mb-2">Payment Method</h3>
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} className="border p-2 rounded">
            <option>Cash on Delivery</option>
            <option>Credit Card (Coming Soon)</option>
          </select>
        </div>

        <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
          Place Order
        </button>
      </form>
    </main>
  )
}
