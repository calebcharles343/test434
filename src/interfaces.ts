export interface HeadersType {
  authorization: string;
}

export interface UsersType {
  data: UserType[];
}

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

export interface PasswordResetTypes {
  password: string;
  confirm_password: string;
}
export interface PasswordForgotTypes {
  email: string;
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
  Reviews?: ReviewType[];
}

////////////////
//cart
////////////////

export interface CartType {
  items: ItemType[];
}
export interface ItemType {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice?: number; // Optional, calculated in the reducer
}

export interface OrderType {
  items: OrderItemType[];
}

export interface OrderItemType {
  productId: number;
  quantity: number;
}

////////////////
//Orders
////////////////

export type OrdersType = OrderType[];

export interface OrderType {
  id: number;
  userId: number;
  totalPrice: string;
  status: string;
  Items: OrderItemType[];
  User?: UserType;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemType {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  pricePerItem: string;
  Product: ProductType;
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

export interface ReviewsType {
  Reviews: ReviewType[];
}
export interface ReviewType {
  id?: number;
  productId?: number;
  review: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
  User?: Partial<UserType>;
}

export interface CheckboxProps {
  name?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
