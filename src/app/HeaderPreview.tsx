import {Header} from '@/src/shared/components/layout/Header';

function HeaderPreview() {
  return (
    <section className='mt-10 bg-background p-5'>
      <h2 className='mb-5 text-title2 text-riu-monochrome-700'>Header Preview</h2>

      <div className='w-full max-w-[1179.2px] overflow-hidden border border-riu-monochrome-30 bg-surface'>
        <Header />
      </div>
    </section>
  );
}

export {HeaderPreview};
