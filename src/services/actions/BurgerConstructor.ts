export const UPDATE_TYPE = 'UPDATE_TYPE';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const moveIngredient = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_INGREDIENT,
  dragIndex,
  hoverIndex,
});
