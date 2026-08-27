/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface PostThemeRequest {
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  storeId: number;
  /**
   * 테마 이름
   * @example "필름 바이 스티브"
   */
  name: string;
  /**
   * 테마 검색 이름
   * @example "필름 바이 스티브"
   */
  searchName?: string;
  /**
   * 난이도
   * @format float
   * @min 0
   * @max 5
   * @example 2.5
   */
  level?: number;
  /**
   * 공포도
   * @format float
   * @min 0
   * @max 5
   * @example 1.5
   */
  horrorLevel?: number;
  /**
   * 활동성
   * @format float
   * @min 0
   * @max 5
   * @example 1.5
   */
  activityLevel?: number;
  /**
   * 플레이타임
   * @format int32
   * @min 0
   * @example 80
   */
  playTime: number;
  /**
   * 시놉시스
   * @example "메모리 컴퍼니 투어 프로그램을 꼭 체험해 보고 싶습니다 ... "
   */
  synopsis?: string;
  /**
   * 대표 사진
   * @example "https://i.postimg.cc/8zv36BDh/theme.jpg"
   */
  img?: string;
  /**
   * 최소 추천 인원수
   * @format int32
   * @example 3
   */
  minRecommendedHeadcount?: number;
  /**
   * 최대 추천 인원수
   * @format int32
   * @example 5
   */
  maxRecommendedHeadcount?: number;
  /**
   * 오픈일
   * @example "2026-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일
   * @example "2026-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일
   * @example "2026-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일
   * @example "2026-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일
   * @example "2026-01-01"
   */
  closureDate?: string;
  detailedGenreList?: (
    | "SENTIMENTAL"
    | "HORROR"
    | "THRILLER"
    | "DETECTIVE"
    | "COMIC"
    | "MYSTERY"
    | "FANTASY"
    | "ADVENTURE"
    | "ESCAPE"
    | "DRAMA"
    | "ROMANCE"
    | "SF"
    | "HISTORY"
    | "FAIRY_TALE"
    | "ARCADE"
    | "SURVIVAL"
    | "PROBLEM"
    | "ACTION"
    | "ADULT"
    | "OUTDOOR"
    | "ETC"
  )[];
  genreList?: string[];
  priceList?: ThemePriceDto[];
  /**
   * 특이사항
   * @example "특이사항입니다."
   */
  remark?: string;
  /**
   * 비고
   * @example "비고입니다."
   */
  note?: string;
}

/** 기준 인원 대비 가격 목록 */
export interface ThemePriceDto {
  /**
   * 인원 수
   * @format int32
   * @example 2
   */
  headcount?: number;
  /**
   * 가격
   * @format int32
   * @example 100000
   */
  price?: number;
}

export interface ErrorResponse {
  /** @format int32 */
  code?: number;
  message?: string;
}

export interface PostThemeResponse {
  /**
   * 방탈출 테마 ID
   * @format int64
   * @example 1
   */
  themeId?: number;
}

export interface PostStoreRequest {
  /**
   * 매장명
   * @minLength 0
   * @maxLength 30
   * @example "키이스케이프 LOG_IN 1"
   */
  name: string;
  /**
   * 주소
   * @minLength 0
   * @maxLength 70
   * @example "서울 강남구 강남대로98길 16"
   */
  address: string;
  /**
   * 소개
   * @example "문 너머에는 당신이 주인공인 모든 순간이 준비되어 있습니다."
   */
  about?: string;
  /**
   * 웹사이트 URL
   * @example "https://web.keyescape.com/works.php"
   */
  websiteUrl: string;
  /**
   * 예약 URL
   * @example "https://web.keyescape.com/reservation1.php"
   */
  reservationUrl: string;
  /**
   * 연락처
   * @minLength 0
   * @maxLength 20
   * @example "010-5544-7839"
   */
  contact?: string;
  /**
   * 오픈일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  closureDate?: string;
  /**
   * 비고
   * @example "안녕하세요"
   */
  note?: string;
}

export interface PostStoreResponse {
  /**
   * 방탈출 매장 ID
   * @format int64
   * @example 1
   */
  storeId?: number;
}

export interface PostLoginRequest {
  /**
   * ID
   * @example "roominus"
   */
  id: string;
  /**
   * 비밀번호
   * @example "roominus"
   */
  password: string;
}

export interface PostLoginResponse {
  /**
   * 어드민 ID
   * @format int64
   * @example 1
   */
  adminId?: number;
  /**
   * 엑세스 토큰
   * @example "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI3NTM3NzI4LCJleHAiOjE3Mjc1NDEzMjh9.YMML0GPtBsW-NtIsZlfLdeY76G5umC57EIgks5mpnu4"
   */
  accessToken?: string;
  /**
   * 리프레시 토큰
   * @example "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI3NTM3NzI4LCJleHAiOjE3Mjc1NDEzMjh9.YMML0GPtBsW-NtIsZlfLdeY76G5umC57EIgks5mpnu4"
   */
  refreshToken?: string;
}

export interface GetAccessTokenResponse {
  /**
   * 엑세스 토큰
   * @example "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI3NTM3NzI4LCJleHAiOjE3Mjc1NDEzMjh9.YMML0GPtBsW-NtIsZlfLdeY76G5umC57EIgks5mpnu4"
   */
  accessToken?: string;
  /**
   * 리프레시 토큰
   * @example "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzI3NTM3NzI4LCJleHAiOjE3Mjc1NDEzMjh9.YMML0GPtBsW-NtIsZlfLdeY76G5umC57EIgks5mpnu4"
   */
  refreshToken?: string;
}

export interface PatchThemeRequest {
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  storeId?: number;
  /**
   * 테마 이름
   * @example "필름 바이 스티브"
   */
  name?: string;
  /**
   * 테마 검색 이름
   * @example "필름 바이 스티브"
   */
  searchName?: string;
  /**
   * 난이도
   * @format float
   * @min -1
   * @max 5
   * @example 2.5
   */
  level?: number;
  /**
   * 공포도
   * @format float
   * @min -1
   * @max 5
   * @example 1.5
   */
  horrorLevel?: number;
  /**
   * 활동성
   * @format float
   * @min -1
   * @max 5
   * @example 1.5
   */
  activityLevel?: number;
  /**
   * 플레이타임
   * @format int32
   * @min 0
   * @example 80
   */
  playTime?: number;
  /**
   * 시놉시스
   * @example "메모리 컴퍼니 투어 프로그램을 꼭 체험해 보고 싶습니다 ... "
   */
  synopsis?: string;
  /**
   * 대표 사진
   * @example "https://i.postimg.cc/8zv36BDh/theme.jpg"
   */
  img?: string;
  /**
   * 최소 추천 인원수
   * @format int32
   * @example 3
   */
  minRecommendedHeadcount?: number;
  /**
   * 최대 추천 인원수
   * @format int32
   * @example 5
   */
  maxRecommendedHeadcount?: number;
  /**
   * 오픈일
   * @example "2026-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일
   * @example "2026-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일
   * @example "2026-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일
   * @example "2026-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일
   * @example "2026-01-01"
   */
  closureDate?: string;
  detailedGenreList?: (
    | "SENTIMENTAL"
    | "HORROR"
    | "THRILLER"
    | "DETECTIVE"
    | "COMIC"
    | "MYSTERY"
    | "FANTASY"
    | "ADVENTURE"
    | "ESCAPE"
    | "DRAMA"
    | "ROMANCE"
    | "SF"
    | "HISTORY"
    | "FAIRY_TALE"
    | "ARCADE"
    | "SURVIVAL"
    | "PROBLEM"
    | "ACTION"
    | "ADULT"
    | "OUTDOOR"
    | "ETC"
  )[];
  genreList?: string[];
  priceList?: ThemePriceDto[];
  /**
   * 특이사항
   * @example "특이사항입니다."
   */
  remark?: string;
  /**
   * 비고
   * @example "비고입니다."
   */
  note?: string;
}

export interface PatchStoreRequest {
  /**
   * 매장명
   * @minLength 0
   * @maxLength 30
   * @example "키이스케이프 LOG_IN 1"
   */
  name?: string;
  /**
   * 주소
   * @minLength 0
   * @maxLength 70
   * @example "서울 강남구 강남대로98길 16"
   */
  address?: string;
  /**
   * 소개
   * @example "문 너머에는 당신이 주인공인 모든 순간이 준비되어 있습니다."
   */
  about?: string;
  /**
   * 웹사이트 URL
   * @example "https://web.keyescape.com/works.php"
   */
  websiteUrl?: string;
  /**
   * 예약 URL
   * @example "https://web.keyescape.com/reservation1.php"
   */
  reservationUrl?: string;
  /**
   * 연락처
   * @minLength 0
   * @maxLength 20
   * @example "010-5544-7839"
   */
  contact?: string;
  /**
   * 오픈일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일 (yyyy-MM-dd 형식)
   * @example "2001-01-01"
   */
  closureDate?: string;
  /**
   * 비고
   * @example "안녕하세요"
   */
  note?: string;
}

export interface GetThemeListResponse {
  /**
   * 방탈출 테마 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  storeId?: number;
  /**
   * 매장 이름
   * @example "필름 바이 스티브"
   */
  storeName?: string;
  /**
   * 테마 이름
   * @example "필름 바이 스티브"
   */
  name?: string;
  /**
   * 난이도
   * @format float
   * @example 2.5
   */
  level?: number;
  /**
   * 플레이타임
   * @format int32
   * @example 80
   */
  playTime?: number;
  /**
   * 대표 사진
   * @example "https://i.postimg.cc/8zv36BDh/theme.jpg"
   */
  img?: string;
  detailedGenreList?: (
    | "SENTIMENTAL"
    | "HORROR"
    | "THRILLER"
    | "DETECTIVE"
    | "COMIC"
    | "MYSTERY"
    | "FANTASY"
    | "ADVENTURE"
    | "ESCAPE"
    | "DRAMA"
    | "ROMANCE"
    | "SF"
    | "HISTORY"
    | "FAIRY_TALE"
    | "ARCADE"
    | "SURVIVAL"
    | "PROBLEM"
    | "ACTION"
    | "ADULT"
    | "OUTDOOR"
    | "ETC"
  )[];
  /** 테마 상태 (OPEN_SOON: 오픈 예정, NEW_OPEN: 신규 오픈, NORMAL: 정상 운영, RENEWAL: 리뉴얼, CLOSING_SOON: 폐업 예정, CLOSED: 폐업) */
  themeStatus?:
    | "OPEN_SOON"
    | "NEW_OPEN"
    | "NORMAL"
    | "RENEWAL"
    | "CLOSING_SOON"
    | "CLOSED";
}

export interface PageResponseGetThemeListResponse {
  contents?: GetThemeListResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNextPage?: boolean;
}

export interface GetThemeDetailResponse {
  /**
   * 방탈출 테마 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  storeId?: number;
  /**
   * 매장 이름
   * @example "필름 바이 스티브"
   */
  storeName?: string;
  /**
   * 테마 이름
   * @example "필름 바이 스티브"
   */
  name?: string;
  /**
   * 테마 검색 이름
   * @example "필름 바이 스티브"
   */
  searchName?: string;
  /**
   * 난이도
   * @format float
   * @example 2.5
   */
  level?: number;
  /**
   * 공포도
   * @format float
   * @example 1.5
   */
  horrorLevel?: number;
  /**
   * 활동성
   * @format float
   * @example 1.5
   */
  activityLevel?: number;
  /**
   * 플레이타임
   * @format int32
   * @example 80
   */
  playTime?: number;
  /**
   * 시놉시스
   * @example "메모리 컴퍼니 투어 프로그램을 꼭 체험해 보고 싶습니다 ... "
   */
  synopsis?: string;
  /**
   * 대표 사진
   * @example "https://i.postimg.cc/8zv36BDh/theme.jpg"
   */
  img?: string;
  /**
   * 최소 추천 인원수
   * @format int32
   * @example 3
   */
  minRecommendedHeadcount?: number;
  /**
   * 최대 추천 인원수
   * @format int32
   * @example 5
   */
  maxRecommendedHeadcount?: number;
  /**
   * 오픈일
   * @format date
   * @example "2026-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일
   * @format date
   * @example "2026-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일
   * @format date
   * @example "2026-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일
   * @format date
   * @example "2026-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일
   * @format date
   * @example "2026-01-01"
   */
  closureDate?: string;
  detailedGenreList?: (
    | "SENTIMENTAL"
    | "HORROR"
    | "THRILLER"
    | "DETECTIVE"
    | "COMIC"
    | "MYSTERY"
    | "FANTASY"
    | "ADVENTURE"
    | "ESCAPE"
    | "DRAMA"
    | "ROMANCE"
    | "SF"
    | "HISTORY"
    | "FAIRY_TALE"
    | "ARCADE"
    | "SURVIVAL"
    | "PROBLEM"
    | "ACTION"
    | "ADULT"
    | "OUTDOOR"
    | "ETC"
  )[];
  genreList?: string[];
  priceList?: ThemePriceDto[];
  /**
   * 특이사항
   * @example "특이사항입니다."
   */
  remark?: string;
  /**
   * 비고
   * @example "비고입니다."
   */
  note?: string;
  /** 테마 상태 (OPEN_SOON: 오픈 예정, NEW_OPEN: 신규 오픈, NORMAL: 정상 운영, RENEWAL: 리뉴얼, CLOSING_SOON: 폐업 예정, CLOSED: 폐업) */
  themeStatus?:
    | "OPEN_SOON"
    | "NEW_OPEN"
    | "NORMAL"
    | "RENEWAL"
    | "CLOSING_SOON"
    | "CLOSED";
}

export interface GetThemeHistoryListResponse {
  /**
   * 히스토리 커밋 ID (상세 조회 시 사용)
   * @example "1.0"
   */
  commitId?: string;
  /**
   * 테마 ID
   * @format int64
   * @example 1
   */
  themeId?: number;
  /**
   * 테마 이름
   * @example "셜록의 서재"
   */
  name?: string;
  /** 작업 유형 (INITIAL: 생성, UPDATE: 수정, TERMINAL: 삭제) */
  snapshotType?: "INITIAL" | "UPDATE" | "TERMINAL";
  /**
   * 수정자
   * @example "루미너스"
   */
  author?: string;
  /**
   * 변경 시간
   * @format date-time
   */
  commitDateTime?: string;
}

export interface PageResponseGetThemeHistoryListResponse {
  contents?: GetThemeHistoryListResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNextPage?: boolean;
}

/** 변경 내역 (snapshotType이 UPDATE인 경우) */
export interface ChangeDetail {
  /**
   * 변경된 속성명
   * @example "playTime"
   */
  property?: string;
  /**
   * 변경 전 값
   * @example 60
   */
  before?: object;
  /**
   * 변경 후 값
   * @example 65
   */
  after?: object;
}

export interface GetThemeHistoryDetailResponse {
  /**
   * 테마 이름
   * @example "셜록의 서재"
   */
  themeName?: string;
  /** 작업 유형 (INITIAL: 생성, UPDATE: 수정, TERMINAL: 삭제) */
  snapshotType?: "INITIAL" | "UPDATE" | "TERMINAL";
  /**
   * 수정자
   * @example "관리자"
   */
  author?: string;
  /**
   * 변경 시간
   * @format date-time
   */
  commitDateTime?: string;
  /** 생성 데이터 (snapshotType이 INITIAL인 경우) */
  createdData?: Record<string, object>;
  /** 변경 내역 (snapshotType이 UPDATE인 경우) */
  changes?: ChangeDetail[];
}

export interface GetStoreListResponse {
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * 매장명
   * @example "키이스케이프 LOG_IN 1"
   */
  name?: string;
  /**
   * 주소
   * @example "서울 강남구 강남대로98길 16"
   */
  address?: string;
  /**
   * 인근 지하철역
   * @example "강남역"
   */
  station?: string;
  /** 상태<br>(OPEN_SOON: 오픈 예정, NEW_OPEN: 신규 오픈, NORMAL: 정상 운영, RENEWAL: 리뉴얼, CLOSING_SOON: 폐업 예정, CLOSED: 폐업) */
  status?:
    | "OPEN_SOON"
    | "NEW_OPEN"
    | "NORMAL"
    | "RENEWAL"
    | "CLOSING_SOON"
    | "CLOSED";
  /**
   * 연락처
   * @example "010-5544-7839"
   */
  contact?: string;
  /**
   * 웹사이트 URL
   * @example "http://keyescape.com/"
   */
  websiteUrl?: string;
}

export interface PageResponseGetStoreListResponse {
  contents?: GetStoreListResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNextPage?: boolean;
}

export interface GetStoreInfoResponse {
  /**
   * 매장명
   * @example "키이스케이프 LOG_IN 1"
   */
  name?: string;
  /**
   * 주소
   * @example "서울 강남구 강남대로98길 16"
   */
  address?: string;
  /**
   * 인근 지하철역
   * @example "강남역"
   */
  station?: string;
  /**
   * 소개
   * @example "문 너머에는 당신이 주인공인 모든 순간이 준비되어 있습니다."
   */
  about?: string;
  /**
   * 웹사이트 URL
   * @example "https://web.keyescape.com/works.php"
   */
  websiteUrl?: string;
  /**
   * 예약 URL
   * @example "https://web.keyescape.com/reservation1.php"
   */
  reservationUrl?: string;
  /**
   * 연락처
   * @example "010-5544-7839"
   */
  contact?: string;
  /**
   * 오픈일 (yyyy-MM-dd 형식)
   * @format date
   * @example "2001-01-01"
   */
  openDate?: string;
  /**
   * 리뉴얼 시작일 (yyyy-MM-dd 형식)
   * @format date
   * @example "2001-01-01"
   */
  renewalStartDate?: string;
  /**
   * 리뉴얼 종료일 (yyyy-MM-dd 형식)
   * @format date
   * @example "2001-01-01"
   */
  renewalEndDate?: string;
  /**
   * 폐업 예정일 (yyyy-MM-dd 형식)
   * @format date
   * @example "2001-01-01"
   */
  closureExpectedDate?: string;
  /**
   * 폐업일 (yyyy-MM-dd 형식)
   * @format date
   * @example "2001-01-01"
   */
  closureDate?: string;
  /**
   * 비고
   * @example "안녕하세요"
   */
  note?: string;
}

export interface GetStoreHistoryListResponse {
  /**
   * 히스토리 커밋 ID (상세 조회 시 사용)
   * @example "1.0"
   */
  commitId?: string;
  /**
   * 매장 ID
   * @format int64
   * @example 1
   */
  storeId?: number;
  /**
   * 매장 이름
   * @example "코드케이 홍대점"
   */
  name?: string;
  /** 작업 유형 (INITIAL: 생성, UPDATE: 수정, TERMINAL: 삭제) */
  snapshotType?: "INITIAL" | "UPDATE" | "TERMINAL";
  /**
   * 수정자
   * @example "루미너스"
   */
  author?: string;
  /**
   * 변경 시간
   * @format date-time
   */
  commitDateTime?: string;
}

export interface PageResponseGetStoreHistoryListResponse {
  contents?: GetStoreHistoryListResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNextPage?: boolean;
}

export interface GetThemeReviewListResponse {
  /**
   * 방탈출 테마 후기 ID
   * @format int64
   * @example 1
   */
  reviewId?: number;
  /**
   * 방탈출 테마 ID
   * @format int64
   * @example 1
   */
  themeId?: number;
  /**
   * 테마명
   * @example "셜록의 서재"
   */
  themeName?: string;
  /**
   * 후기 작성자 ID
   * @format int64
   * @example 1
   */
  memberId?: number;
  /**
   * 후기 작성자 닉네임
   * @example "루미너스"
   */
  nickname?: string;
  /**
   * 후기 총평 코멘트 (작성자 원본)
   * @example "정말 재밌었어요!"
   */
  reviewComment?: string;
  reportReasonList?: string[];
  /**
   * 총평 별점
   * @format float
   * @example 4.5
   */
  satisfactionLevel?: number;
  /**
   * 작성일
   * @format date
   * @example "2026-03-18"
   */
  createdDate?: string;
  /**
   * 신고 여부
   * @example true
   */
  isReported?: boolean;
  /**
   * 삭제 여부 (어드민 삭제)
   * @example false
   */
  isDeleted?: boolean;
}

export interface PageResponseGetThemeReviewListResponse {
  contents?: GetThemeReviewListResponse[];
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
  hasNextPage?: boolean;
}

export interface GetThemeReviewDetailResponse {
  /**
   * 방탈출 테마 후기 ID
   * @format int64
   * @example 1
   */
  reviewId?: number;
  /**
   * 방탈출 테마 후기 작성자 ID
   * @format int64
   * @example 1
   */
  memberId?: number;
  /**
   * 방탈출 테마 ID
   * @format int64
   * @example 1
   */
  themeId?: number;
  /**
   * 만족도
   * @format float
   * @example 3.5
   */
  satisfactionLevel?: number;
  /** 총평 (SOIL: 흙길, SOIL_GRASS: 흙풀길, GRASS: 풀길, GRASS_FLOWER: 풀꽃길, FLOWER: 꽃길, FLOWER_GARDEN: 꽃밭길, FAVORITE: 인생테마) */
  review?:
    | "SOIL"
    | "SOIL_GRASS"
    | "GRASS"
    | "GRASS_FLOWER"
    | "FLOWER"
    | "FLOWER_GARDEN"
    | "FAVORITE";
  /**
   * 총평
   * @example "저의 총평은 ..."
   */
  reviewComment?: string;
  /**
   * 방문 날짜
   * @format date
   * @example "2024-05-12"
   */
  playedAt?: string;
  /** 참가자 정보 */
  participantList?: ThemeReviewParticipantDto[];
  /** 탈출 여부 */
  isEscaped?: boolean;
  /** 남은 시간 */
  remainingTime?: LocalTime;
  /** 탈출 실패 사유 (HINT: 힌트 개수 초과, TIME: 시간 부족, ETC: 기타) */
  failReason?: "HINT" | "TIME" | "ETC";
  /** 엔딩 열람 여부 */
  hasViewedEnding?: boolean;
  /**
   * 힌트 사용 개수 (0~N)
   * @format int32
   * @example 1
   */
  usedHint?: number;
  /**
   * 최소 추천 인원수
   * @format int32
   * @example 3
   */
  minRecommendedHeadcount?: number;
  /**
   * 최대 추천 인원수
   * @format int32
   * @example 5
   */
  maxRecommendedHeadcount?: number;
  /** 총평 태그 목록 (AGING: 노후화, DEVICE_ERROR: 장치 오류, ENTRY_DELAY: 입장 지연, SAME_DAY_BOOKING: 당일 예약, EARLY_EXIT: 중도 포기) */
  reviewTagList?: (
    | "AGING"
    | "DEVICE_ERROR"
    | "ENTRY_DELAY"
    | "SAME_DAY_BOOKING"
    | "EARLY_EXIT"
  )[];
  /**
   * 자물쇠/장치 비율 (자물쇠 기준)
   * @format int32
   * @example 6
   */
  lockRatio?: number;
  /**
   * 난이도
   * @format float
   * @example 3.5
   */
  level?: number;
  /**
   * 난이도 추가 설명
   * @example "문제들이 굉장히 깔끔한 편이었어요!"
   */
  levelComment?: string;
  /**
   * 공포도 점수
   * @format float
   * @example 2.5
   */
  horrorLevel?: number;
  /**
   * 공포도 추가 설명
   * @example "공포도가 대박이었습니다."
   */
  horrorComment?: string;
  /**
   * 활동성 점수
   * @format float
   * @example 2.5
   */
  activityLevel?: number;
  /**
   * 활동성 추가 설명
   * @example "활동성이 대박이었습니다."
   */
  activityComment?: string;
  /** 추천 복장 (PANTS: 바지, LONG_SKIRT: 긴 치마, SHORT_SKIRT: 짧은 치마) */
  recommendedCloth?: "PANTS" | "LONG_SKIRT" | "SHORT_SKIRT";
  /**
   * 스토리 점수
   * @format float
   * @example 2.5
   */
  storyLevel?: number;
  /**
   * 스토리 추가 설명
   * @example "스토리가 대박이었습니다."
   */
  storyComment?: string;
  /**
   * 인테리어 점수
   * @format float
   * @example 2.5
   */
  interiorLevel?: number;
  /**
   * 인테리어 추가 설명
   * @example "인테리어가 대박이었습니다."
   */
  interiorComment?: string;
  /**
   * 작성 시간
   * @format date-time
   */
  createdAt?: string;
}

/**
 * 남은 시간
 * @example "00:16:30"
 */
export interface LocalTime {
  /** @format int32 */
  hour?: number;
  /** @format int32 */
  minute?: number;
  /** @format int32 */
  second?: number;
  /** @format int32 */
  nano?: number;
}

/** 참가자 정보 */
export interface ThemeReviewParticipantDto {
  proficiency?: "BEGINNER" | "JUNIOR" | "SENIOR" | "MASTER";
  remark?: string;
}
