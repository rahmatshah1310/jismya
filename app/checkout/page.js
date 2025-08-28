"use client";

import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";
import { BeatLoader } from "react-spinners";
import { useCreateOrder } from "../../app/api/orderApi";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { cart, getCartTotal, getCartItemCount, clearCart } = useCart();
  const placeOrderMutation = useCreateOrder();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCompleteOrder = async (data) => {
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const totalAmount = getCartTotal();

    const orderData = {
      billingAddress: {
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        country: data.country,
        city: data.city,
        phone: data.phone,
        completeAddress: data.address,
      },
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount,
      shippingMethod: data.shippingMethod,
      notes: data.notes,
    };

    try {
      const res = await placeOrderMutation.mutateAsync(orderData);
      console.log(res.message, "res.message");
      toast.success(res?.message || "Order placed successfully!");
      reset();
      // Clear cart after successful order
      clearCart();
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(typeof error === "string" ? error : "Failed to place order.");
    }
  };

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
      {/* Left Side: Form */}
      <form onSubmit={handleSubmit(handleCompleteOrder)} className="md:col-span-4 bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* Billing Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label>First Name</label>
            <input {...register("firstName", { required: true })} className="border p-2 mb-2 w-full" />
            {errors.firstName && <p className="text-red-500">Required</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input {...register("lastName", { required: true })} className="border p-2 mb-2 w-full" />
            {errors.lastName && <p className="text-red-500">Required</p>}
          </div>
          <div>
            <label>Email</label>
            <input {...register("email", { required: true })} className="border p-2 mb-2 w-full" />
            {errors.email && <p className="text-red-500">Required</p>}
          </div>
          <div>
            <label>Phone</label>
            <input {...register("phone", { required: true })} className="border p-2 mb-2 w-full" />
            {errors.phone && <p className="text-red-500">Required</p>}
          </div>
          <div>
            <label>Country</label>
            <input {...register("country")} className="border p-2 mb-2 w-full" />
          </div>
          <div>
            <label>City</label>
            <input {...register("city", { required: true })} className="border p-2 mb-2 w-full" />
            {errors.city && <p className="text-red-500">Required</p>}
          </div>
        </div>

        <div className="mb-6">
          <label>Complete Address</label>
          <textarea {...register("address", { required: true })} className="border p-2 mb-2 w-full" />
          {errors.address && <p className="text-red-500">Required</p>}
        </div>

        {/* Notes & Shipping */}
        <div className="mb-6">
          <label>Notes</label>
          <textarea {...register("notes")} className="border p-2 mb-2 w-full" />
        </div>

        <div className="mb-6">
          <label>Shipping Method</label>
          <select {...register("shippingMethod")} className="border p-2 w-full">
            <option value="standard">Standard (Rs. 0)</option>
            <option value="express">Express</option>
          </select>
        </div>
      </form>

      {/* Right Side: Summary */}
      <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-600 mb-4">{getCartItemCount()} Items in Cart</p>

        {/* Accordion */}
        <Accordion.Root type="single" collapsible className="w-full">
          <Accordion.Item value="cart-items" className="border-b">
            <Accordion.Header>
              <Accordion.Trigger className="flex justify-between items-center w-full py-2 text-left font-medium text-gray-800 hover:text-blue-600">
                <span>View Cart Items</span>
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="mt-2 space-y-4 max-h-60 overflow-y-auto">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b pb-3">
                  <Image width={10} height={10} src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">{item.price * item.quantity}</p>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        {/* Totals */}
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Cart Subtotal</span>
            <span className="text-xl font-bold">{getCartTotal()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Rs. 0</span>
          </div>
        </div>

        <div className="flex justify-between text-lg font-semibold mb-6">
          <span>Order Total</span>
          <span>Rs. {getCartTotal().toLocaleString()}</span>
        </div>

        {/* Final Button */}
        <button
          form="checkout-form"
          onClick={handleSubmit(handleCompleteOrder)}
          disabled={placeOrderMutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-md"
        >
          {placeOrderMutation.isPending ? <BeatLoader /> : "Complete Order"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
