import axios from 'axios';
import {http, HttpResponse} from 'msw';
import {Dispatch} from 'react';

import {VoteInfo} from '@/types/vote';

const candidateData = [
  {
    id: 111,
    placeId: 11111,
    placeName: '기역호텔',
    imageURL: 'https://m.eejmall.com/web/product/big/201708/211_shop1_627935.jpg',
    category: '숙박',
    location: '서울',
    voteUserId: ['Id123', 'Id234', 'Id345'],
    tagline: '예쁨~~~~~~~~~',
    amIVoted: true,
    latlng: {lat: 33.450705, lng: 126.570677},
  },
  {
    id: 222,
    placeId: 22222,
    placeName: '니은펜션',
    imageURL: 'https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159355_1.jpg',
    category: '숙박',
    location: '경기',
    voteUserId: ['Id123', 'Id345'],
    tagline: '여기 개쩔드라',
    amIVoted: false,
    latlng: {lat: 33.450936, lng: 126.569477},
  },
  {
    id: 333,
    placeId: 33333,
    placeName: '기역호텔',
    imageURL: 'https://m.eejmall.com/web/product/big/201708/211_shop1_627935.jpg',
    category: '숙박',
    location: '서울',
    voteUserId: ['Id123', 'Id234', 'Id345'],
    tagline: '예쁨~~~~~~~~~',
    amIVoted: true,
    latlng: {lat: 33.450879, lng: 126.56994},
  },
  {
    id: 444,
    placeId: 44444,
    placeName: '니은펜션',
    imageURL: 'https://img-cf.kurly.com/shop/data/goodsview/20210218/gv30000159355_1.jpg',
    category: '숙박',
    location: '경기',
    voteUserId: ['Id123', 'Id345'],
    tagline: '여기 개쩔드라',
    amIVoted: false,
    latlng: {lat: 33.451393, lng: 126.570738},
  },
];

const voteListData = [
  {
    voteId: '11',
    title: '호텔은 여기어때',
    voteStatus: '진행 중',
    ownerProfile: {
      id: '2022',
      profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
    },
    votedMemberProfiles: [
      {
        id: 2323,
        nickName: '제니',
        profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
      },
      {
        id: 3333,
        nickName: '리사',
        profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
      },
    ],
  },
  {
    voteId: '22',
    title: '카페 고르자',
    voteStatus: '결정완료',
    ownerProfile: {
      id: '1996',
      profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
    },
    votedMemberProfiles: [
      {
        id: 2323,
        nickName: '제니',
        profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
      },
      {
        id: 3333,
        nickName: '리사',
        profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
      },
    ],
  },
];

const voteData = {
  id: '11',
  title: '호텔은 여기어때',
  ownerProfile: {
    id: '1996',
    profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
  },
  votedMemberProfiles: [
    {
      id: 2323,
      nickName: '제니',
      profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
    },
    {
      id: 3333,
      nickName: '리사',
      profile: 'https://avatars.githubusercontent.com/u/154430298?s=48&v=4',
    },
  ],
  voteStatus: '진행 중',
  voteUserId: ['Id123', 'Id234', 'Id345'],
  candidates: candidateData,
};

//const foundObject = voteListData.find((item) => item.id === targetId);

export const vote = [
  http.get('/api/votes/', () => {
    return HttpResponse.json(voteListData, {
      status: 200,
    });
  }),

  http.get(`/api/votes/11`, () => {
    return HttpResponse.json(voteData, {
      status: 200,
    });
  }),

  http.get(`/api/votes/22`, () => {
    return HttpResponse.json(voteData, {
      status: 200,
    });
  }),
];

export async function getVoteListData<T>(setter: Dispatch<React.SetStateAction<T>>) {
  try {
    const {data: res} = await axios.get('/api/votes/');
    setter(res);
  } catch (error) {
    console.error(error);
  }
}

export async function getVoteData<T>(id: string, setter: Dispatch<React.SetStateAction<T>>) {
  try {
    const {data: res} = await axios.get(`/api/votes/${id}`);
    setter(res);
  } catch (error) {
    console.error(error);
  }
}

//단일vote
export const getVoteInfo = async (voteId: string): Promise<VoteInfo> => {
  const response = await axios.get(`/api/votes/${voteId}`);
  return response.data;
};

//여러 vote in space
export const getVoteListInfo = async (spaceId: string) => {
  const response = await axios.get(`/api/votes/${spaceId}`);
  return response.data.data;
};
