import { Idata } from './BurgerIngrediend';

export type IAction = {
  type: string;
  item: Idata;
  index?: number;
};
