"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";

const CreateOrderForm = ({ onFormChange, onOpenBilling, onOpenShipping, formData }) => {
  const { cart, getCartTotal } = useCart();

  const { register, watch, formState: { errors } } = useForm({
    defaultValues: formData || {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      country: "Pakistan",
      city: "",
      address: "",
      shippingMethod: "standard",
      notes: "",
    },
  });

  // Sync form values to parent (CheckoutPage)
  const values = watch();
  useEffect(() => {
    onFormChange(values);
  }, [JSON.stringify(values)]);
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Billing / User Info */}
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

      {/* Cart Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Your Products</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item._id} className="flex justify-between">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="text-right font-semibold mt-2">
          Total: {formatPrice(getCartTotal())}
        </div>
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

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onOpenBilling}
          className="text-blue-600 hover:underline"
        >
          Update Billing Address
        </button>
        <button
          type="button"
          onClick={onOpenShipping}
          className="text-blue-600 hover:underline"
        >
          Update Shipping Address
        </button>
      </div>
    </div>
  );
};

export default CreateOrderForm;
