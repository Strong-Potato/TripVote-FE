import {http, HttpResponse} from 'msw';

const mySpaces = {
  status: 200,
  message: 'SUCCESS',
  data: {
    spaces: [
      {
        id: 1,
        title: '감자깡 외 3명의 여행',
        startDate: '',
        endDate: '',
        city: '여행 스페이스 1 (여행스페이스 미정)',
        dueDate: 0,
        thumbnail: '',
        members: [
          {
            id: 12,
            nickname: '감자깡',
            profile: '',
          },
          {
            id: 14,
            nickname: '새우깡',
            profile: '',
          },
          {
            id: 15,
            nickname: '옥수수깡',
            profile: '',
          },
          {
            id: 16,
            nickname: '고구마깡',
            profile: '',
          },
        ],
      },
      {
        id: 2,
        title: '감자깡 외 2명의 여행',
        startDate: '2024-1-17',
        endDate: '2024-1-19',
        city: '강릉, 속초, 전주, 여수 여행',
        dueDate: 3,
        thumbnail: '',
        members: [
          {
            id: 12,
            nickname: '감자깡',
            profile: '',
          },
          {
            id: 14,
            nickname: '새우깡',
            profile: '',
          },
          {
            id: 15,
            nickname: '옥수수깡',
            profile: '',
          },
        ],
      },
      {
        id: 3,
        title: '감자깡 외 1명의 여행',
        startDate: '2024-1-17',
        endDate: '2024-1-19',
        city: '강릉, 속초, 전주, 여수 여행',
        dueDate: 3,
        thumbnail: '',
        members: [
          {
            id: 12,
            nickname: '감자깡',
            profile: '',
          },
          {
            id: 14,
            nickname: '새우깡',
            profile: '',
          },
        ],
      },
      {
        id: 4,
        title: '감자깡의 여행',
        startDate: '2024-1-17',
        endDate: '2024-1-19',
        city: '강릉, 속초, 전주, 여수 여행',
        dueDate: 3,
        thumbnail: '',
        members: [
          {
            id: 12,
            nickname: '감자깡',
            profile: '',
          },
        ],
      },
    ],
    pageNumber: 0,
    pageSize: 20,
    totalPages: 0,
    totalResult: 0,
    first: true,
    last: true,
  },
};

const myInfo = {
  status: 200,
  message: 'SUCCESS',
  data: {
    nickname: '김철수',
    profile: '',
    provider: 'KAKAO',
  },
};

const newSpaceId = {
  status: 200,
  message: 'SUCCESS',
  data: {
    id: 12,
    title: '옥수수깡의 여행',
    startDate: '2024-01-23',
    endDate: '2024-01-25',
    city: '강릉, 속초, 전주, 여수 여행',
    thumbnail: 'https://wwww.test.com',
    members: [
      {
        id: 0,
        nickname: '고구마깡',
        profile: 'https://wwww.test.com',
      },
    ],
  },
};

export const sidebar = [
  http.get('/api/members/my-spaces/upcoming', () => {
    return HttpResponse.json(mySpaces, {
      status: 200,
    });
  }),

  http.post('/api/spaces', () => {
    return HttpResponse.json(newSpaceId, {
      status: 200,
    });
  }),

  http.get('/api/members/my-info', () => {
    return HttpResponse.json(myInfo, {
      status: 200,
    });
  }),
];
