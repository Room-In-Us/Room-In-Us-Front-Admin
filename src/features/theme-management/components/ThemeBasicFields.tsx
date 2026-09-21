'use client';

import {useId, useState, type Dispatch, type SetStateAction} from 'react';
import {X} from 'lucide-react';

import {IcChevronDown} from '@/src/assets/icons';
import {type AdminApiTypes} from '@/src/shared/api';
import {Input} from '@/src/shared/components/ui/Input';

import {useStoreListQuery} from '../../store-management/api/store-queries';
import {ThemeInputField} from './ThemeInputField';
import {ThemeTagInput} from './ThemeTagInput';

type DetailedGenre = NonNullable<
  AdminApiTypes.PostThemeRequest['detailedGenreList']
>[number];
type SelectedStore = {id: number; name: string};

type ThemeBasicFieldsProps = {
  initialTheme?: AdminApiTypes.GetThemeDetailResponse;
  selectedStore: SelectedStore | null;
  setSelectedStore: Dispatch<SetStateAction<SelectedStore | null>>;
  searchNameInput: string;
  setSearchNameInput: Dispatch<SetStateAction<string>>;
  searchNames: string[];
  setSearchNames: Dispatch<SetStateAction<string[]>>;
  genreInput: string;
  setGenreInput: Dispatch<SetStateAction<string>>;
  genres: string[];
  setGenres: Dispatch<SetStateAction<string[]>>;
  selectedDetailedGenres: DetailedGenre[];
  setSelectedDetailedGenres: Dispatch<SetStateAction<DetailedGenre[]>>;
};

const detailedGenres: {value: DetailedGenre; label: string}[] = [
  {value: 'SF', label: 'SF'},
  {value: 'SENTIMENTAL', label: '감성'},
  {value: 'HORROR', label: '공포'},
  {value: 'DETECTIVE', label: '추리'},
  {value: 'MYSTERY', label: '미스터리'},
  {value: 'COMIC', label: '코믹'},
  {value: 'FANTASY', label: '판타지'},
  {value: 'ADVENTURE', label: '어드벤처'},
  {value: 'ESCAPE', label: '탈출/잠입'},
  {value: 'DRAMA', label: '드라마'},
  {value: 'ROMANCE', label: '로맨스'},
  {value: 'HISTORY', label: '사극'},
  {value: 'FAIRY_TALE', label: '동화'},
  {value: 'ARCADE', label: '아케이드'},
  {value: 'SURVIVAL', label: '생존'},
  {value: 'PROBLEM', label: '문제방'},
  {value: 'ACTION', label: '액션'},
  {value: 'ADULT', label: '19금'},
  {value: 'OUTDOOR', label: '야외'},
  {value: 'THRILLER', label: '스릴러'},
  {value: 'ETC', label: '기타'},
];

function ThemeBasicFields({
  initialTheme,
  selectedStore,
  setSelectedStore,
  searchNameInput,
  setSearchNameInput,
  searchNames,
  setSearchNames,
  genreInput,
  setGenreInput,
  genres,
  setGenres,
  selectedDetailedGenres,
  setSelectedDetailedGenres,
}: ThemeBasicFieldsProps) {
  const [storeSearch, setStoreSearch] = useState(initialTheme?.storeName ?? '');
  const [storeListOpen, setStoreListOpen] = useState(false);
  const [detailedGenreOpen, setDetailedGenreOpen] = useState(false);
  const detailedGenreMenuId = useId();
  const storeListQuery = useStoreListQuery({
    keyword: storeSearch.trim() || undefined,
    page: 1,
    size: 20,
  });

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='relative flex min-w-0 flex-col gap-2'>
          <label
            className='text-body3 text-riu-monochrome-800'
            htmlFor='theme-add-store'>
            매장 *
          </label>
          <Input
            autoComplete='off'
            id='theme-add-store'
            placeholder='매장 검색'
            value={selectedStore?.name ?? storeSearch}
            variant='search'
            onChange={(event) => {
              setSelectedStore(null);
              setStoreSearch(event.target.value);
              setStoreListOpen(true);
            }}
            onFocus={() => setStoreListOpen(true)}
          />
          {storeListOpen ? (
            <div className='border-riu-monochrome-50 absolute top-full z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border bg-white py-1 shadow-lg'>
              {storeListQuery.isLoading ? (
                <p className='text-caption2 text-riu-monochrome-100 px-3 py-2'>
                  매장을 불러오는 중입니다.
                </p>
              ) : storeListQuery.isError ? (
                <p className='text-caption2 text-destructive px-3 py-2'>
                  매장을 불러오지 못했습니다.
                </p>
              ) : storeListQuery.data?.stores.length ? (
                storeListQuery.data.stores.map((store) => (
                  <button
                    key={store.id}
                    className='text-body3 text-riu-monochrome-800 hover:bg-riu-monochrome-20 block w-full px-3 py-2 text-left'
                    type='button'
                    onClick={() => {
                      setSelectedStore({id: store.id, name: store.name});
                      setStoreSearch(store.name);
                      setStoreListOpen(false);
                    }}>
                    {store.name}
                  </button>
                ))
              ) : (
                <p className='text-caption2 text-riu-monochrome-100 px-3 py-2'>
                  검색 결과가 없습니다.
                </p>
              )}
            </div>
          ) : null}
        </div>
        <ThemeInputField
          name='name'
          label='테마명 *'
          defaultValue={initialTheme?.name}
        />
        <ThemeTagInput
          id='theme-add-searchName'
          inputValue={searchNameInput}
          label='테마 검색명'
          placeholder='검색명 입력 후 엔터...'
          tags={searchNames}
          onInputChange={setSearchNameInput}
          onTagsChange={setSearchNames}
        />
        <ThemeInputField
          name='img'
          label='이미지 URL *'
          type='url'
          defaultValue={initialTheme?.img}
        />
      </div>
      <ThemeInputField
        name='playTime'
        label='플레이타임 (분)'
        defaultValue={initialTheme?.playTime}
        type='number'
        min={0}
        step={1}
      />
      <label
        className='flex min-w-0 flex-col gap-2'
        htmlFor='theme-add-synopsis'>
        <span className='text-body3 text-riu-monochrome-800'>시놉시스</span>
        <textarea
          className='border-input bg-input text-body3 text-riu-monochrome-700 placeholder:text-riu-monochrome-300 focus-visible:border-riu-primary-500 focus-visible:bg-riu-monochrome-10 min-h-16 w-full resize-none rounded-lg border px-3 py-2 outline-none'
          id='theme-add-synopsis'
          defaultValue={initialTheme?.synopsis}
          name='synopsis'
          placeholder='시놉시스 입력'
          rows={3}
        />
      </label>
      <div className='grid grid-cols-3 gap-4'>
        <ThemeInputField
          name='level'
          defaultValue={initialTheme?.level}
          label='난이도 (1-5)'
          type='number'
          min={1}
          max={5}
          step={0.5}
        />
        <ThemeInputField
          name='horrorLevel'
          defaultValue={initialTheme?.horrorLevel}
          label='공포도 (0-5)'
          type='number'
          min={0}
          max={5}
          step={0.5}
        />
        <ThemeInputField
          name='activityLevel'
          defaultValue={initialTheme?.activityLevel}
          label='활동성 (1-5)'
          type='number'
          min={1}
          max={5}
          step={0.5}
        />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <ThemeTagInput
          id='theme-add-genre'
          inputValue={genreInput}
          label='텍스트 장르'
          placeholder='장르 입력 후 엔터...'
          tags={genres}
          onInputChange={setGenreInput}
          onTagsChange={setGenres}
        />
        <div
          className='relative flex min-w-0 flex-col gap-2'
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setDetailedGenreOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && detailedGenreOpen) {
              event.stopPropagation();
              setDetailedGenreOpen(false);
            }
          }}>
          <span className='text-body3 text-riu-monochrome-800'>
            상세 장르 (선택)
          </span>
          <div className='border-riu-monochrome-70 relative flex min-h-[3.625rem] flex-1 items-center justify-between gap-2 rounded-lg border bg-white p-2'>
            <button
              aria-controls={detailedGenreMenuId}
              aria-expanded={detailedGenreOpen}
              aria-label='상세 장르 선택'
              className='focus-visible:outline-riu-primary-500 absolute inset-0 rounded-lg focus-visible:outline-2'
              type='button'
              onClick={() => setDetailedGenreOpen(!detailedGenreOpen)}
            />
            <div className='pointer-events-none relative flex min-w-0 flex-1 flex-wrap gap-1'>
              {selectedDetailedGenres.length ? (
                selectedDetailedGenres.map((value) => {
                  const label = detailedGenres.find(
                    (genre) => genre.value === value
                  )?.label;

                  return (
                    <span
                      key={value}
                      className='bg-status-upcoming-background text-link text-body4 inline-flex h-6 items-center gap-1 rounded-full px-2'>
                      {label}
                      <button
                        aria-label={`${label} 상세 장르 삭제`}
                        className='hover:bg-link/10 pointer-events-auto flex size-4 items-center justify-center rounded-full'
                        type='button'
                        onClick={() =>
                          setSelectedDetailedGenres(
                            selectedDetailedGenres.filter(
                              (item) => item !== value
                            )
                          )
                        }>
                        <X aria-hidden='true' className='size-3' />
                      </button>
                    </span>
                  );
                })
              ) : (
                <span className='text-body3 text-riu-monochrome-70'>
                  장르 선택...
                </span>
              )}
            </div>
            <IcChevronDown
              aria-hidden='true'
              className={`text-riu-monochrome-100 pointer-events-none relative size-4 shrink-0 transition-transform ${detailedGenreOpen ? 'rotate-180' : ''}`}
            />
          </div>
          {detailedGenreOpen ? (
            <div
              id={detailedGenreMenuId}
              className='border-riu-monochrome-30 absolute top-full z-10 mt-[10px] grid max-h-[min(30rem,60dvh)] w-full grid-cols-2 gap-1 overflow-y-auto rounded-lg border bg-white p-2 shadow-lg'>
              {detailedGenres.map((genre) => (
                <label
                  key={genre.value}
                  className='text-body3 text-riu-monochrome-800 hover:bg-riu-monochrome-10 flex min-h-9 items-center gap-2 rounded px-2'>
                  <input
                    checked={selectedDetailedGenres.includes(genre.value)}
                    className='accent-link border-riu-monochrome-100 size-4 shrink-0'
                    type='checkbox'
                    onChange={(event) =>
                      setSelectedDetailedGenres(
                        event.target.checked
                          ? [...selectedDetailedGenres, genre.value]
                          : selectedDetailedGenres.filter(
                              (value) => value !== genre.value
                            )
                      )
                    }
                  />
                  {genre.label}
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <ThemeInputField
          name='minRecommendedHeadcount'
          defaultValue={initialTheme?.minRecommendedHeadcount}
          label='최소 추천 인원'
          type='number'
          min={1}
          step={1}
        />
        <ThemeInputField
          name='maxRecommendedHeadcount'
          defaultValue={initialTheme?.maxRecommendedHeadcount}
          label='최대 추천 인원'
          type='number'
          min={1}
          step={1}
        />
        <ThemeInputField
          name='remark'
          label='특이사항'
          defaultValue={initialTheme?.remark}
        />
        <ThemeInputField
          name='note'
          label='비고'
          defaultValue={initialTheme?.note}
        />
      </div>
    </div>
  );
}

export {ThemeBasicFields, type DetailedGenre, type SelectedStore};
