import {Link} from 'react-router-dom';

import styles from './MapItem.module.scss';

import WishBtn from '@/components/WishBtn/WishBtn';

import nullImg from '@/assets/homeIcons/search/nullImg.svg';
import areas from '@/utils/areas.json';
import {translateCategoryToStr} from '@/utils/translateSearchData';

import {SearchItemType} from '@/types/home';

interface PropsType {
  data: SearchItemType;
  categoryChange: boolean;
}

function MapItem({data, categoryChange}: PropsType) {
  const location = areas.filter((area) => area.areaCode === data.location.areaCode)[0].name;
  const category = translateCategoryToStr(data.contentTypeId);
  const imgSrc = data.thumbnail ? data.thumbnail : nullImg;

  return (
    <Link to={`/detail/${data.id} ${data.contentTypeId}?title=${data.title}`} className={styles.container}>
      <img
        src={imgSrc}
        alt={`${data.title}의 사진`}
        style={{opacity: categoryChange ? 0 : 1, padding: data.thumbnail ? 0 : '30px'}}
      />
      <p className={styles.text} style={{opacity: categoryChange ? 0 : 1}}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.info}>
          {category}·{location}
        </span>
      </p>
      <WishBtn contentTypeId={data.contentTypeId} placeId={data.id} className={styles.wishBtn} />
    </Link>
  );
}

export default MapItem;
