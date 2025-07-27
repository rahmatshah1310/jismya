
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export const useCreateReview = () =>
  useMutation({ mutationFn: productService.createProductReview });


export const useSingleProduct = (id) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getSingleProduct(id),
    enabled: !!id,
  });

export const useGetAllProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: productService.getAllProducts,
  });


export const useGetAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: productService.getAllCategories,
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

export const useGetProductReviews = (id) =>
  useQuery({
    queryKey: ["product-reviews", id],
    queryFn: () => productService.getProductReviews(id),
    enabled: !!id,
  });


export const useProductSaleStats = () => {
  return useQuery({
    queryKey: ["product-sale-stats"],
    queryFn: productService.getProductSalestats,
  });
};