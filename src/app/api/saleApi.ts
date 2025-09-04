import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { saleService } from "@/services/sale.service";

// 🔹 GET product sales by product ID
export const useGetProductSales = (id) =>
  useQuery({
    queryKey: ["product-sales", id],
    queryFn: () => saleService.getProductSales(id),
    enabled: !!id,
  });

// 🔹 GET all sales
export const useGetAllSales = () =>
  useQuery({
    queryKey: ["all-sales"],
    queryFn: saleService.getAllSales,
  });

// 🔹 GET sales stats
export const useGetSalesStats = () =>
  useQuery({
    queryKey: ["sales-stats"],
    queryFn: saleService.getSalesStats,
  });

// 🔸 CREATE a sale
export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleService.createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-sales"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
    },
  });
};

// 🔸 ADD products to sale
export const useConnectProductsToSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleService.addProductsToSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-sales"] });
    },
  });
};

// 🔸 REMOVE products from sale
export const useRemoveProductsFromSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleService.removeProductsFromSale,
    onSuccess: (_, variables) => {
      const saleId = variables?.saleId;
      if (saleId) queryClient.invalidateQueries({ queryKey: ["product-sales", saleId] });
    },
  });
};

// 🔸 UPDATE sale status
export const useUpdateSaleStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string | number; isActive: boolean }) =>
      saleService.updateSaleStatus(variables.id, { isActive: variables.isActive }),
    onSuccess: (_, variables) => {
      const id = variables.id;
      queryClient.invalidateQueries({ queryKey: ["all-sales"] });
      queryClient.invalidateQueries({ queryKey: ["product-sales", id] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
    },
  });
};

// 🔸 UPDATE sale (name, description, discount, etc.)
export const useUpdateSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string | number; data: any }) =>
      saleService.updateSale(variables.id, variables.data),
    onSuccess: (_, variables) => {
      const id = variables.id;
      queryClient.invalidateQueries({ queryKey: ["all-sales"] });
      queryClient.invalidateQueries({ queryKey: ["product-sales", id] });
    },
  });
};

// 🔸 DELETE a sale
export const useDeleteSale = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saleService.deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-sales"] });
      queryClient.invalidateQueries({ queryKey: ["sales-stats"] });
    },
  });
};
