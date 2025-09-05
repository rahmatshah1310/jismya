import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";

// 🔁 Mutations

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-category"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { id: string | number; data: any }) =>
      productService.updateProduct(variables.id, variables.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-category"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });
};

export const useAddDescriptionImages = () => useMutation({ mutationFn: productService.addDescriptionImages });

export const useDeleteDescriptionImage = () => useMutation({ mutationFn: productService.deleteDescriptionImage });

export const useUpdateProductOrder = () =>
  useMutation({
    mutationFn: (variables: { id: string | number; data: any }) =>
      productService.updateProductOrder(variables.id, variables.data),
  });

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { productId: string | number } & Record<string, any>) => {
      const { productId, ...payload } = variables;
      return productService.createProductReview(productId, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: { productId: string | number } & Record<string, any>) => {
      const { productId, ...payload } = variables;
      return productService.createProductRating(productId, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
};

export const useSingleProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getSingleProduct(id),
    enabled: !!id,
  });

export const useDeleteSingleProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.deleteSingleProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["products-by-category"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
  });
};

export const useGetAllProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: productService.getAllCategories,
  });

export const useGetSingleCategory = (categoryId) =>
  useQuery({
    queryKey: ["category", categoryId],
    queryFn: () => productService.getSingleCategory(categoryId),
    enabled: !!categoryId,
  });

export const useGetSizes = () =>
  useQuery({
    queryKey: ["sizes"],
    queryFn: productService.getSizes,
  });

export const useProductsBySize = (size) =>
  useQuery({
    queryKey: ["products-by-size", size],
    queryFn: () => productService.getProductsBySize(size),
    enabled: !!size,
  });

export const useProductsByCategory = (categoryId) =>
  useQuery({
    queryKey: ["products-by-category", categoryId],
    queryFn: () => productService.getProductsByCategory(categoryId),
    enabled: !!categoryId,
  });

export const useGetProductReviews = (id: string | number) =>
  useQuery({
    queryKey: ["product-reviews", id],
    queryFn: () => productService.getProductReviews(id),
    enabled: !!id,
  });

export const useGetProductRatings = (id: string | number) =>
  useQuery({
    queryKey: ["product-ratings", id],
    queryFn: () => productService.getProductReviews(id),
    enabled: !!id,
  });

export const useProductSaleStats = () => {
  return useQuery({
    queryKey: ["product-sale-stats"],
    queryFn: productService.getProductSalestats,
  });
};

// Search products mutation
export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => productService.searchProducts(searchTerm),
    enabled: !!searchTerm,
  });
};
