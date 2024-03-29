import {useState} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {IoMdMenu as MoveIcon} from 'react-icons/io';
import {RiCheckboxCircleFill as SelectedIcon} from 'react-icons/ri';
import {RiCheckboxBlankCircleLine as UnselectedIcon} from 'react-icons/ri';
import {useNavigate} from 'react-router-dom';

import styles from '../PlaceCard/PlaceCard.module.scss';

import titleCaseChange from '@/utils/titleCaseChange';

import {Item} from '@/types/route';
import {DraggablePlaceCardProps} from '@/types/route';

function PlaceCard({
  journeyId,
  selectedId,
  order,
  name,
  category,
  address,
  contentTypeId,
  placeId,
  editMode,
  onSelect,
  moveCard,
  findCard,
}: DraggablePlaceCardProps) {
  const [isChecked, setIsChecked] = useState(false);
  const originalIndex = findCard(selectedId)?.index;
  const navigate = useNavigate();

  const [, drag, preview] = useDrag(
    () => ({
      type: 'CARD',
      item: {selectedId, originalIndex},
      canDrag: () => !isChecked && editMode,
      end: (item, monitor) => {
        const {selectedId: droppedId, originalIndex} = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveCard(droppedId, originalIndex);
        }
      },
    }),
    [selectedId, originalIndex, moveCard, editMode, isChecked],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'CARD',
      hover({selectedId: draggedId}: Item) {
        if (draggedId !== selectedId) {
          const {index: overIndex} = findCard(selectedId) || {};
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard],
  );

  const handleSelect = () => {
    setIsChecked(!isChecked);
    onSelect(journeyId, selectedId, placeId);
  };

  return (
    <div ref={preview} className={styles.cardContainer}>
      <button onClick={handleSelect}>
        {editMode &&
          (isChecked ? (
            <SelectedIcon size='2.4rem' color='#2388FF' />
          ) : (
            <UnselectedIcon size='2.4rem' color='#CDCFD0' />
          ))}
      </button>

      <div className={styles.placeInformationContainer} onClick={() => navigate(`/detail/${placeId} ${contentTypeId}`)}>
        {!editMode && <div className={styles.numberContainer}>{order}</div>}
        <div className={styles.placeContainer}>
          {editMode && <div className={styles.numberContainer}>{order}</div>}
          <div className={styles.placeInformation}>
            <h1>{titleCaseChange(name)}</h1>
            <h2>{category}</h2>
            <p>{address}</p>
          </div>
        </div>
      </div>
      <div ref={(node) => drag(drop(node))} className={styles.moveButton}>
        {editMode && <MoveIcon size='2.4rem' color='#CDCFD0' />}
      </div>
    </div>
  );
}

export default PlaceCard;
