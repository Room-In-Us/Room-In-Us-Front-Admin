import type {Review} from './review';

const reviews: Review[] = [
  {
    id: 1,
    theme: '크리쳐 - 신인류의 탄생',
    author: '김철수',
    rating: 5,
    content: '정말 재미있었어요! 스토리도 좋고 퍼즐도 적절했습니다.',
    createdAt: '2026. 3. 15.',
    status: 'normal',
  },
  {
    id: 2,
    theme: '크리쳐 - 신인류의 탄생',
    author: '이영희',
    rating: 1,
    content: '욕설 및 부적절한 내용',
    createdAt: '2026. 3. 16.',
    status: 'reported',
  },
  {
    id: 3,
    theme: '미드나잇 익스프레스',
    author: '박지성',
    rating: 4,
    content: '분위기가 정말 좋았어요. 난이도는 적당했습니다.',
    createdAt: '2026. 3. 17.',
    status: 'normal',
  },
  {
    id: 4,
    theme: '저주받은 인형',
    author: '최민수',
    rating: 5,
    content: '공포 테마 좋아하시면 강추! 진짜 무서워요',
    createdAt: '2026. 3. 18.',
    status: 'normal',
  },
];

export {reviews};
