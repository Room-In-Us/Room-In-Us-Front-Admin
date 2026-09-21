import {type AdminApiTypes} from '@/src/shared/api';
import {Input} from '@/src/shared/components/ui/Input';

type ThemeDetail = AdminApiTypes.GetThemeDetailResponse;
type ThemeDateFieldName =
  | 'openDate'
  | 'closureExpectedDate'
  | 'renewalStartDate'
  | 'renewalEndDate'
  | 'closureDate';

type ThemeInputFieldProps = {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'url' | 'date';
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string | number;
};

const dateFields: (ThemeInputFieldProps & {name: ThemeDateFieldName})[] = [
  {name: 'openDate', label: '오픈일', type: 'date'},
  {name: 'closureExpectedDate', label: '폐업 예정일', type: 'date'},
  {name: 'renewalStartDate', label: '리뉴얼 시작일', type: 'date'},
  {name: 'renewalEndDate', label: '리뉴얼 종료일', type: 'date'},
  {name: 'closureDate', label: '폐업일', type: 'date'},
];

function ThemeInputField({
  name,
  label,
  type = 'text',
  min,
  max,
  step,
  defaultValue,
}: ThemeInputFieldProps) {
  const id = `theme-add-${name}`;

  return (
    <label className='flex min-w-0 flex-col gap-2' htmlFor={id}>
      <span className='text-body3 text-riu-monochrome-800'>{label}</span>
      <Input
        defaultValue={defaultValue}
        id={id}
        max={max}
        min={min}
        name={name}
        step={step}
        type={type}
      />
    </label>
  );
}

function ThemeDateFields({initialTheme}: {initialTheme?: ThemeDetail}) {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <h3 className='text-body3 text-riu-monochrome-800'>운영 날짜 정보</h3>
        <p className='text-caption3 text-riu-monochrome-100 mt-2'>
          날짜 정보를 기반으로 운영 상태가 자동으로 계산됩니다.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {dateFields.map((field) => (
          <ThemeInputField
            key={field.name}
            {...field}
            defaultValue={initialTheme?.[field.name]}
          />
        ))}
      </div>
    </div>
  );
}

export {ThemeDateFields, ThemeInputField};
