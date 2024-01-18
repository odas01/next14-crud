'use client';

import { ITask } from '@/types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCheckmarkSharp, IoTrashOutline } from 'react-icons/io5';
import { Button, Input } from 'antd';
import { deleteTask, updateTask } from '@/actions/task.action';

interface ITaskItemProps {
   task: ITask;
}

const PlanItem: React.FC<ITaskItemProps> = ({ task }) => {
   const { _id, title, completed } = task;

   const [editValue, setEditValue] = useState<string>('');
   const [isEdit, setIsEdit] = useState<boolean>(false);
   const [isEditing, setIsEditing] = useState<boolean>(false);

   const [isDeleting, setIsDeleting] = useState<boolean>(false);

   const onUpdateStatus = async () => {
      await updateTask(_id, { completed: !completed });
   };

   const onEditTask = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (editValue.trim()) {
         setIsEditing(true);
         await updateTask(_id, { title: editValue });
         setIsEditing(false);
         setIsEdit(false);
      }
   };

   const onDeleteTask = async () => {
      setIsDeleting(true);
      await deleteTask(_id);
      setIsDeleting(false);
   };

   return (
      <div className='flex items-center justify-between xl:px-6 xl:py-4 p-3 bg-[#f2f2f2] rounded-lg shadow'>
         <div
            className='flex items-center w-1/2 space-x-4 line-clamp-1 cursor-pointer group'
            onClick={onUpdateStatus}
         >
            {/* <Checkbox checked={completed} disabled={isDeleting} /> */}
            {completed ? (
               <IoCheckmarkSharp size={20} color='#00A9FF' />
            ) : (
               <span className='w-5 aspect-square border border-gray-400 rounded-full' />
            )}

            <h5
               className={`line-clamp-1 xl:text-lg text-sm leading-6 duration-150 flex-1 ${
                  completed ? 'line-through text-gray-300' : 'text-gray-700'
               }`}
            >
               {title}
            </h5>
         </div>

         <div className='flex space-x-2'>
            {isEdit && (
               <form className='flex-1' onSubmit={onEditTask}>
                  <Input
                     value={editValue}
                     onChange={(e) => setEditValue(e.target.value)}
                     onKeyDown={(e) => e.key === 'Escape' && setIsEdit(false)}
                     readOnly={isEditing}
                  />
               </form>
            )}
            <Button
               danger
               type='primary'
               loading={isEditing}
               disabled={completed}
               onClick={() => {
                  setIsEdit(!isEdit);
                  setEditValue(title);
               }}
               icon={<FaRegEdit />}
            />
            <Button
               danger
               type='primary'
               loading={isDeleting}
               onClick={onDeleteTask}
               icon={<IoTrashOutline />}
            />
         </div>
      </div>
   );
};

export default PlanItem;
