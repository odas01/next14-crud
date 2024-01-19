import { Status } from '@/types';
import { getTasksAction } from '@/actions/task.action';
import { AddTask, TaskList, TaskCount, Header } from '@/components';

interface SearchParams {
   status: Status;
}

export default async function Home({
   searchParams,
}: {
   searchParams: SearchParams;
}) {
   const tasks = await getTasksAction(searchParams.status);

   return (
      <div className='xl:py-8 xl:px-16 md:px-12 p-6 mx-auto bg-white dark:bg-[#121212] md:rounded-3xl xl:w-[60%] md:w-5/6 w-full'>
         <Header />

         <TaskCount count={tasks.length} />
         <AddTask />
         <TaskList tasks={tasks} />
      </div>
   );
}
