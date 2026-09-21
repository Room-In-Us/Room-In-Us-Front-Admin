const HISTORY_DEFAULT_PAGE = 1;
const HISTORY_DEFAULT_PAGE_SIZE = 10;

const historySnapshotTypes = ['INITIAL', 'UPDATE', 'TERMINAL'] as const;

type HistorySnapshotType = (typeof historySnapshotTypes)[number];

const historySnapshotTypeSet = new Set<string>(historySnapshotTypes);

function getPositiveIntegerParam(
  searchParams: URLSearchParams,
  name: string,
  fallback: number
) {
  const value = Number(searchParams.get(name));

  return Number.isInteger(value) && value > 0 ? value : fallback;
}

function getDateParam(searchParams: URLSearchParams, name: string) {
  const value = searchParams.get(name)?.trim();

  return value || undefined;
}

function getSnapshotTypeParam(
  searchParams: URLSearchParams
): HistorySnapshotType | undefined {
  const value = searchParams.get('snapshotType')?.trim();

  return value && historySnapshotTypeSet.has(value)
    ? (value as HistorySnapshotType)
    : undefined;
}

export {
  HISTORY_DEFAULT_PAGE,
  HISTORY_DEFAULT_PAGE_SIZE,
  getDateParam,
  getPositiveIntegerParam,
  getSnapshotTypeParam,
};
