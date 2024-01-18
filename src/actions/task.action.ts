'use server';
import delay from 'delay';
import { revalidatePath } from 'next/cache';

import Task from '@/models/task.model';
import { ITask, Status } from '@/types/task';
import { toJson } from '@/handler/toJson.handler';
import { connectDB } from '@/utils/connectDb';
import { getServerSession } from 'next-auth';

export const getTasksAction = async (status?: Status): Promise<ITask[]> => {
   const session = await getServerSession();
   const email = session?.user?.email;

   let completed = {};
   if (status) {
      completed = {
         completed: status === 'completed',
      };
   }

   try {
      connectDB();
      const tasks = await Task.find({
         ...completed,
         email,
      }).sort('-createdAt');

      return toJson(tasks);
   } catch (err) {
      throw err;
   }
};

export async function createTaskAction(formData: FormData) {
   const title = formData.get('title') as string;

   const session = await getServerSession();
   const email = session?.user?.email;

   try {
      connectDB();

      const task = await Task.create({ email, title, completed: false });
      revalidatePath('/');

      await delay(400);

      return toJson(task);
   } catch (err) {
      throw err;
   }
}

export async function updateTask(id: string, data: Partial<ITask>) {
   try {
      connectDB();
      const newTask = await Task.findByIdAndUpdate(id, data, { new: true });

      revalidatePath('/');

      return { newTask: toJson(newTask) };
   } catch (err) {
      throw err;
   }
}

export async function deleteTask(id: string) {
   try {
      connectDB();
      await Task.findByIdAndDelete(id);
      revalidatePath('/');

      await delay(400);

      return { message: 'Success' };
   } catch (err) {
      throw err;
   }
}
