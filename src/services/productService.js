import { sendRequest } from "@/services/sendingRequests";

// GET /products/:id
export const getSingleProduct = async (id) => {
  const response = await sendRequest({
    method: "GET",
    url: `/products/${id}`,
  });
  return response.data;
};

// GET /categories
export const getAllCategories = async () => {
  const response = await sendRequest({
    method: "GET",
    url: "/products/categories",
  });
  return response.data.data;
};

// GET /products
export const getAllProducts = async () => {
  const response = await sendRequest({
    method: "GET",
    url: "/products/all",
  });
  return response.data;
};

// GET /products/sizes
export const getSizes = async () => {
  const response = await sendRequest({
    method: "GET",
    url: "/products/sizes",
  });
  return response.data;
};

// GET /products/size/:size
export const getProductsBySize = async (size) => {
  const response = await sendRequest({
    method: "GET",
    url: `/products/size/${size}`,
  });
  return response.data;
};

// GET /products/category/:categoryName
export const getProductsByCategory = async (categoryName) => {
  const response = await sendRequest({
    method: "GET",
    url: `/products/category/${categoryName}`,
  });
  return response.data;
};

// GET /products/reviews/:id
export const getProductReviews = async (id) => {
  const response = await sendRequest({
    method: "GET",
    url: `/products/${id}/reviews`,
  });
  return response.data;
};

// POST /products/review
export const createProductReview = async (data) => {
  const response = await sendRequest({
    method: "POST",
    url: `/products/review`,
    data,
  });
  return response.data;
};

export const  getProductSalestats=async () =>{
  const response=await sendRequest({
    method:"GET",
    url: "/products/stats/overview",
  });
  return response.data
}


export const productService = {
  getSingleProduct,
  getAllCategories,
  getAllProducts,
  getSizes,
  getProductsBySize,
  getProductsByCategory,
  getProductReviews,
  createProductReview,
  getProductSalestats
};
