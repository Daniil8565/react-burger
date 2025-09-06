import {
  IOrderState,
  OrderAction,
  OrderActionTypes,
} from '../../types/OrderDetails';

export const initialState: IOrderState = {
  orderNumber: null,
  loading: false,
  error: false,
};

export const orderReducer = (
  state = initialState,
  action: OrderAction
): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.POST_ORDER_REQUEST:
      return { ...state, loading: true, error: false };

    case OrderActionTypes.POST_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orderNumber: action.payload,
      };

    case OrderActionTypes.POST_ORDER_FAILED:
      return { ...state, loading: false, error: true };

    case OrderActionTypes.CLEAR_ORDER:
      return { ...initialState };

    default:
      return state;
  }
};
