import {Link, useSearchParams} from 'react-router-dom';

import styles from './WishItem.module.scss';

import SelectButton from '@/components/ButtonsInAddingCandidate/SelectButton/SelectButton';

import nullImg from '@/assets/homeIcons/search/nullImg.svg';
import areas from '@/utils/areas.json';
import titleCaseChange from '@/utils/titleCaseChange';
import {translateCategoryToStr} from '@/utils/translateSearchData';

import WishBtn from '../WishBtn/WishBtn';

import {SearchItemType} from '@/types/home';
import {WishFilterType} from '@/types/wish';

interface PropsType {
  filter: WishFilterType;
  data: SearchItemType;
  categoryChange: boolean;
}

function WishItem({filter, data, categoryChange}: PropsType) {
  const title = titleCaseChange(data.title);
  const location = areas.filter((area) => area.areaCode === data.location.areaCode)[0].name;
  const category = translateCategoryToStr(data.contentTypeId);
  const imgSrc = data.thumbnail ? data.thumbnail : nullImg;
  const [searchPrams] = useSearchParams();
  const tripId = searchPrams.get('placeID');
  const journyId = searchPrams.get('tripDate')?.split(' ')[1];
  const path = searchPrams.get('tripDate')?.split(' ')[0];
  const detailLink =
    path === 'trip'
      ? `/detail/${data.id} ${data.contentTypeId}?title=${data.title}&tripId=${tripId}&journyId=${journyId}`
      : `/detail/${data.id} ${data.contentTypeId}?title=${data.title}`;

  return (
    <Link to={detailLink} className={styles.container}>
      <div className={styles.itemBox}>
        <img
          src={imgSrc}
          alt={`${data.title}의 사진`}
          style={{opacity: categoryChange ? 0 : 1, padding: data.thumbnail ? 0 : '12px'}}
        />
        <p className={styles.text} style={{opacity: categoryChange ? 0 : 1}}>
          <span className={styles.title}>{title}</span>
          <span className={styles.info}>
            {category}·{location}
          </span>
        </p>
      </div>
      {filter.placeID === 'undefined' ? (
        <WishBtn placeId={data.id} contentTypeId={32} size='2rem' />
      ) : (
        <SelectButton data={data} />
      )}
    </Link>
  );
}

export default WishItem;
