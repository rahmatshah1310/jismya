"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateShippingAddress } from "../../app/api/orderApi";

const ShippingAddressForm = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const updateShippingMutation = useUpdateShippingAddress();

  const onSubmit = (data) => {
    updateShippingMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Shipping address updated");
        onClose();
      },
      onError: () => toast.error("Failed to update shipping address"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Shipping Address</h2>

      <input {...register("name", { required: true })} placeholder="Full Name" className="border p-2 mb-2 w-full" />
      {errors.name && <p className="text-red-500">Name required</p>}

      <input {...register("email")} placeholder="Email" className="border p-2 mb-2 w-full" />
      <input {...register("phone", { required: true })} placeholder="Phone" className="border p-2 mb-2 w-full" />

      <input {...register("city", { required: true })} placeholder="City" className="border p-2 mb-2 w-full" />
      <textarea {...register("completeAddress", { required: true })} placeholder="Address" className="border p-2 mb-2 w-full" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Update</button>
      <button type="button" onClick={onClose} className="ml-2 text-gray-600">Cancel</button>
    </form>
  );
};

export default ShippingAddressForm;
