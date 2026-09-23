import type {Review} from './review';

const reviews: Review[] = [
  {
    id: 1,
    theme: '크리쳐 - 신인류의 탄생',
    author: '김철수',
    rating: 5,
    content: '정말 재미있었어요! 스토리도 좋고 퍼즐도 적절했습니다.',
    createdAt: '2026. 3. 15.',
    status: 'active',
    isReported: false,
  },
  {
    id: 2,
    theme: '크리쳐 - 신인류의 탄생',
    author: '이영희',
    rating: 1,
    content: '욕설 및 부적절한 내용',
    createdAt: '2026. 3. 16.',
    status: 'active',
    isReported: true,
  },
  {
    id: 3,
    theme: '미드나잇 익스프레스',
    author: '박지성',
    rating: 4,
    content: '분위기가 정말 좋았어요. 난이도는 적당했습니다.',
    createdAt: '2026. 3. 17.',
    status: 'active',
    isReported: false,
  },
  {
    id: 4,
    theme: '셜록의 서재',
    author: '차민준',
    rating: 5,
    content: '(운영자에 의해 삭제된 후기 — 허위 사실 유포)',
    createdAt: '2026. 3. 15.',
    status: 'deleted',
    isReported: true,
  },
  {
    id: 5,
    theme: '크리쳐 - 신인류의 탄생',
    author: '익명유저99',
    rating: 5,
    content: '(스팸성 반복 게시물로 삭제 처리)',
    createdAt: '2026. 3. 15.',
    status: 'deleted',
    isReported: false,
  },
];

export {reviews};
