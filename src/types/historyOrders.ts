// types.ts
export type Ingredient = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  // ...другие поля
};

export type OrderStatus = 'created' | 'pending' | 'done' | 'cancelled' | string;

export type Order = {
  ingredients: string[]; // array of ingredient ids
  _id: string;
  status: OrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  // computed field (optionally) totalPrice?: number;
};

export type OrdersSocketResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};
