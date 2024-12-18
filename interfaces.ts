export interface UserProfileToken {
  data: Root;
}
export interface useUserType {
  data: UserType | undefined;
  message?: string | undefined;
  status?: 200 | undefined;
}

export interface UserProfile {
  email: string;
  password: string;
}

export interface Root {
  token: string;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  created_at: string;
  active: boolean;
  password_changed_at: any;
  password_reset_token: any;
  password_reset_expires: any;
}
export interface UpdateUserType {
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

////////////////
//Product
////////////////

export interface ProductsType {
  data: ProductType[];
}

export interface ProductType {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  avatar: string;
  stock: number;
  ratingCount: number;
  ratingAverage: number;
  createdAt: string;
  updatedAt: string;
}

////////////////
//cart
////////////////

export interface CartType {
  items: ItemType[];
}
export interface ItemType {
  productId: number | string;
  name: string;
  price: number;
  quantity: number;
  totalPrice?: number; // Optional, calculated in the reducer
}

export interface OrderType {
  items: OrderItemType[];
}

export interface OrderItemType {
  productId: number | string;
  quantity: number | string;
}
////////////////
//images
////////////////
export interface Imagedata {
  data: ImageUrls;
}
export interface ImageUrls {
  urls: { url: string; key: string }[]; // Define the expected structure of your response
}

export interface ErrorProps {
  children: React.ReactNode;
}

export interface ImageProps {
  url: { url: string; key: string };
  refetch: () => void;
}

//useMutation
export interface Mutation {
  isLoading: boolean;
  error: string | null;
}

//useQuery
export interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string;
}

export interface Headers {
  [key: string]: string;
}
