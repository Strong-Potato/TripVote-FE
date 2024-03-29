import {GoStarFill} from 'react-icons/go';
import {IoShareSocialOutline} from 'react-icons/io5';

import styles from './Title.module.scss';

import CustomToast from '@/components/CustomToast/CustomToast';
import TitleWishBtn from './TitleWishBtn/TitleWishBtn';

import {translateAreaCode, translateCategoryToStr} from '@/utils/translateSearchData';
import {useLocation} from 'react-router-dom';

interface TitleProps {
  id: number;
  areaCode: number;
  contentTypeId: number;
  title: string;
  rating: number;
  reviewsCount: number;
}

function Title({id, areaCode, contentTypeId, title, rating, reviewsCount}: TitleProps) {
  const showToast = CustomToast();

  const categoryStr = translateCategoryToStr(contentTypeId);
  const areaStr = translateAreaCode(areaCode);

  // 링크 복사
  const location = useLocation();

  const handleCopyClipBoard = async () => {
    try {
      console.log(location);
      await navigator.clipboard.writeText(`tripvote.site${location.pathname}`);
      showToast('링크가 복사되었습니다.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.container__header}>{title}</h2>
      <p className={styles.container__category}>
        {categoryStr}·{areaStr}
      </p>
      <div className={styles.container__alignCenter}>
        <GoStarFill className={styles.container__alignCenter__star} />
        <span className={styles.container__alignCenter__point}>{rating}</span>
        <span className={styles.container__alignCenter__reviewsCount}>{`(${
          reviewsCount ? reviewsCount : '리뷰 없음'
        })`}</span>
      </div>
      <div className={styles.container__positionAbsoluteIcons}>
        <TitleWishBtn placeId={id} contentTypeId={contentTypeId} size={'2.4rem'} />
        <IoShareSocialOutline fontSize='2.4rem' cursor='pointer' onClick={() => handleCopyClipBoard()} />
      </div>
    </div>
  );
}

export default Title;
