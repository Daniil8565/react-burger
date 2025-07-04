export interface IOrderState {
  orderNumber: number | null;
  loading: boolean;
  error: boolean;
}

export enum OrderActionTypes {
  POST_ORDER_REQUEST = 'POST_ORDER_REQUEST',
  POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS',
  POST_ORDER_FAILED = 'POST_ORDER_FAILED',
  CLEAR_ORDER = 'CLEAR_ORDER',
}

interface PostOrderRequestAction {
  type: OrderActionTypes.POST_ORDER_REQUEST;
}

interface PostOrderSuccessAction {
  type: OrderActionTypes.POST_ORDER_SUCCESS;
  payload: number;
}

interface PostOrderFailedAction {
  type: OrderActionTypes.POST_ORDER_FAILED;
}

interface ClearOrderAction {
  type: OrderActionTypes.CLEAR_ORDER;
}

export type OrderAction =
  | PostOrderRequestAction
  | PostOrderSuccessAction
  | PostOrderFailedAction
  | ClearOrderAction;
