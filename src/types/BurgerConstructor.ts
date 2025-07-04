import { Idata } from './BurgerIngrediend';

export type IAction =
  | {
      type: 'UPDATE_TYPE';
      item: Idata;
    }
  | {
      type: 'DELETE_INGREDIENT';
      index: number;
    }
  | {
      type: 'MOVE_INGREDIENT';
      dragIndex: number;
      hoverIndex: number;
    };
