import {useState} from 'react';
import {IoMdCheckmark} from 'react-icons/io';
import {useRecoilState} from 'recoil';

import styles from './RegistrationListItem.module.scss';

import {useGetVotesInfo} from '@/hooks/Votes/vote';

import {isRegistrationSelectedState} from '@/recoil/detail/detail';

import {RegistrationListItemProps} from '@/types/detail';
import {CandidatesInfo} from '@/types/vote';

// 투표리스트 item id값으로 title을 대체해야 함
function RegistrationListItem({voteId, placeId, title}: RegistrationListItemProps) {
  const [isValuedArray, setIsValuedArray] = useRecoilState<number[]>(isRegistrationSelectedState);
  const [isSelected, setIsSelected] = useState<boolean>(isValuedArray.includes(voteId));

  const data = useGetVotesInfo(voteId);

  const voteInfo = data?.data?.data;

  const voteCandidate: CandidatesInfo[] | undefined = voteInfo?.candidates;

  console.log(voteCandidate, 'voteCandidates');

  const checkCandidate = voteCandidate ? voteCandidate.filter((data) => data.placeInfo.placeId === placeId) : [];

  return (
    <div
      className={`${styles.container} ${checkCandidate.length === 0 && isSelected ? styles.selected : ''}
      ${checkCandidate.length > 0 ? styles.isSelectedProps : ''}`}
      onClick={() => {
        if (checkCandidate.length === 0) {
          if (!isValuedArray.includes(voteId)) {
            setIsValuedArray([...isValuedArray, voteId]);
          } else {
            const arr = [...isValuedArray];
            arr.splice(isValuedArray.indexOf(voteId), 1);

            setIsValuedArray([...arr]);
          }

          setIsSelected(!isSelected);
        }
      }}
    >
      <span>{title}</span>
      {checkCandidate.length > 0 ? (
        <span className={styles.container__isSelected}>이미 등록됨</span>
      ) : (
        <IoMdCheckmark fontSize='2.4rem' />
      )}
    </div>
  );
}

export default RegistrationListItem;
