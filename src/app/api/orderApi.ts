import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";

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
    mutationFn: (variables: { id: string | number; data: any }) =>
      orderService.updateOrder(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: (variables: { orderId: string | number; status: any }) =>
      orderService.updateOrderStatus(variables.orderId, variables.status),
  });
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
    mutationFn: (variables: { orderId: string | number; shippingAddress: any }) =>
      orderService.updateShippingAddress(variables.orderId, variables.shippingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Update billing address
export const useUpdateBillingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { orderId: string | number; billingAddress: any }) =>
      orderService.updateBillingAddress(variables.orderId, variables.billingAddress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export const useTrackOrder = (trackingId: string | number) =>
  useQuery({
    queryKey: ["trackOrder", trackingId],
    queryFn: () => orderService.trackOrder(trackingId),
    enabled: !!trackingId,
  });
