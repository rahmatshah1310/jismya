"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import SingleItem from "./SingleItem";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export const Wishlist = () => {
  const { wishlist: wishlistItems, clearWishlist } = useCart();

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      {wishlistItems.length > 0 ? (
        <section className="overflow-hidden py-20 bg-gray-2">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
              <button className="text-blue" onClick={() => clearWishlist()}>Clear Wishlist Cart</button>
            </div>

            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-10">
                    <div className="min-w-[83px]"></div>
                    <div className="min-w-[387px]">
                      <p className="text-dark">Product</p>
                    </div>
                    <div className="min-w-[205px]">
                      <p className="text-dark">Unit Price</p>
                    </div>
                    <div className="min-w-[265px]">
                      <p className="text-dark">Stock Status</p>
                    </div>
                    <div className="min-w-[150px]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {wishlistItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center mt-8">
          <div className="mx-auto pb-7.5">
            {/* same empty SVG icon as cart */}
            <svg className="mx-auto" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="50" fill="#F3F4F6" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.1693 36.2421C35.6126 36.0565 35.0109 36.3574 34.8253 36.9141C34.6398 37.4707 34.9406 38.0725 35.4973 38.258L35.8726 38.3831C36.8308 38.7025 37.4644 38.9154 37.9311 39.1325C38.373 39.3381 38.5641 39.5036 38.6865 39.6734C38.809 39.8433 38.9055 40.0769 38.9608 40.5612C39.0192 41.0726 39.0208 41.7409 39.0208 42.751L39.0208 46.5361C39.0208 48.4735 39.0207 50.0352 39.1859 51.2634C39.3573 52.5385 39.7241 53.6122 40.5768 54.4649C41.4295 55.3176 42.5032 55.6844 43.7783 55.8558C45.0065 56.0209 46.5681 56.0209 48.5055 56.0209H59.9166C60.5034 56.0209 60.9791 55.5452 60.9791 54.9584C60.9791 54.3716 60.5034 53.8959 59.9166 53.8959H48.5833C46.5498 53.8959 45.1315 53.8936 44.0615 53.7498C43.022 53.61 42.4715 53.3544 42.0794 52.9623C41.9424 52.8253 41.8221 52.669 41.7175 52.4792H55.7495C56.3846 52.4792 56.9433 52.4793 57.4072 52.4292C57.9093 52.375 58.3957 52.2546 58.8534 51.9528C59.3111 51.651 59.6135 51.2513 59.8611 50.8111C60.0898 50.4045 60.3099 49.891 60.56 49.3072L61.2214 47.7641C61.766 46.4933 62.2217 45.4302 62.4498 44.5655C62.6878 43.6634 62.7497 42.7216 62.1884 41.8704C61.627 41.0191 60.737 40.705 59.8141 40.5684C58.9295 40.4374 57.7729 40.4375 56.3903 40.4375L41.0845 40.4375C41.0806 40.3979 41.0765 40.3588 41.0721 40.3201C40.9937 39.6333 40.8228 39.0031 40.4104 38.4309C39.998 37.8588 39.4542 37.4974 38.8274 37.2058C38.2377 36.9315 37.4879 36.6816 36.6005 36.3858L36.1693 36.2421Z"
                fill="#8D93A5"
              />
            </svg>
          </div>
          <p className="pb-6">Your wishlist is empty!</p>
          <Link
            href="/shop"
            className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </>
  );
};
