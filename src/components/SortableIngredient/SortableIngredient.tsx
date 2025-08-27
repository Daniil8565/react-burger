import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import {
  DELETE_INGREDIENT,
  moveIngredient,
} from '../../services/actions/BurgerConstructor';
import { IConstructorIngredient } from '../../types/BurgerIngrediend';
import styles from './SortableIngredient.module.css';

type Props = {
  ingredient: IConstructorIngredient;
  index: number;
  onRemove: () => void;
};

const SortableIngredient: React.FC<Props> = ({
  ingredient,
  index,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'sortable-ingredient',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      dispatch(moveIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'sortable-ingredient',
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={styles.burgerItem}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch({ type: DELETE_INGREDIENT, uuid: ingredient.uuid });
          onRemove();
        }}
      />
    </div>
  );
};

export default SortableIngredient;
