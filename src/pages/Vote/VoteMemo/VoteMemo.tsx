import {Button} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import styles from './VoteMemo.module.scss';

import useGetSelectedArray from '@/hooks/useGetSelectedArray';
import {useGetVotesInfo} from '@/hooks/Votes/vote';

import BottomSlide from '@/components/BottomSlide/BottomSlide';
import AddCandidate from '@/components/Vote/VoteBottomSlideContent/AddCandidate/AddCandidate';
import VoteHeader from '@/components/Vote/VoteHeader/VoteHeader';
import MemoContent from '@/components/VoteMemo/MemoContent';

import {isBottomSlideOpenState} from '@/recoil/vote/bottomSlide';
import {selectedTaglineState} from '@/recoil/vote/voteMemo';

import {TaglineType} from '@/types/vote';
// import { selectedPlaceState } from '@/recoil/vote/selectPlace';

const VoteMemo = () => {
  const {id: voteId} = useParams();
  const {data: voteInfo} = useGetVotesInfo(Number(voteId));
  // const navigate = useNavigate();
  const [isBTOpen, setIsBTOpen] = useRecoilState(isBottomSlideOpenState);
  const [selectedTagline, setSelectedTagline] = useRecoilState(selectedTaglineState);
  // const [selectedPlaces,SetSelectedPlaces] = useRecoilState(selectedPlaceState);
  const {toggleItemInNewArray} = useGetSelectedArray(selectedTaglineState);

  const getExistingTaglines = localStorage.getItem('recoil-persist');

  const setInitializeTagline = () => {
    setSelectedTagline(voteInfo.candidates.map(({placeInfo}) => ({placeId: placeInfo.placeId, tagline: ''})));
  };

  const setExistingTagline = () => {
    const existingTaglines: TaglineType[] = getExistingTaglines && JSON.parse(getExistingTaglines).selectedTaglineState;

    const nonExistPlaceIds = voteInfo.candidates
      .map(({placeInfo}) => placeInfo.placeId)
      .filter((placeId) => !existingTaglines.some((tagline) => tagline.placeId === placeId));

    nonExistPlaceIds.map((placeId) => ({placeId, tagline: ''})).forEach((tagline) => toggleItemInNewArray(tagline));
  };

  useEffect(() => {
    if (getExistingTaglines) {
      setExistingTagline();
    } else {
      setInitializeTagline();
    }
  }, []);

  const handleAddCandidates = () => {
    console.log('최종 내용 : ', selectedTagline);
    localStorage.removeItem('recoil-persist');
    //navigate(`/votes/${voteInfo.id}`)
  };

  return (
    <div className={styles.container}>
      <VoteHeader title={voteInfo.title} onBottomSlideOpen={() => setIsBTOpen(true)} />
      <MemoContent data={voteInfo} />

      <Button variant='CTAButton' isDisabled={selectedTagline.length === 0} onClick={handleAddCandidates}>
        {selectedTagline.length}개 후보 등록하기
      </Button>

      <BottomSlide isOpen={isBTOpen} onClose={() => setIsBTOpen(false)} children={<AddCandidate />} />
    </div>
  );
};

export default VoteMemo;
