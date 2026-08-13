import {
  PageTitle,
  PageTitleActionButton,
} from '@/src/shared/components/layout/PageTitle';

function PageTitlePreview() {
  return (
    <section className='mt-10 w-full max-w-[56.2rem] bg-background p-5'>
      <h2 className='mb-5 text-title2 text-riu-monochrome-700'>
        PageTitle Preview
      </h2>

      <div className='space-y-7'>
        <PageTitle
          title='매장 관리'
          subtitle='총 15개의 매장'
          action={<PageTitleActionButton>매장 추가</PageTitleActionButton>}
        />

        <PageTitle title='매장 관리' subtitle='총 15개의 매장' />
      </div>
    </section>
  );
}

export {PageTitlePreview};
