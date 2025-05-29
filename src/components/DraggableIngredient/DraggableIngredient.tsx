import { useDrag } from 'react-dnd';
import { Idata } from '../../types/BurgerIngrediend';
import styles from './DraggableIngredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const DraggableIngredient = ({
  item,
  onClick,
}: {
  item: Idata;
  onClick: () => void;
}) => {
  const [{ isDrag }, dragRef] = useDrag({
    type: 'Ingredient',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const ref: unknown = dragRef;
  return (
    <div
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
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  );
};
