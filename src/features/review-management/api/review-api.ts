import {
  API_ENDPOINTS,
  buildApiPath,
  getBrowserApi,
  type AdminApiTypes,
} from '@/src/shared/api';

import type {Review} from '../model/review';

type ReviewSearchType = 'REPORTED' | 'DELETED';

type GetReviewListParams = {
  page: number;
  size: number;
  searchType?: ReviewSearchType;
};

type ReviewListResult = {
  reviews: Review[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNextPage: boolean;
};

type GetReviewDetailParams = {
  reviewId: Review['id'];
};

type DeleteReviewParams = {
  reviewId: Review['id'];
};

const mapApiReview = (
  review: AdminApiTypes.GetThemeReviewListResponse
): Review | null => {
  if (review.reviewId == null) {
    return null;
  }

  return {
    id: review.reviewId,
    theme: review.themeName ?? '',
    author: review.nickname ?? '',
    rating: review.satisfactionLevel ?? 0,
    content: review.reviewComment ?? '',
    createdAt: review.createdDate ?? '',
    status: review.isDeleted ? 'deleted' : 'active',
    isReported: review.isReported ?? false,
    reportReasons: review.reportReasonList ?? [],
  };
};

const isReview = (review: Review | null): review is Review => {
  return review !== null;
};

export const getReviewList = async ({
  page,
  size,
  searchType,
}: GetReviewListParams): Promise<ReviewListResult> => {
  const {data} =
    await getBrowserApi().get<AdminApiTypes.PageResponseGetThemeReviewListResponse>(
      buildApiPath(API_ENDPOINTS.reviews.root, {
        page,
        size,
        searchType,
      })
    );

  return {
    reviews: data.contents?.map(mapApiReview).filter(isReview) ?? [],
    page: data.page ?? page,
    size: data.size ?? size,
    totalElements: data.totalElements ?? 0,
    totalPages: data.totalPages ?? 1,
    hasNextPage: data.hasNextPage ?? false,
  };
};

export const getReviewDetail = async ({
  reviewId,
}: GetReviewDetailParams): Promise<AdminApiTypes.GetThemeReviewDetailResponse> => {
  const {data} =
    await getBrowserApi().get<AdminApiTypes.GetThemeReviewDetailResponse>(
      API_ENDPOINTS.reviews.detail(reviewId)
    );

  return data;
};

export const deleteReview = async ({
  reviewId,
}: DeleteReviewParams): Promise<void> => {
  await getBrowserApi().delete(API_ENDPOINTS.reviews.detail(reviewId));
};

export type {
  DeleteReviewParams,
  GetReviewDetailParams,
  GetReviewListParams,
  ReviewListResult,
  ReviewSearchType,
};
