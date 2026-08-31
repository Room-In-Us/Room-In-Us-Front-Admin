import LoginImage from '@/src/assets/images/login.svg';
import {LoginForm} from '@/src/features/auth/components/LoginForm';

export default function LoginPage() {
  const testAdminId = process.env.NEXT_PUBLIC_TEST_ADMIN_ID;
  const testAdminPassword = process.env.NEXT_PUBLIC_TEST_ADMIN_PASSWORD;
  const shouldShowTestAccount =
    process.env.NEXT_PUBLIC_SHOW_TEST_ACCOUNT === 'true' &&
    Boolean(testAdminId && testAdminPassword);

  return (
    <main className='flex min-h-dvh items-center justify-center bg-[linear-gradient(108deg,#9fabf7_0.85%,#85bfb3_100%)] px-4 py-4'>
      <section
        aria-labelledby='login-title'
        className='flex w-full max-w-[27.5rem] flex-col items-center gap-6 rounded-[14px] border border-black/10 bg-white p-[1.55rem]'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <LoginImage
            aria-hidden
            className='size-[4.5rem] shrink-0'
            focusable='false'
          />

          <div className='text-center'>
            <h1 id='login-title' className='text-h1 text-riu-monochrome-700'>
              {'루미너스 어드민'}
            </h1>
            <p className='text-caption1 text-riu-monochrome-200 mt-4'>
              {'관리자 로그인'}
            </p>
          </div>
        </div>

        <div className='flex w-full flex-col gap-4'>
          <LoginForm
            idPlaceholder={shouldShowTestAccount ? testAdminId : undefined}
            passwordPlaceholder={
              shouldShowTestAccount ? testAdminPassword : undefined
            }
          />

          {shouldShowTestAccount ? (
            <aside className='bg-riu-monochrome-10 flex w-full flex-col gap-1 rounded-sm p-3'>
              <p className='text-title2 text-riu-monochrome-500'>
                {'테스트 계정'}
              </p>
              <p className='text-caption3 text-riu-monochrome-500'>
                {`아이디: ${testAdminId}`}
              </p>
              <p className='text-caption3 text-riu-monochrome-500'>
                {`비밀번호: ${testAdminPassword}`}
              </p>
            </aside>
          ) : null}
        </div>
      </section>
    </main>
  );
}
