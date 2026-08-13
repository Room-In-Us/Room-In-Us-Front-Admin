import {Header} from '@/src/shared/components/layout/Header';

function HeaderPreview() {
  return (
    <section className='bg-background mt-10 p-5'>
      <h2 className='text-title2 text-riu-monochrome-700 mb-5'>
        Header Preview
      </h2>

      <div className='border-riu-monochrome-30 bg-surface w-full max-w-[1179.2px] overflow-hidden border'>
        <Header />
      </div>
    </section>
  );
}

export {HeaderPreview};
