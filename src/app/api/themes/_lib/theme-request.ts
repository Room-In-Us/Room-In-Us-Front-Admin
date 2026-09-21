import type {AdminApiTypes} from '@/src/shared/api';

type ThemeRequest =
  | AdminApiTypes.PostThemeRequest
  | AdminApiTypes.PatchThemeRequest;
type ThemeRequestKey = keyof ThemeRequest;

const textFields = [
  'name',
  'searchName',
  'synopsis',
  'img',
  'remark',
  'note',
] as const satisfies readonly ThemeRequestKey[];
const dateFields = [
  'openDate',
  'closureExpectedDate',
  'renewalStartDate',
  'renewalEndDate',
  'closureDate',
] as const satisfies readonly ThemeRequestKey[];
const ratingFields = [
  'level',
  'horrorLevel',
  'activityLevel',
] as const satisfies readonly ThemeRequestKey[];
const integerFields = [
  'storeId',
  'playTime',
  'minRecommendedHeadcount',
  'maxRecommendedHeadcount',
] as const satisfies readonly ThemeRequestKey[];
const listFields = [
  'genreList',
  'detailedGenreList',
  'priceList',
] as const satisfies readonly ThemeRequestKey[];
const allowedKeys = new Set<string>([
  ...textFields,
  ...dateFields,
  ...ratingFields,
  ...integerFields,
  ...listFields,
]);
const detailedGenres = new Set<string>([
  'SENTIMENTAL',
  'HORROR',
  'THRILLER',
  'DETECTIVE',
  'COMIC',
  'MYSTERY',
  'FANTASY',
  'ADVENTURE',
  'ESCAPE',
  'DRAMA',
  'ROMANCE',
  'SF',
  'HISTORY',
  'FAIRY_TALE',
  'ARCADE',
  'SURVIVAL',
  'PROBLEM',
  'ACTION',
  'ADULT',
  'OUTDOOR',
  'ETC',
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function isPriceList(value: unknown) {
  return (
    Array.isArray(value) &&
    value.every(
      (price) =>
        isRecord(price) &&
        Object.keys(price).every(
          (key) => key === 'headcount' || key === 'price'
        ) &&
        Number.isInteger(price.headcount) &&
        (price.headcount as number) > 0 &&
        Number.isInteger(price.price) &&
        (price.price as number) >= 0
    )
  );
}

function isThemeRequest(value: unknown, mode: 'post' | 'patch'): boolean {
  if (!isRecord(value)) return false;
  if (
    mode === 'post' &&
    (!Number.isInteger(value.storeId) ||
      (value.storeId as number) <= 0 ||
      typeof value.name !== 'string' ||
      !value.name.trim() ||
      !Number.isInteger(value.playTime) ||
      (value.playTime as number) < 0)
  )
    return false;

  return Object.entries(value).every(([key, field]) => {
    if (!allowedKeys.has(key)) return false;
    if (textFields.includes(key as (typeof textFields)[number])) {
      return typeof field === 'string';
    }
    if (dateFields.includes(key as (typeof dateFields)[number])) {
      return (
        (mode === 'patch' && field === null) ||
        (typeof field === 'string' && isDate(field))
      );
    }
    if (ratingFields.includes(key as (typeof ratingFields)[number])) {
      return (
        typeof field === 'number' &&
        Number.isFinite(field) &&
        field >= (mode === 'patch' ? -1 : 0) &&
        field <= 5 &&
        Number.isInteger(field * 2)
      );
    }
    if (integerFields.includes(key as (typeof integerFields)[number])) {
      return (
        typeof field === 'number' &&
        Number.isInteger(field) &&
        field >= (key === 'playTime' ? 0 : 1)
      );
    }
    if (key === 'genreList') {
      return (
        Array.isArray(field) &&
        field.every((genre) => typeof genre === 'string')
      );
    }
    if (key === 'detailedGenreList') {
      return (
        Array.isArray(field) &&
        field.every((genre) => detailedGenres.has(genre))
      );
    }
    return isPriceList(field);
  });
}

export function parsePostThemeRequest(
  value: unknown
): AdminApiTypes.PostThemeRequest | null {
  return isThemeRequest(value, 'post')
    ? (value as AdminApiTypes.PostThemeRequest)
    : null;
}

export function parsePatchThemeRequest(
  value: unknown
): AdminApiTypes.PatchThemeRequest | null {
  return isThemeRequest(value, 'patch')
    ? (value as AdminApiTypes.PatchThemeRequest)
    : null;
}
