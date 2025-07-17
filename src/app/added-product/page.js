"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import OrderPage so it runs client-side only
// const OrderPage = dynamic(() => import("../orders/addorders/page"), {
//   ssr: false,
// });

export default function AddedProduct() {
  const { cart, updateItem, removeItem } = useCart();

  const totalPrice =
    cart?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;

  if (!cart || cart.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <p className="text-xl text-gray-600">Your cart is empty!</p>
        <Link href="/" className="ml-4 text-pink-600 hover:underline">
          Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Shopping Cart
      </h1>

      {/* FLEX LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:items-start bg-white p-4 shadow rounded-lg"
            >
              <div className="flex-shrink-0 w-full sm:w-40 h-40 relative mb-4 sm:mb-0 sm:mr-6">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 160px"
                  className="object-cover rounded"
                  priority={true}
                />
              </div>

              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-700 mt-1">
                  Price: Rs. {item.price.toLocaleString()}
                </p>
                <p className="text-gray-700 mt-1">Quantity: {item.quantity}</p>
                {item.selectedOption && (
                  <p className="text-gray-700 mt-1">
                    Option: {item.selectedOption}
                  </p>
                )}
              </div>

              <div className="mt-4 sm:mt-0 flex space-x-2">
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>

                <Link
                  href={`/cart/${item.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}

          <div className="text-right text-2xl font-bold">
            Total: Rs. {totalPrice.toLocaleString()}
          </div>
        </div>

        {/* Order Form Section */}
        {/* <div className="w-full lg:w-1/3">
          <OrderPage />
        </div> */}
      </div>
    </main>
  );
}
