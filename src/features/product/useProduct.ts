// import { useQueryWithStatus } from "../../hooks/useQueryWithStatus";
// import { ProductType } from "../../interfaces";
// import { getProduct } from "../../services/apiProducts";

// export function useProduct(id: number) {
//   return useQueryWithStatus<ProductType>(
//     ["product", id.toString()],
//     () => getProduct(id),
//     {
//       enabled: !!id,
//       select: (data) => data?.data,
//       onError: (error) => {
//         console.error(`Failed to fetch product ${id}:`, error);
//       },
//     }
//   );
// }
