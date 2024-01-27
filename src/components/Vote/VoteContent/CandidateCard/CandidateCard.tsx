import {useEffect, useState} from 'react';
import {FaRegStar, FaStar} from 'react-icons/fa';
import {useNavigate, useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';

import styles from './CandidateCard.module.scss';

import {usePostVoting} from '@/hooks/Votes/vote';

import nullImg from '@/assets/homeIcons/search/nullImg.svg';
import FirstIcon from '@/assets/voteIcons/rank_1.svg?react';
import SecondIcon from '@/assets/voteIcons/rank_2.svg?react';
import ThirdIcon from '@/assets/voteIcons/rank_3.svg?react';
import AddDayIcon from '@/assets/voteIcons/vote_addDay.svg?react';
import {isCandidateSelectingState} from '@/recoil/vote/alertModal';
import {translateAreaCode, translateCategoryName} from '@/utils/translateSearchData';

import AddToJourney from '../../VoteBottomSlideContent/AddToJourney/AddToJourney';
import VotedUserList from '../../VoteBottomSlideContent/VotedUserList/VotedUserList';

import {CandidateCardProps, ResultCandidatesInfo} from '@/types/vote';

const CandidateCard = ({onBottomSlideOpen, candidate, isMapStyle, showResults}: CandidateCardProps) => {
  const navigate = useNavigate();
  // const [isVoted, setIsVoted] = useState(false);
  const [starIcon, setStarIcon] = useState(<FaRegStar />);
  const isCandidateSelecting = useRecoilValue(isCandidateSelectingState);
  const {id: voteId} = useParams();
  const votingMutation = usePostVoting();
  const placeInfo = candidate.placeInfo;
  const imgSrc = placeInfo.placeImageUrl ? placeInfo.placeImageUrl : nullImg;

  useEffect(() => {
    if (candidate.amIVote) {
      setStarIcon(<FaStar style={{color: '#fee500'}} />);
    } else if (isMapStyle) {
      setStarIcon(<FaStar style={{color: '#e3e5e5'}} />);
    } else if (!candidate.amIVote) {
      setStarIcon(<FaRegStar />);
    }
  }, [isMapStyle, candidate.amIVote, candidate]);

  const getRankClassName = (rank: number) => {
    switch (rank) {
      case 1:
        return styles.firstBorder;
      case 2:
        return styles.secondBorder;
      case 3:
        return styles.thirdBorder;
      default:
        return '';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return FirstIcon;
      case 2:
        return SecondIcon;
      case 3:
        return ThirdIcon;
      default:
        return null;
    }
  };

  const rankClassName = candidate.rank && getRankClassName(candidate.rank);
  const RankIcon = candidate.rank && getRankIcon(candidate.rank);

  const onVoteBoxClick = async () => {
    if (showResults && onBottomSlideOpen) {
      onBottomSlideOpen(<VotedUserList />);
    } else {
      await votingMutation.mutateAsync({voteId: Number(voteId), candidateId: candidate.id});
    }
  };

  return (
    <div className={`${styles.container} ${rankClassName} candidateCard ${isMapStyle ? styles.isMapStyle : ''}`}>
      <img className={styles.placeImg} src={imgSrc} alt={placeInfo.placeName} />
      {RankIcon && (
        <div className={styles.rankTag}>
          <RankIcon />
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.main__contextBox}>
          <button
            className={styles.main__contextBox__name}
            onClick={() => navigate(`/detail/${candidate.id}`)}
            disabled={isCandidateSelecting}
          >
            {placeInfo.placeName.length >= 10 ? placeInfo.placeName.slice(0, 10) + ' ⋯' : placeInfo.placeName}
          </button>

          <div className={styles.main__contextBox__category}>
            {translateCategoryName(placeInfo.category)}
            {'ꞏ'}
            {translateAreaCode(parseInt(placeInfo.areaCode))}
          </div>

          {/* 일정 담기
          날짜를 담고 있어야 함
          없 : 토스트
          있 : 바텀시트 -> 일정 추가api -> 시트close, 완료 토스트
          */}

          {showResults && onBottomSlideOpen && (
            <button onClick={() => onBottomSlideOpen(<AddToJourney />)} className={styles.main__contextBox__addDay}>
              <AddDayIcon /> 일정에 담기
            </button>
          )}
        </div>
        <button
          className={`${styles.main__voteBox} ${isCandidateSelecting && styles.isCandidateSelecting}`}
          onClick={onVoteBoxClick}
          disabled={isCandidateSelecting || isMapStyle || isCandidateSelecting}
        >
          <div className={styles.main__voteBox__star}>{starIcon}</div>
          <div className={styles.main__voteBox__vote}>
            {showResults ? (candidate as ResultCandidatesInfo).voteCount : '투표'}
          </div>
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
