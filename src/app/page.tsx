import { AddTask, TaskItem } from '@/components';

import { getTasks } from '@/actions/task.action';

export default async function Home() {
   const tasks = await getTasks();

   return (
      <div className='p-8 w-1/2 mx-auto shadow-lg'>
         <h2 className='text-center text-3xl font-medium mb-4'>TODO LIST</h2>

         <AddTask />
         <div className='mt-8'>
            {tasks &&
               tasks.map((item, index) => <TaskItem key={index} task={item} />)}
         </div>
      </div>
   );
}
