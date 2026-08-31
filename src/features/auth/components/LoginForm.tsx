'use client';

import {useState, type FormEvent} from 'react';
import {useRouter} from 'next/navigation';

import {isApiError} from '@/src/shared/api';
import {Input} from '@/src/shared/components/ui/Input';

import {loginAdmin} from '../api/login-api';

const LOGIN_ERROR_MESSAGE = '로그인 요청을 처리하지 못했습니다.';

interface LoginFormProps {
  idPlaceholder?: string;
  passwordPlaceholder?: string;
}

function LoginForm({idPlaceholder, passwordPlaceholder}: LoginFormProps) {
  const router = useRouter();
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const id = String(formData.get('id') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    const nextIdError = id ? '' : '아이디를 입력해 주세요.';
    const nextPasswordError = password ? '' : '비밀번호를 입력해 주세요.';

    setIdError(nextIdError);
    setPasswordError(nextPasswordError);
    setSubmitError('');

    if (nextIdError || nextPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      await loginAdmin({id, password});
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setSubmitError(isApiError(error) ? error.message : LOGIN_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className='flex w-full flex-col gap-4'
      onSubmit={handleSubmit}
      noValidate>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='admin-id'
          className='text-title2 text-riu-monochrome-700'>
          {'아이디'}
        </label>
        <Input
          id='admin-id'
          name='id'
          autoComplete='username'
          aria-invalid={Boolean(idError)}
          aria-describedby={idError ? 'admin-id-error' : undefined}
          disabled={isSubmitting}
          placeholder={idPlaceholder}
        />
        {idError ? (
          <p id='admin-id-error' className='text-caption3 text-destructive'>
            {idError}
          </p>
        ) : null}
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='admin-password'
          className='text-title2 text-riu-monochrome-700'>
          {'비밀번호'}
        </label>
        <Input
          id='admin-password'
          name='password'
          type='password'
          autoComplete='current-password'
          aria-invalid={Boolean(passwordError)}
          aria-describedby={passwordError ? 'admin-password-error' : undefined}
          disabled={isSubmitting}
          placeholder={passwordPlaceholder}
        />
        {passwordError ? (
          <p
            id='admin-password-error'
            className='text-caption3 text-destructive'>
            {passwordError}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p role='alert' className='text-caption3 text-destructive'>
          {submitError}
        </p>
      ) : null}

      <button
        type='submit'
        disabled={isSubmitting}
        className='bg-riu-primary-800 text-button2 hover:bg-riu-primary-800/90 focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-lg border border-transparent text-white transition-all outline-none focus-visible:ring-3 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50'>
        {isSubmitting ? '로그인 중' : '로그인'}
      </button>
    </form>
  );
}

export {LoginForm};
