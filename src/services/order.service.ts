import { sendRequest } from "@/services/sendingRequests";

export const createOrder = async (data) => {
  const response = await sendRequest({
    method: "POST",
    url: "/orders",
    data,
  });
  return response.data;
};

// GET /orders
export const getAllOrders = async () => {
  const response = await sendRequest({
    method: "GET",
    url: "/orders",
  });
  return response.data;
};

// GET /orders/:id
export const getSingleOrder = async (id) => {
  const response = await sendRequest({
    method: "GET",
    url: `/orders/${id}`,
  });
  return response.data;
};

// PUT /orders/:id
export const updateOrder = async (id, data) => {
  const response = await sendRequest({
    method: "PUT",
    url: `/orders/${id}`,
    data,
  });
  return response.data;
};

// DELETE /orders/:id
export const deleteOrder = async (id) => {
  const response = await sendRequest({
    method: "DELETE",
    url: `/orders/${id}`,
  });
  return response.data;
};

// PUT /orders/:id/status (update only status)
export const updateOrderStatus = async (id, status) => {
  const response = await sendRequest({
    method: "PUT",
    url: `/orders/${id}/status`,
    data: { status },
  });
  return response.data;
};

export const updateShippingAddress = async (orderId, shippingAddress) => {
  const response = await sendRequest({
    method: "PUT",
    url: `/orders/shipping-address/${orderId}`,
    data: shippingAddress,
  });
  return response.data;
};

// PUT /orders/billing-address/:id
export const updateBillingAddress = async (orderId, billingAddress) => {
  const response = await sendRequest({
    method: "PUT",
    url: `/orders/billing-address/${orderId}`,
    data: billingAddress,
  });
  return response.data;
};

export const trackOrder = async (trackingId) => {
  const response = await sendRequest({
    method: "GET",
    url: `/orders/track/${trackingId}`,
  });
  return response.data;
};

// Export service object
export const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  trackOrder,
  deleteOrder,
  updateOrderStatus,
  updateShippingAddress,
  updateBillingAddress,
};
