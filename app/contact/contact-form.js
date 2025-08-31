"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineShoppingBag, HiX } from "react-icons/hi";

export default function ContactForm() {
  const [isOnSaleVisible, setIsOnSaleVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    queryType: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in touch with us</h1>
          <p className="text-gray-600 mb-8">If you have any query, Please dont hesitate to send us a message</p>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                </div>

                {/* Query Type */}
                <div>
                  <label htmlFor="queryType" className="block text-sm font-medium text-gray-700 mb-2">
                    Query Type
                  </label>
                  <select
                    id="queryType"
                    name="queryType"
                    value={formData.queryType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-user-blue focus:border-transparent"
                    required
                  >
                    <option value="">Select Query Type</option>
                    <option value="general">General Inquiry</option>
                    <option value="order">Order Related</option>
                    <option value="product">Product Information</option>
                    <option value="delivery">Delivery & Shipping</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
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
                      name="phoneNumber"
                      type="tel"
                      placeholder="03"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Whats on your mind?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-user-blue focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <Button type="submit" variant="user" className="w-full py-3 bg-blue-600 text-white ">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Details</h2>
          <p className="text-gray-600 mb-8">If you need any help, please contact us or send us an email. We will get back to you as soon as possible.</p>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HiOutlineLocationMarker className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600 text-sm mb-2">156-157, Block 3, BYJCHS, Bahadurabad Karachi, Pakistan</p>
                <p className="text-gray-600 text-sm">Safa Mall, Ziarat line, Malir Cantonment, Karachi, Pakistan</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HiOutlinePhone className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600 text-sm">(021) 111-624-333</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HiOutlineMail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600 text-sm">support@user.pk</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HiOutlineClock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Customer Support Hours</h3>
                <p className="text-gray-600 text-sm">7 Days a Week, 9:00am - 10:00pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maps Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Locations</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map 1 */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <HiOutlineLocationMarker className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-gray-600">Google Maps Integration</p>
                <p className="text-sm text-gray-500">user Supermarket - Bahadurabad</p>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">user Supermarket</h3>
            <p className="text-sm text-gray-600 mb-2">156-157 Main Shaheed-e-Millat Rd, Block 3 BYJCHS, Karachi</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-gray-600">4.3 (15,833 reviews)</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Directions
              </Button>
              <Button variant="outline" size="sm">
                View larger map
              </Button>
            </div>
          </div>

          {/* Map 2 */}
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-center">
                <HiOutlineLocationMarker className="w-12 h-12 text-red-500 mx-auto mb-2" />
                <p className="text-gray-600">Google Maps Integration</p>
                <p className="text-sm text-gray-500">user Super Market - Malir Cantt</p>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">user Super Market, Malir Cantt Branch</h3>
            <p className="text-sm text-gray-600 mb-2">Shop # GF 16 & FF 09, Safa Mall, Ziarat line, Malir Cantonment, Karachi, 75070</p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-sm text-gray-600">4.1 (92 reviews)</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Directions
              </Button>
              <Button variant="outline" size="sm">
                View larger map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating ON SALE Button */}
      {isOnSaleVisible && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-user-red text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <HiOutlineShoppingBag className="w-5 h-5" />
            <span className="font-medium">ON SALE</span>
            <button onClick={() => setIsOnSaleVisible(false)} className="text-white hover:text-gray-200 transition-colors" aria-label="Close sale notification">
              <HiX className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
