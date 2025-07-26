export interface IinitialStateBurgerIngredients {
  data: Idata[] | null;
  loading: boolean;
  error: boolean;
}

export type Idata = {
  _id: string;
  __v: number;
  type: string;
  proteins: number;
  price: number;
  name: string;
  image_mobile: string;
  image_large: string;
  image: string;
  fat: number;
  carbohydrates: number;
  calories: number;
};

export enum BurgerActionTypes {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  LOADING = 'LOADING',
}

interface FetchBurgerIngredient {
  type: BurgerActionTypes.LOADING;
}

interface FetchBurgerIngredientSuccess {
  type: BurgerActionTypes.SUCCESS;
  payload: any[];
}

interface FetchBurgerIngredientError {
  type: BurgerActionTypes.FAILED;
  payload: string;
}

export type BurgerAction =
  | FetchBurgerIngredient
  | FetchBurgerIngredientSuccess
  | FetchBurgerIngredientError;
