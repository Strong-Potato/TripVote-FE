import {CiEdit} from 'react-icons/ci';
import {GoStarFill} from 'react-icons/go';
import {useSetRecoilState} from 'recoil';

import styles from './Reviews.module.scss';

import Review from '@/components/Detail/Contents/Review/Review';

import {isModalOpenState, modalContentState} from '@/recoil/vote/alertModal';

import {ContentsReviewsProps} from '@/types/detail';
import ObserveTarget from '@/components/Route/ObserveTarget/ObserveTarget';
import {Cookies} from 'react-cookie';
import {useNavigate} from 'react-router-dom';
// 무한 스크롤 구현 필요
function Reviews({onOpen, reviewsRating, reviews, hasNextData, inViewRef}: ContentsReviewsProps) {
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const setModalContent = useSetRecoilState(modalContentState);

  const cookies = new Cookies();
  const isLogin = cookies.get('isLogin');
  const navigate = useNavigate();

  const notLoginContent = {
    title: '로그인이 필요한 기능입니다.',
    subText: '로그인하고 모든 서비스를 이용해 보세요! ',
    cancelText: '닫기',
    actionButton: '로그인하기',
    isSmallSize: true,
    onClickAction: () => {
      setIsModalOpen(false);
      navigate('/auth/login');
    },
  };

  const showNotLoginModal = () => {
    setIsModalOpen(true);
    setModalContent({...notLoginContent});
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__title}>
        <h3>리뷰</h3>
        <button
          className={styles.container__title__rightBox}
          onClick={() => {
            if (isLogin) {
              onOpen();
            } else {
              showNotLoginModal();
            }
          }}
        >
          <CiEdit fontSize='24px' />
          <span>리뷰쓰기</span>
        </button>
      </div>
      <div className={styles.container__pointBox}>
        <GoStarFill className={styles.container__pointBox__star} />
        <span className={styles.container__pointBox__point}>{reviewsRating.rating}</span>
        <span className={styles.container__pointBox__reviewsCount}>{`(${
          reviewsRating.userRatingCount ? reviewsRating.userRatingCount : '리뷰 없음'
        })`}</span>
      </div>
      <div className={styles.container__reviewsBox}>
        {reviews.length > 0 ? (
          reviews.map((data, i) => (
            <Review
              key={`review_${i}`}
              profileImage={data.profileImage}
              name={data.nickname}
              isGoogle={data.isGoogle}
              rating={data.rating}
              visitedAt={data.visitedAt}
              content={data.content}
              images={data.images}
            />
          ))
        ) : (
          <div className={styles.container__reviewsBox__notReviews}>리뷰가 아직 없습니다.</div>
        )}
      </div>
      {hasNextData && <ObserveTarget inViewRef={inViewRef} />}
    </div>
  );
}

export default Reviews;
