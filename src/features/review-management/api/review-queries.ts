import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  deleteReview,
  getReviewDetail,
  getReviewList,
  type DeleteReviewParams,
  type GetReviewDetailParams,
  type GetReviewListParams,
  type ReviewListResult,
} from './review-api';

const reviewQueryKeys = {
  all: ['reviews'] as const,

  lists: () => [...reviewQueryKeys.all, 'list'] as const,

  list: (params: GetReviewListParams) =>
    [...reviewQueryKeys.lists(), params] as const,

  detail: (reviewId: GetReviewDetailParams['reviewId']) =>
    [...reviewQueryKeys.all, 'detail', reviewId] as const,
};

const useReviewListQuery = (params: GetReviewListParams) => {
  return useQuery<ReviewListResult>({
    queryKey: reviewQueryKeys.list(params),
    queryFn: () => getReviewList(params),
    placeholderData: (previousData) => previousData,
  });
};

const useReviewDetailQuery = ({
  reviewId,
  enabled,
}: GetReviewDetailParams & {enabled: boolean}) => {
  return useQuery({
    enabled: enabled && Boolean(reviewId),
    queryKey: reviewQueryKeys.detail(reviewId),
    queryFn: () => getReviewDetail({reviewId}),
    refetchOnWindowFocus: false,
  });
};

const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteReviewParams) => deleteReview(params),

    onSuccess: async (_data, {reviewId}) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: reviewQueryKeys.lists(),
        }),
        queryClient.removeQueries({
          queryKey: reviewQueryKeys.detail(reviewId),
        }),
      ]);
    },
  });
};

export {
  reviewQueryKeys,
  useDeleteReviewMutation,
  useReviewDetailQuery,
  useReviewListQuery,
};
