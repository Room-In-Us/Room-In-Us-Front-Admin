'use client';

import type {FormEvent} from 'react';
import {useRouter} from 'next/navigation';

import {Button} from '@/src/shared/components/ui/button';
import {Input} from '@/src/shared/components/ui/Input';

function LoginForm() {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };

  return (
    <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='admin-id'
          className='text-title2 text-riu-monochrome-700'
        >
          아이디
        </label>
        <Input
          id='admin-id'
          name='adminId'
          autoComplete='username'
          placeholder='admin'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='admin-password'
          className='text-title2 text-riu-monochrome-700'
        >
          비밀번호
        </label>
        <Input
          id='admin-password'
          name='password'
          type='password'
          autoComplete='current-password'
          placeholder='admin1234'
        />
      </div>

      <Button
        type='submit'
        className='bg-riu-primary-800 text-button2 h-9 w-full text-white hover:bg-riu-primary-800/90'
      >
        로그인
      </Button>
    </form>
  );
}

export {LoginForm};
