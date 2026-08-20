import type {Store} from './store';

const mockStoreSeeds = [
  {
    name: '키이스케이프 LOG_IN 1',
    address: '서울 강남구 강남대로98길 16 파빌리온빌딩 4층',
    station: '강남역',
    status: 'operating',
  },
  {
    name: '비트포비아 홍대점',
    address: '서울 마포구 양화로 160 비트포비아',
    station: '합정역',
    status: 'operating',
  },
  {
    name: '코드케이 강남점',
    address: '서울 강남구 테헤란로 123',
    station: '선릉역',
    status: 'operating',
  },
  {
    name: '넥스트에디션 신촌점',
    address: '서울 서대문구 신촌 88',
    station: '신촌역',
    status: 'operating',
  },
  {
    name: '마스터키 홍대점',
    address: '서울 마포구 어울마당로 55',
    station: '홍대입구역',
    status: 'operating',
  },
  {
    name: '비밀의방 삼성점',
    address: '서울 강남구 봉은사로 524',
    station: '삼성역',
    status: 'operating',
  },
  {
    name: '제로월드 건대점',
    address: '서울 광진구 능동로 111',
    station: '건대입구역',
    status: 'closing',
  },
  {
    name: '어메이징 브레이킹 신림점',
    address: '서울 관악구 신림로 340',
    station: '신림역',
    status: 'closed',
  },
  {
    name: '리얼월드 이대점',
    address: '서울 서대문구 이화여대길 52',
    station: '이대역',
    status: 'operating',
  },
  {
    name: '셜록홈즈 대학로점',
    address: '서울 종로구 대학로 101',
    station: '혜화역',
    status: 'operating',
  },
] satisfies Array<Omit<Store, 'id' | 'phone' | 'website'>>;

const storeBranches = [
  '강남점',
  '홍대점',
  '잠실점',
  '신촌점',
  '건대점',
  '대학로점',
  '성수점',
  '왕십리점',
  '노원점',
  '수원점',
];

const stores: Store[] = Array.from({length: 50}, (_, index) => {
  const seed = mockStoreSeeds[index % mockStoreSeeds.length];
  const branch = storeBranches[index % storeBranches.length];
  const id = index + 1;
  const status =
    id % 17 === 0
      ? 'closed'
      : id % 11 === 0
        ? 'closing'
        : id % 7 === 0
          ? 'new'
          : seed.status;

  return {
    ...seed,
    id,
    name: id <= mockStoreSeeds.length ? seed.name : `${seed.name} ${branch}`,
    status,
    phone: `02-${String(3000 + id).padStart(4, '0')}-${String(7000 + id).padStart(4, '0')}`,
    website: `https://example.com/stores/${id}`,
  };
});

export {stores};
