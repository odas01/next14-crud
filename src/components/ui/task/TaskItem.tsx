'use client';

import { ITask } from '@/types';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { Button, Checkbox, Input } from 'antd';
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
      <div className='flex items-center justify-between py-5 border-t'>
         <div className='flex items-center w-1/2 space-x-4 line-clamp-1'>
            <Checkbox
               checked={completed}
               disabled={isDeleting}
               onChange={onUpdateStatus}
            />

            <h5
               className={`line-clamp-2 text-lg leading-6 ${
                  completed ? 'line-through text-gray-300' : 'text-gray-700'
               }`}
            >
               {title}
            </h5>
         </div>

         <div className='flex space-x-2'>
            {isEdit && (
               <form className='flex' onSubmit={onEditTask}>
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
               icon={<IoTrashOutline />}
            />
         </div>
      </div>
   );
};

export default PlanItem;
