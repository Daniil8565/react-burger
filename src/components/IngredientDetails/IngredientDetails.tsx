import React from 'react';
import { Idata } from '../../types/BurgerIngrediend';
import styles from './IngredientDetails.module.css';

type IngredientDetailsProps = {
  item: Idata;
};

const IngredientDetails: React.FC<IngredientDetailsProps> = ({ item }) => {
  return (
    <div className={styles.contentModal}>
      <img src={item.image_large} alt={item.name} className={styles.image} />
      <p className={`text text_type_digits-default ${styles.title}`}>
        {item.name}
      </p>
      <div className={styles.containerDataIngredient}>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.calories}
          </p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.proteins}
          </p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.fat}
          </p>
        </div>
        <div className={styles.nutritionItem}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {item.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
