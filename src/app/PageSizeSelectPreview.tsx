import {PageSizeSelect} from '@/src/shared/components/ui/PageSizeSelect';

function PageSizeSelectPreview() {
  return (
    <section className='mt-10 w-fit bg-background p-5'>
      <h2 className='mb-5 text-title2 text-riu-monochrome-700'>
        PageSizeSelect Preview
      </h2>

      <PageSizeSelect />
    </section>
  );
}

export {PageSizeSelectPreview};
