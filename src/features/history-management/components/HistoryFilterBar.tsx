import {Input} from '@/src/shared/components/ui/Input';
import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';

const pageSizeOptions = [
  {value: '5', label: '5'},
  {value: '10', label: '10'},
  {value: '20', label: '20'},
];

type HistoryFilterBarProps = {
  pageSize: string;
  startDate: string;
  endDate: string;
  onPageSizeChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
};

function HistoryFilterBar({
  pageSize,
  startDate,
  endDate,
  onPageSizeChange,
  onStartDateChange,
  onEndDateChange,
}: HistoryFilterBarProps) {
  return (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-3'>
      <PageSizeSelect
        label='페이지 크기:'
        options={pageSizeOptions}
        value={pageSize}
        onValueChange={onPageSizeChange}
      />

      <HistoryDatePicker
        id='history-start-date'
        label='조회 시작일:'
        value={startDate}
        max={endDate || undefined}
        onChange={onStartDateChange}
      />

      <HistoryDatePicker
        id='history-end-date'
        label='조회 종료일:'
        value={endDate}
        min={startDate || undefined}
        onChange={onEndDateChange}
      />
    </div>
  );
}

function HistoryDatePicker({
  id,
  label,
  value,
  min,
  max,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min?: string;
  max?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className='flex min-w-[16rem] flex-1 items-center gap-2'>
      <label
        htmlFor={id}
        className='text-body3 text-riu-monochrome-800 shrink-0'>
        {label}
      </label>

      <Input
        id={id}
        type='date'
        value={value}
        min={min}
        max={max}
        aria-label={label}
        className='w-[11.25rem] flex-none'
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export {HistoryFilterBar};
