"use client";

import { useState } from "react";
import CreateOrderForm from "../../components/ordersform/CreateOrderForm";
import BillingAddressForm from "../../components/ordersform/BillingAddressForm";
import ShippingAddressForm from "../../components/ordersform/ShippingAddressForm";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";
import { BeatLoader } from "react-spinners";
import { useCreateOrder } from "../../app/api/orderApi";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({});
  const [activeForm, setActiveForm] = useState("create");

  const { cart, getCartTotal, getCartItemCount } = useCart();
  const placeOrderMutation = useCreateOrder();

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
  
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
  
    const totalAmount = getCartTotal();
  
    const orderData = {
      user: {
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        country: formData.country,
        city: formData.city,
        phone: formData.phone,
        completeAddress: formData.address,
      },
      items: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
      })),
      totalAmount,
      shippingMethod: formData.shippingMethod,
      notes: formData.notes,
    };
  
    try {
      const res = await placeOrderMutation.mutateAsync(orderData);
      toast.success(res?.message || "Order placed successfully!");
      // ✅ optional: clear cart / reset form here
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to place order."
      );
    }
  };
  
  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 grid grid-cols-1 md:grid-cols-7 gap-6 items-start">
      {/* Left Side: Forms */}
      <div className="md:col-span-4">
        {activeForm === "create" && (
          <CreateOrderForm
            formData={formData}
            onFormChange={setFormData}
            onOpenBilling={() => setActiveForm("billing")}
            onOpenShipping={() => setActiveForm("shipping")}
          />
        )}

        {activeForm === "billing" && (
          <BillingAddressForm
            formData={formData}
            onFormChange={setFormData}
            onClose={() => setActiveForm("create")}
          />
        )}

        {activeForm === "shipping" && (
          <ShippingAddressForm
            formData={formData}
            onFormChange={setFormData}
            onClose={() => setActiveForm("create")}
          />
        )}
      </div>

      {/* Right Side: Summary */}
      <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md sticky top-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-600 mb-4">
          {getCartItemCount()} Items in Cart
        </p>

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
                <div
                  key={item._id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        {/* Totals */}
        <div className="border-t border-b border-gray-200 py-4 my-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Cart Subtotal</span>
            <span className="text-xl font-bold">{formatPrice(getCartTotal())}</span>
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
          onClick={handleCompleteOrder}
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
