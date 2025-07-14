'use client'

import { cartItems } from '@/constants/data'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

export default function FeaturedProductsPage() {
    const { addToCart } = useCart()
    const router = useRouter()
    const [hoveredCategory, setHoveredCategory] = useState(null)

    const groupByCategory = (items) => {
        return items.reduce((groups, item) => {
            if (!groups[item.category]) groups[item.category] = []
            groups[item.category].push(item)
            return groups
        }, {})
    }

    const groupedProducts = groupByCategory(cartItems)

    return (
        <div className="px-4 sm:px-6 md:px-8 py-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-[var(--color-pink-600)]">
                Featured Products
            </h1>

            {Object.entries(groupedProducts).map(([category, products]) => (
                <div
                    key={category}
                    className="mb-12 relative"
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                >
                    <h2 className="text-xl sm:text-2xl font-semibold mb-6">{category}</h2>

                    {products.length > 4 ? (
                        <Swiper
                            modules={[Navigation]}
                            navigation={hoveredCategory === category}
                            slidesPerView={1}
                            className='bg-white shadow-lg rounded-2xl !p-5'

                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {products.map((product, index) => (
                                <SwiperSlide key={product.id}>
                                    <div
                                        className={`flex flex-col items-center text-center px-2 cursor-pointer transform transition-transform duration-300 hover:scale-105`}
                                        onClick={() => router.push(`/cart/${product.id}`)}
                                    >

                                        <div className={`w-full ${index !== products.length - 1 ? 'border-r border-gray-200 pr-4' : ''}`}>
                                            <div className="relative h-48 w-full mb-3">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </div>
                                            <h4 className="text-gray-800 font-semibold text-base">{product.name}</h4>
                                            <p className="text-pink-500 font-bold text-sm">Rs. {product.price}</p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                addToCart({ ...product, quantity: 1 })
                                                router.push(`/cart/${product.id}`)
                                            }}
                                            className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded text-xs"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className={`flex flex-col items-center text-center px-4 ${index !== products.length - 1 ? 'border-r border-gray-200' : ''
                                        } cursor-pointer`}
                                    onClick={() => router.push(`/cart/${product.id}`)}
                                >
                                    <div className="relative h-48 w-full mb-3">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded"
                                        />
                                    </div>
                                    <h4 className="text-gray-800 font-semibold text-base">{product.name}</h4>
                                    <p className="text-pink-500 font-bold text-sm">Rs. {product.price}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            addToCart({ ...product, quantity: 1 })
                                            router.push(`/cart/${product.id}`)
                                        }}
                                        className="mt-2 bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded text-xs"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Button */}
                    {products.length > 4 && (
                        <div className="mt-4 text-end">
                            <button className="text-pink-500 hover:underline text-sm font-medium">
                                View All
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
