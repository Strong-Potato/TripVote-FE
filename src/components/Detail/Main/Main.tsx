import styles from './Main.module.scss';

import ImageSwiper from './ImageSwiper/Swiper';
import Title from './Title/Title';

interface MainProps {
  id: number;
  areaCode: number;
  contentTypeId: number;
  images: string[];
  title: string;
  rating: number;
  reviewsCount: number;
}

function Main({id, areaCode, contentTypeId, images, title, rating, reviewsCount}: MainProps) {
  return (
    <div className={styles.container}>
      <ImageSwiper images={images} />
      <Title
        id={id}
        areaCode={areaCode}
        contentTypeId={contentTypeId}
        title={title}
        rating={rating}
        reviewsCount={reviewsCount}
      />
    </div>
  );
}

export default Main;
