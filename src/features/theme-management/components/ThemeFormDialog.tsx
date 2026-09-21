'use client';

import {useId, useState, type FormEvent} from 'react';

import {IcCalendar, IcDollarSign, IcFileText} from '@/src/assets/icons';
import {isApiError, type AdminApiTypes} from '@/src/shared/api';
import {ModalLayout} from '@/src/shared/components/ui/ModalLayout';
import {Tabs} from '@/src/shared/components/ui/Tabs';

import {
  useCreateThemeMutation,
  useUpdateThemeMutation,
} from '../api/theme-queries';
import {
  ThemeBasicFields,
  type DetailedGenre,
  type SelectedStore,
} from './ThemeBasicFields';
import {ThemeDateFields} from './ThemeInputField';
import {ThemePriceFields, type PriceRow} from './ThemePriceFields';

type ThemeTab = 'basic' | 'price' | 'dates';

const tabs = [
  {value: 'basic', label: '기본 정보', icon: IcFileText},
  {value: 'price', label: '가격 정보', icon: IcDollarSign},
  {value: 'dates', label: '운영 날짜', icon: IcCalendar},
];

type ThemeFormDialogProps =
  | {mode: 'add'; onClose: () => void; initialTheme?: never; themeId?: never}
  | {
      mode: 'edit';
      onClose: () => void;
      initialTheme: AdminApiTypes.GetThemeDetailResponse;
      themeId: number;
    };

function ThemeFormDialog({
  mode,
  onClose,
  initialTheme,
  themeId,
}: ThemeFormDialogProps) {
  const [activeTab, setActiveTab] = useState<ThemeTab>('basic');
  const [selectedStore, setSelectedStore] = useState<SelectedStore | null>(
    initialTheme?.storeId != null
      ? {id: initialTheme.storeId, name: initialTheme.storeName ?? ''}
      : null
  );
  const [searchNameInput, setSearchNameInput] = useState('');
  const [searchNames, setSearchNames] = useState<string[]>(
    initialTheme?.searchName
      ?.split(',')
      .map((name) => name.trim())
      .filter(Boolean) ?? []
  );
  const [genreInput, setGenreInput] = useState('');
  const [genres, setGenres] = useState<string[]>(initialTheme?.genreList ?? []);
  const [selectedDetailedGenres, setSelectedDetailedGenres] = useState<
    DetailedGenre[]
  >(initialTheme?.detailedGenreList ?? []);
  const [priceRows, setPriceRows] = useState<PriceRow[]>(
    initialTheme?.priceList?.map((price, index) => ({
      id: index + 1,
      headcount: String(price.headcount ?? 0),
      totalPrice: String(price.price ?? 0),
      perPersonPrice: price.headcount
        ? String(Math.round((price.price ?? 0) / price.headcount))
        : '0',
      lastEdited: 'totalPrice',
    })) ?? []
  );
  const [errorMessage, setErrorMessage] = useState('');
  const titleId = useId();
  const descriptionId = useId();
  const createThemeMutation = useCreateThemeMutation();
  const updateThemeMutation = useUpdateThemeMutation();
  const isPending =
    mode === 'edit'
      ? updateThemeMutation.isPending
      : createThemeMutation.isPending;

  const closeDialog = () => {
    if (isPending) return;
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isPending) return;

    const formData = new FormData(event.currentTarget);
    const name = getText(formData, 'name');
    const img = getText(formData, 'img');
    const playTime = getOptionalNumber(formData, 'playTime');

    if (!selectedStore || !name || !img) {
      setActiveTab('basic');
      setErrorMessage('매장, 테마명, 이미지 URL을 입력해주세요.');
      return;
    }

    if (!isValidUrl(img)) {
      setActiveTab('basic');
      setErrorMessage('올바른 이미지 URL을 입력해주세요.');
      return;
    }

    const level = getOptionalNumber(formData, 'level');
    const horrorLevel = getOptionalNumber(formData, 'horrorLevel');
    const activityLevel = getOptionalNumber(formData, 'activityLevel');
    if (
      (playTime != null && (!Number.isInteger(playTime) || playTime < 0)) ||
      !isWithinHalfStepRange(level, 1, 5) ||
      !isWithinHalfStepRange(horrorLevel, 0, 5) ||
      !isWithinHalfStepRange(activityLevel, 1, 5)
    ) {
      setActiveTab('basic');
      setErrorMessage('플레이타임과 난이도, 공포도, 활동성 값을 확인해주세요.');
      return;
    }

    const minHeadcount = getOptionalNumber(formData, 'minRecommendedHeadcount');
    const maxHeadcount = getOptionalNumber(formData, 'maxRecommendedHeadcount');
    if (
      (minHeadcount != null &&
        (!Number.isInteger(minHeadcount) || minHeadcount < 1)) ||
      (maxHeadcount != null &&
        (!Number.isInteger(maxHeadcount) || maxHeadcount < 1)) ||
      (minHeadcount != null &&
        maxHeadcount != null &&
        minHeadcount > maxHeadcount)
    ) {
      setActiveTab('basic');
      setErrorMessage('최대 추천 인원은 최소 추천 인원 이상이어야 합니다.');
      return;
    }

    if (
      (minHeadcount != null && maxHeadcount == null) ||
      (minHeadcount == null && maxHeadcount != null)
    ) {
      setActiveTab('basic');
      setErrorMessage('최소·최대 추천 인원을 함께 입력해주세요.');
      return;
    }

    const pendingGenre = genreInput.trim();
    const allGenres = pendingGenre
      ? Array.from(new Set([...genres, pendingGenre]))
      : genres;
    const pendingSearchName = searchNameInput.trim();
    const allSearchNames = pendingSearchName
      ? Array.from(new Set([...searchNames, pendingSearchName]))
      : searchNames;

    const hasIncompletePrice = priceRows.some((row) => {
      const headcount = Number(row.headcount);
      const price = Number(row.totalPrice);
      const perPersonPrice = Number(row.perPersonPrice);
      return (
        !row.headcount ||
        !row.totalPrice ||
        !row.perPersonPrice ||
        !Number.isInteger(headcount) ||
        headcount < 1 ||
        !Number.isInteger(price) ||
        price < 0 ||
        !Number.isInteger(perPersonPrice) ||
        perPersonPrice < 0
      );
    });
    if (hasIncompletePrice) {
      setActiveTab('price');
      setErrorMessage('인원 수와 가격을 함께 올바르게 입력해주세요.');
      return;
    }
    const prices = priceRows.map((row) => ({
      headcount: Number(row.headcount),
      price: Number(row.totalPrice),
    }));

    const request: AdminApiTypes.PostThemeRequest = {
      storeId: selectedStore.id,
      name,
      img,
      playTime: playTime ?? 0,
      searchName: allSearchNames.join(', ') || undefined,
      synopsis: getOptionalText(formData, 'synopsis'),
      level,
      horrorLevel,
      activityLevel,
      genreList: allGenres.length ? allGenres : undefined,
      detailedGenreList: selectedDetailedGenres.length
        ? selectedDetailedGenres
        : undefined,
      minRecommendedHeadcount: minHeadcount,
      maxRecommendedHeadcount: maxHeadcount,
      remark: getOptionalText(formData, 'remark'),
      note: getOptionalText(formData, 'note'),
      priceList: prices.length ? prices : undefined,
      openDate: getOptionalText(formData, 'openDate'),
      closureExpectedDate: getOptionalText(formData, 'closureExpectedDate'),
      renewalStartDate: getOptionalText(formData, 'renewalStartDate'),
      renewalEndDate: getOptionalText(formData, 'renewalEndDate'),
      closureDate: getOptionalText(formData, 'closureDate'),
    };

    setErrorMessage('');
    try {
      if (mode === 'edit') {
        await updateThemeMutation.mutateAsync({
          themeId,
          request: {
            ...request,
            searchName: allSearchNames.join(', '),
            synopsis: getText(formData, 'synopsis'),
            genreList: allGenres,
            detailedGenreList: selectedDetailedGenres,
            remark: getText(formData, 'remark'),
            note: getText(formData, 'note'),
            priceList: prices,
            openDate: getText(formData, 'openDate') || null,
            closureExpectedDate:
              getText(formData, 'closureExpectedDate') || null,
            renewalStartDate: getText(formData, 'renewalStartDate') || null,
            renewalEndDate: getText(formData, 'renewalEndDate') || null,
            closureDate: getText(formData, 'closureDate') || null,
          },
        });
      } else {
        await createThemeMutation.mutateAsync({request});
      }
      closeDialog();
    } catch (error) {
      setErrorMessage(
        isApiError(error)
          ? error.message
          : mode === 'edit'
            ? '테마를 수정하지 못했습니다.'
            : '테마를 추가하지 못했습니다.'
      );
    }
  };

  return (
    <ModalLayout
      className='max-w-[32rem]'
      closeLabel={`테마 ${mode === 'edit' ? '수정' : '추가'} 닫기`}
      description='테마 정보를 입력해주세요.'
      descriptionId={descriptionId}
      footerClassName='border-riu-monochrome-50 border-t pt-4'
      noValidate
      submitDisabled={isPending}
      submitLabel={
        isPending
          ? mode === 'edit'
            ? '수정 중'
            : '추가 중'
          : mode === 'edit'
            ? '수정'
            : '추가'
      }
      title={mode === 'edit' ? '테마 수정' : '테마 추가'}
      titleId={titleId}
      onClose={closeDialog}
      onSubmit={handleSubmit}>
      <div
        className='contents'
        onChangeCapture={() => setErrorMessage('')}
        onClickCapture={() => setErrorMessage('')}>
        <Tabs
          aria-label='테마 정보'
          items={tabs}
          tabClassName='w-auto justify-start gap-2 border-b-2 [&>span:last-child]:hidden'
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as ThemeTab);
            setErrorMessage('');
          }}
        />

        <div className={activeTab === 'basic' ? undefined : 'hidden'}>
          <ThemeBasicFields
            initialTheme={initialTheme}
            genreInput={genreInput}
            genres={genres}
            searchNameInput={searchNameInput}
            searchNames={searchNames}
            selectedDetailedGenres={selectedDetailedGenres}
            selectedStore={selectedStore}
            setGenreInput={setGenreInput}
            setGenres={setGenres}
            setSearchNameInput={setSearchNameInput}
            setSearchNames={setSearchNames}
            setSelectedDetailedGenres={setSelectedDetailedGenres}
            setSelectedStore={setSelectedStore}
          />
        </div>
        <div className={activeTab === 'price' ? undefined : 'hidden'}>
          <ThemePriceFields rows={priceRows} setRows={setPriceRows} />
        </div>
        <div className={activeTab === 'dates' ? undefined : 'hidden'}>
          <ThemeDateFields initialTheme={initialTheme} />
        </div>
      </div>

      {errorMessage ? (
        <p role='alert' className='text-caption2 text-destructive'>
          {errorMessage}
        </p>
      ) : null}
    </ModalLayout>
  );
}

function getText(formData: FormData, name: string) {
  return String(formData.get(name) ?? '').trim();
}

function getOptionalText(formData: FormData, name: string) {
  return getText(formData, name) || undefined;
}

function getOptionalNumber(formData: FormData, name: string) {
  const value = getText(formData, name);
  return value ? Number(value) : undefined;
}

function isWithinHalfStepRange(
  value: number | undefined,
  min: number,
  max: number
) {
  return (
    value == null ||
    (Number.isFinite(value) &&
      value >= min &&
      value <= max &&
      Number.isInteger(value * 2))
  );
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export {ThemeFormDialog};
