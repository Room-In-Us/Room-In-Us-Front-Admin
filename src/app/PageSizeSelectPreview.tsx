import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';

function PageSizeSelectPreview() {
  return (
    <section className='bg-background mt-10 w-fit p-5'>
      <h2 className='text-title2 text-riu-monochrome-700 mb-5'>
        PageSizeSelect Preview
      </h2>

      <PageSizeSelect />
    </section>
  );
}

export {PageSizeSelectPreview};
