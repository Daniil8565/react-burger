export const API_URL = 'https://norma.nomoreparties.space/api/ingredients';
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
