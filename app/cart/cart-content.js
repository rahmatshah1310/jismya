"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { HiOutlineLockClosed, HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "@/context/CartContext"; // adjust import path

export function CartContent() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, processingItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Looks like you havenst added any items yet.</p>
          <Link href="/">
            <Button className="bg-blue-600" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">SHOPPING CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-5 gap-4 p-4 sm:p-6 border-b border-border bg-muted/30">
                <div className="font-semibold text-sm">Name</div>
                <div className="font-semibold text-sm text-center">Price</div>
                <div className="font-semibold text-sm text-center">Qty</div>
                <div className="font-semibold text-sm text-center">Subtotal</div>
                <div className="font-semibold text-sm text-center">Remove</div>
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <div key={item._id} className="border-b border-border last:border-b-0 p-4 sm:p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/product/${item._id}`} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/watch.jpg"} alt={item.name} fill className="object-cover" />
                      </Link>

                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-foreground">{item.name}</h3>
                        <p className="text-xs text-muted-foreground">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Qty:</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="border p-1 rounded hover:bg-muted">
                          <HiOutlineMinus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="border p-1 rounded hover:bg-muted">
                          <HiOutlinePlus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Subtotal</p>
                        <p className="font-semibold text-sm">{item.price * item.quantity}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button onClick={() => removeFromCart(item._id)} className="text-destructive hover:text-destructive/80 p-2">
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:grid grid-cols-5 gap-4 items-center">
                    {/* Name Column */}
                    <div className="flex items-center gap-3">
                      <Link href={`/product/${item._id}`} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/watch.jpg"} alt={item.name} fill className="object-cover" />
                      </Link>

                      <div>
                        <h3 className="font-medium text-sm text-foreground">{item.name}</h3>
                      </div>
                    </div>

                    {/* Price Column */}
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">{item.price}</span>
                    </div>

                    {/* Quantity Column */}
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="border p-1 rounded hover:bg-muted transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <HiOutlineMinus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="border p-1 rounded hover:bg-muted transition-colors">
                        <HiOutlinePlus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subtotal Column */}
                    <div className="text-center">
                      <span className="font-semibold text-sm">{item.price * item.quantity}</span>
                    </div>

                    {/* Remove Column */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-destructive hover:text-destructive/80 p-2 rounded hover:bg-destructive/10 transition-colors"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Total</span>
                <span className="text-xl font-bold">{getCartTotal()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/checkout" className="w-full bg-gray-100 p-2 flex rounded items-center justify-center">
                <HiOutlineLockClosed className="mr-2" />
                Proceed To Checkout
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
