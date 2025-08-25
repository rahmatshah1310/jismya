"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { HiOutlinePhone } from "react-icons/hi";

export function TrackOrderForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderNumber || !phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    setIsTracking(true);
    // Simulate API call
    setTimeout(() => {
      setIsTracking(false);
      // Handle tracking logic here
    }, 2000);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTrackOrder} className="space-y-6">
          {/* Order Number */}
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Order Number
            </label>
            <Input
              id="orderNumber"
              type="text"
              placeholder="Order No"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlinePhone className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="03"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Track Button */}
          <Button type="submit" variant="user" className="w-full py-3 text-lg" disabled={isTracking}>
            {isTracking ? "Tracking..." : "Track Order"}
          </Button>
        </form>

        {/* Additional Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Make sure you have the correct order number from your confirmation email</p>
            <p>• Enter the phone number you used when placing the order</p>
            <p>• If youre having trouble, contact our customer support at (021) 111-624-333</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
