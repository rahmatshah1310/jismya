"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useCart } from "@/app/context/CartContext";
import { useCreateOrder } from "@/app/api/orderApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Checkout = () => {
  const { cart, getCartTotal, getCartItemCount, clearCart } = useCart();
  const placeOrderMutation = useCreateOrder();
  const router = useRouter();
  const checkoutSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    streetAddress: z.string().min(1, { message: "Address Line 1 is required" }),
    apartment: z.string().optional(), // Address Line 2
    country: z.string().min(1, { message: "Country is required" }),
    city: z.string().min(1, { message: "City is required" }),
    email: z.string().email({ message: "Enter a valid email" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    shippingMethod: z.string().optional(),
    notes: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(checkoutSchema) });

  const handleCompleteOrder = async (data: any) => {
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
        completeAddress: `${data.streetAddress}${data.apartment ? ", " + data.apartment : ""}`,
      },
      items: cart.map((item: any) => ({
        productId: item._id || item.id,
        quantity: item.quantity || 1,
        totalPrice: (item.discountedPrice ?? item.price) * (item.quantity || 1),
      })),
      totalAmount,
      shippingMethod: data.shippingMethod,
      notes: data.notes,
    } as any;
    try {
      const res = await placeOrderMutation.mutateAsync(orderData);
      toast.success(res?.message || "Order placed successfully!");
      clearCart();
      router.push("/");
    } catch (error: any) {
      toast.error(typeof error === "string" ? error : "Failed to place order.");
    }
  };

  const subtotal = getCartTotal();

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form onSubmit={handleSubmit(handleCompleteOrder)}>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left: inline billing form --> */}
              <div className="lg:max-w-[670px] w-full">
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                  <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">Checkout</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* First Name & Last Name */}
                    <div>
                      <label>First Name</label>
                      <input {...register("firstName")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.firstName && <p className="text-red-500 text-sm">{String(errors.firstName.message)}</p>}
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input {...register("lastName")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.lastName && <p className="text-red-500 text-sm">{String(errors.lastName.message)}</p>}
                    </div>

                    {/* Address Line 1 & Address Line 2 */}
                    <div className="md:col-span-2">
                      <label>Address Line 1</label>
                      <input {...register("streetAddress")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.streetAddress && <p className="text-red-500 text-sm">{String(errors.streetAddress.message)}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label>Address Line 2 (Optional)</label>
                      <input {...register("apartment")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                    </div>

                    {/* Country */}
                    <div className="md:col-span-2">
                      <label>Country</label>
                      <select
                        {...register("country")}
                        defaultValue="Pakistan"
                        className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none"
                      >
                        <option value="Pakistan">Pakistan</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-sm">{String(errors.country.message)}</p>}
                    </div>

                    {/* City */}
                    <div>
                      <label>City</label>
                      <input {...register("city")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.city && <p className="text-red-500 text-sm">{String(errors.city.message)}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label>Email</label>
                      <input type="email" {...register("email")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
                    </div>

                    {/* Phone */}
                    <div className="md:col-span-2">
                      <label>Phone</label>
                      <input {...register("phone")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none" />
                      {errors.phone && <p className="text-red-500 text-sm">{String(errors.phone.message)}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label>Shipping Method</label>
                    <select {...register("shippingMethod")} className="rounded-md border border-gray-3 bg-gray-1 w-full py-2.5 px-5 outline-none">
                      <option value="standard">Standard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full mt-0">
                {/* <!-- order list box wrapped in accordion --> */}
                <Accordion type="single" collapsible className="bg-white shadow-1 rounded-[10px]">
                  <AccordionItem value="your-order">
                    <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                      <AccordionTrigger className="font-medium text-xl text-dark text-left w-full">Your Order</AccordionTrigger>
                    </div>
                    <AccordionContent>
                      <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                        {/* <!-- title --> */}
                        <div className="flex items-center justify-between py-5 border-b border-gray-3">
                          <div>
                            <h4 className="font-medium text-dark">Product</h4>
                          </div>
                          <div>
                            <h4 className="font-medium text-dark text-right">Subtotal</h4>
                          </div>
                        </div>

                        {/* <!-- product items from cart --> */}
                        {cart.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between py-5 border-b border-gray-3">
                            <div className="flex items-center gap-3">
                              <Link href={`/product/${item._id}`} className="w-12 h-12 rounded bg-gray-2 flex items-center justify-center overflow-hidden">
                                <Image width={48} height={48} src={item.image || item.imageUrl || "/images/products/product-1-sm-1.png"} alt="product" />
                              </Link>
                              <p className="text-dark">{item.productName}</p>
                            </div>
                            <div>
                              <p className="text-dark text-right">${(item.discountedPrice ?? item.price) * (item.quantity || 1)}</p>
                            </div>
                          </div>
                        ))}

                        {/* <!-- total --> */}
                        <div className="flex items-center justify-between pt-5">
                          <div>
                            <p className="font-medium text-lg text-dark">Total</p>
                          </div>
                          <div>
                            <p className="font-medium text-lg text-dark text-right">${subtotal}</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* <!-- checkout button --> */}
                <button
                  type="submit"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  {placeOrderMutation.isPending ? "Processing..." : "Process to Checkout"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Checkout;
