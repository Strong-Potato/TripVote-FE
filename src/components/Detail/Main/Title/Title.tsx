import {GoStarFill} from 'react-icons/go';
import {IoShareSocialOutline} from 'react-icons/io5';

import styles from './Title.module.scss';

import CustomToast from '@/components/CustomToast/CustomToast';
import WishBtn from '@/components/WishBtn/WishBtn';

import {translateCategoryToStr} from '@/utils/translateSearchData';

interface TitleProps {
  id: number;
  contentTypeId: number;
  title: string;
  rating: number;
  reviewsCount: number;
}

function Title({id, contentTypeId, title, rating, reviewsCount}: TitleProps) {
  const showToast = CustomToast();

  const categoryStr = translateCategoryToStr(contentTypeId);

  return (
    <div className={styles.container}>
      <h2 className={styles.container__header}>{title}</h2>
      <p className={styles.container__category}>{categoryStr}</p>
      <div className={styles.container__alignCenter}>
        <GoStarFill className={styles.container__alignCenter__star} />
        <span className={styles.container__alignCenter__point}>{rating}</span>
        <span className={styles.container__alignCenter__reviewsCount}>{`(${reviewsCount})`}</span>
      </div>
      <div className={styles.container__positionAbsoluteIcons}>
        <WishBtn placeId={id} contentTypeId={contentTypeId} size={'2.4rem'} />
        <IoShareSocialOutline
          fontSize='2.4rem'
          cursor='pointer'
          onClick={() => {
            showToast('링크가 복사되었습니다.');
          }}
        />
      </div>
    </div>
  );
}

export default Title;
