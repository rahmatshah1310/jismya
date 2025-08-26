import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../../services/order.service";

// 🔁 Mutations

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => orderService.updateOrder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation(({ orderId, status }) => orderService.updateOrderStatus(orderId, status));
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderService.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// 🔍 Queries

export const useGetAllOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: orderService.getAllOrders,
  });

export const useGetSingleOrder = (id) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getSingleOrder(id),
    enabled: !!id,
  });

export const useUpdateShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, shippingAddress }) => orderService.updateShippingAddress(orderId, shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

// Update billing address
export const useUpdateBillingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, billingAddress }) => orderService.updateBillingAddress(orderId, billingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};

export const useTrackOrder = (trackingId) => {
  return useQuery(["trackOrder", trackingId], () => orderService.trackOrder(trackingId), {
    enabled: !!trackingId,
    onError: () => {
      toast.error("Failed to track order.");
    },
  });
};
