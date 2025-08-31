"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineShoppingCart, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "@/context/CartContext";

export default function WishlistContent() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 }, 1);
    removeFromWishlist(item._id);
  };

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16m-7 4h7" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">Save items you love and get back to them anytime.</p>
          <Link href="/">
            <Button className="bg-blue-600" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">WISHLIST</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Wishlist Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-5 gap-4 p-4 sm:p-6 border-b border-border bg-muted/30">
                <div className="font-semibold text-sm col-span-2">Name</div>
                <div className="font-semibold text-sm text-center">Price</div>
                <div className="font-semibold text-sm text-center col-span-2">Actions</div>
              </div>

              {/* Items */}
              {wishlist.map((item) => (
                <div key={item._id} className="border-b border-border last:border-b-0 p-4 sm:p-6">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/product/${item._id}`} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/watch.jpg"} alt={item.name || "Item"} fill className="object-cover" />
                      </Link>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-foreground">{item.name || item.productName || "Item"}</h3>
                        <p className="text-xs text-muted-foreground">{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <Button onClick={() => handleAddToCart(item)} className="flex-1 bg-blue-600" size="sm">
                        <HiOutlineShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button onClick={() => removeFromWishlist(item._id)} className="bg-blue-600" size="sm">
                        <HiOutlineTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden sm:grid grid-cols-5 gap-4 items-center">
                    {/* Name */}
                    <div className="col-span-2 flex items-center gap-3">
                      <Link href={`/product/${item._id}`} className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={item.image || "/watch.jpg"} alt={item.name || "Item"} fill className="object-cover" />
                      </Link>
                      <div>
                        <h3 className="font-medium text-sm text-foreground">{item.name || item.productName || "Item"}</h3>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <span className="text-sm text-muted-foreground">{item.price}</span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-center gap-3">
                      <Button onClick={() => handleAddToCart(item)} size="sm" className="px-3  bg-blue-600 text-white ">
                        <HiOutlineShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button onClick={() => removeFromWishlist(item._id)} size="sm" className="px-3  bg-blue-600 text-white ">
                        <HiOutlineTrash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Helpful Card / CTA */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Saved Items</span>
                <span className="text-xl font-bold">{wishlist.length}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">Move items to your cart when you’re ready to check out.</p>
              <Link href="/cart">
                <Button variant="outline" className="w-full">
                  Go to Cart
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
