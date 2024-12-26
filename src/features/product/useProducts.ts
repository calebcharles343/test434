// import { useQueryWithStatus } from "../../hooks/useQueryWithStatus";
// import { ProductType } from "../../interfaces";
// import { getAllProducts } from "../../services/apiProducts";

// export function useProducts() {
//   return useQueryWithStatus<ProductType[]>(["products"], getAllProducts, {
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     select: (data) => data.data || [], // Ensure `data` matches the expected structure
//     onError: (error) => {
//       console.error("Failed to fetch products:", error);
//     },
//   });
// }
