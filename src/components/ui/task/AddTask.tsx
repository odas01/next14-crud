'use client';

import { useState } from 'react';
import { Button, Input } from 'antd';
import { IoAdd } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';

import { createTaskAction } from '@/actions/task.action';

const AddPlan = () => {
   const [title, setTitle] = useState<string>('');

   const onCreatePlan = async (formData: FormData) => {
      if (title.trim()) {
         await createTaskAction(formData);
         setTitle('');
      }
   };

   return (
      <form className='flex space-x-2' action={onCreatePlan}>
         <input
            placeholder='Enter new task'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='flex-1 !dark:text-white px-4 md:text-base text-sm rounded-lg border border-gray-400 outline-blue-400 dark:outline-gray-500 dark:bg-[#191919] dark:text-white'
         />
         <SubmitButton />
      </form>
   );
};

const SubmitButton = () => {
   const { pending } = useFormStatus();

   return (
      <Button
         type='primary'
         htmlType='submit'
         icon={<IoAdd />}
         loading={pending}
         size='large'
      />
   );
};

export default AddPlan;
