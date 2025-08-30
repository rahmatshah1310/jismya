import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "../../services/productService";

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
    mutationFn: ({ id, data }) => productService.updateProduct(id, data),
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
    mutationFn: ({ id, data }) => productService.updateProductOrder(id, data),
  });

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, ...data }) => productService.createProductReview(productId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
};

export const useCreateRating = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, ...data }) => productService.createProductRating(productId, data),
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

export const useProductsByCategory = (categoryName) =>
  useQuery({
    queryKey: ["products-by-category", categoryName],
    queryFn: () => productService.getProductsByCategory(categoryName),
    enabled: !!categoryName,
  });

export const useGetProductReviews = (id) => {
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["product-reviews", id],
    queryFn: () => productService.getProductReviews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    enabled: !!id,
  });
};

export const useGetProductRatings = (id) => {
  const queryClient = useQueryClient();
  useQuery({
    queryKey: ["product-ratings", id],
    queryFn: () => productService.getProductRatings(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    enabled: !!id,
  });
};

export const useProductSaleStats = () => {
  return useQuery({
    queryKey: ["product-sale-stats"],
    queryFn: productService.getProductSalestats,
  });
};
