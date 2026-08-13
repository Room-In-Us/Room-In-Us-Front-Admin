'use client';

import {IcLayers, IcStore} from '@/src/assets/icons';
import {Tabs} from '@/src/shared/components/ui/Tabs';

function TabsPreview() {
  return (
    <section className='mt-10 w-fit bg-background p-5'>
      <h2 className='mb-5 text-title2 text-riu-monochrome-700'>Tabs Preview</h2>

      <Tabs
        aria-label='테스트용 탭 프리뷰'
        defaultValue='store'
        items={[
          {value: 'store', label: '매장', count: 4, icon: IcStore},
          {value: 'theme', label: '테마', count: 5, icon: IcLayers},
        ]}
      />
    </section>
  );
}

export {TabsPreview};
