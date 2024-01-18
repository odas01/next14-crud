import { TaskItem } from '@/components';
import { ITask } from '@/types';

interface TaskListProps {
   tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
   return (
      <div className='mt-6 space-y-5'>
         {tasks &&
            tasks.map((item, index) => <TaskItem key={index} task={item} />)}
      </div>
   );
};

export default TaskList;
