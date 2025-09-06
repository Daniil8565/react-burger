import { useDrag, DragPreviewImage } from 'react-dnd';
import { Idata } from '../../types/BurgerIngrediend';
import styles from './DraggableIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const DraggableIngredient = ({
  item,
  count,
  onClick,
}: {
  item: Idata;
  count: number;
  onClick: () => void;
}) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: 'Ingredient',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const ref: unknown = dragRef;
  return (
    <>
      <DragPreviewImage connect={preview} src={item.image} />
      <div
        data-cy={`ingredient-${item.type}`}
        className={styles.BurgerItem}
        onClick={onClick}
        ref={ref as React.Ref<HTMLDivElement> | undefined}
      >
        <img src={item.image} alt={item.name} className={styles.image} />
        <div className={styles.container__price}>
          <p>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p>{item.name}</p>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
      </div>
    </>
  );
};
