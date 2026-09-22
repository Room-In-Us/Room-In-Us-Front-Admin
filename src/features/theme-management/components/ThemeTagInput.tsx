import {type KeyboardEvent} from 'react';

import {Input} from '@/src/shared/components/ui/Input';
import {IcX} from '@/src/assets/icons';

type ThemeTagInputProps = {
  id: string;
  label: string;
  placeholder: string;
  tags: string[];
  inputValue: string;
  onTagsChange: (tags: string[]) => void;
  onInputChange: (value: string) => void;
};

function ThemeTagInput({
  id,
  label,
  placeholder,
  tags,
  inputValue,
  onTagsChange,
  onInputChange,
}: ThemeTagInputProps) {
  const addTag = () => {
    const value = inputValue.trim();
    if (value && !tags.includes(value)) {
      onTagsChange([...tags, value]);
    }
    onInputChange('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
    event.preventDefault();
    addTag();
  };

  return (
    <div className='flex min-w-0 flex-col gap-2'>
      <label className='text-body3 text-riu-monochrome-800' htmlFor={id}>
        {label}
      </label>
      <div className='border-riu-monochrome-50 flex min-h-[3.625rem] flex-col gap-2.5 rounded-lg border bg-white p-2.5'>
        {tags.length > 0 ? (
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='bg-status-upcoming-background text-status-upcoming-foreground text-body4 inline-flex h-[1.625rem] items-center gap-1 rounded-lg px-2.5'>
                {tag}
                <button
                  aria-label={`${label} ${tag} 삭제`}
                  className='hover:bg-status-upcoming-foreground/10 flex size-4 items-center justify-center rounded-full'
                  type='button'
                  onClick={() =>
                    onTagsChange(tags.filter((item) => item !== tag))
                  }>
                  <IcX aria-hidden='true' className='size-3' />
                </button>
              </span>
            ))}
          </div>
        ) : null}
        <Input
          className='placeholder:text-riu-monochrome-100'
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export {ThemeTagInput};
