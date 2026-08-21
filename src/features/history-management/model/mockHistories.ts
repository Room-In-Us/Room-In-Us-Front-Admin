import type {HistoryRecord} from './history';

const histories: HistoryRecord[] = [
  {
    id: 1,
    target: 'store',
    item: '코드케이 강남점',
    action: 'create',
    editor: '박어드민',
    changedAt: '2026. 3. 16. 오전 10:00:00',
  },
  {
    id: 2,
    target: 'store',
    item: '키이스케이프 LOG_IN 1',
    action: 'update',
    editor: '이운영',
    changedAt: '2026. 3. 14. 오후 3:30:00',
  },
  {
    id: 3,
    target: 'store',
    item: '비트포비아 홍대점',
    action: 'create',
    editor: '관리자',
    changedAt: '2026. 3. 11. 오전 10:30:00',
  },
  {
    id: 4,
    target: 'store',
    item: '키이스케이프 LOG_IN 1',
    action: 'create',
    editor: '관리자',
    changedAt: '2026. 3. 10. 오전 9:00:00',
  },
  {
    id: 5,
    target: 'theme',
    item: '셜록의 서재',
    action: 'create',
    editor: '최매니저',
    changedAt: '2026. 3. 18. 오전 11:10:00',
  },
  {
    id: 6,
    target: 'theme',
    item: '저주받은 인형',
    action: 'create',
    editor: '관리자',
    changedAt: '2026. 3. 17. 오후 1:20:00',
  },
  {
    id: 7,
    target: 'theme',
    item: '미드나잇 익스프레스',
    action: 'create',
    editor: '관리자',
    changedAt: '2026. 3. 15. 오전 9:45:00',
  },
  {
    id: 8,
    target: 'theme',
    item: '크리쳐 - 신인류의 탄생',
    action: 'update',
    editor: '관리자',
    changedAt: '2026. 3. 13. 오전 11:15:00',
  },
  {
    id: 9,
    target: 'theme',
    item: '크리쳐 - 신인류의 탄생',
    action: 'create',
    editor: '관리자',
    changedAt: '2026. 3. 12. 오후 2:20:00',
  },
];

export {histories};
