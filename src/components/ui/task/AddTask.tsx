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
         <Input
            placeholder='Enter new task'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='flex-1'
            size='large'
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
