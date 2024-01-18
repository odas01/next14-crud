'use client';

import { Dropdown } from 'antd';
import { GoTriangleDown } from 'react-icons/go';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Status } from '@/types';

interface TaskCountProps {
   count: number | 0;
}

const TaskCount: React.FC<TaskCountProps> = ({ count }) => {
   const tasksChar = count > 1 ? 'tasks' : 'task';

   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();

   const updateSearchQuery = (status?: Status) => {
      const params = new URLSearchParams(searchParams);

      if (status) {
         params.set('status', status);
         replace(`${pathName}?${params.toString()}`);
      } else {
         params.delete('status');
         replace(`${pathName}`);
      }
   };

   return (
      <Dropdown
         menu={{
            items: [
               {
                  key: 1,
                  label: <p onClick={() => updateSearchQuery()}>All</p>,
               },
               {
                  key: 2,
                  label: (
                     <p onClick={() => updateSearchQuery('completed')}>
                        Completed
                     </p>
                  ),
               },
               {
                  key: 3,
                  label: (
                     <p onClick={() => updateSearchQuery('unfinished')}>
                        Unfinished
                     </p>
                  ),
               },
            ],
         }}
      >
         <div className='flex mb-4 text-[#40A2D8] space-x-0.5 w-fit cursor-pointer'>
            <span className='inline-block font-semibold text-lg'>
               {count} {tasksChar}
            </span>
            <GoTriangleDown color='inherit' className='mt-1.5' />
         </div>
      </Dropdown>
   );
};

export default TaskCount;
