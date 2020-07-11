


export interface OrderDetails {
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
  payment?: string;
  additionalInfo?: string;
}

export interface CheckOutOrderType {
  // orderItems: CartPayload[],
  totalPrice: number
}

export interface OrderCreate {
  loading: boolean;
  order?: Order[];
  success?: boolean;
}
export interface OrderDelete {
  loading: boolean;
  order?: Order[];
  success?: boolean;
}

export interface OrderItem {
  imageUrl: string;
  itemName: string;
  price: number;
  qty: number;
  _id: string;
}

export interface Order {
  _id: string;
  user: string;
  createdAt: Date;
  isDelivered: boolean;
  isPaid: boolean;
  orderItems: OrderItem[];
  totalPrice: number;
  updatedAt: string;
}
