'use server';
import { revalidatePath } from 'next/cache';

import Task from '@/models/task.model';
import { ITask } from '@/types';
import { toJson } from '@/handler/toJson.handler';

export async function createTaskAction(formData: FormData) {
   const title = formData.get('title') as string;
   try {
      await Task.create({ title, completed: false });

      revalidatePath('/');

      return new Promise((resolve) => setTimeout(resolve, 200));
   } catch (err) {
      throw err;
   }
}

export async function updateTask(id: string, data: Partial<ITask>) {
   try {
      await Task.findByIdAndUpdate(id, data, { new: true });

      revalidatePath('/');

      return new Promise((resolve) => setTimeout(resolve, 1500));
   } catch (err) {
      throw err;
   }
}

export async function deleteTask(id: string) {
   try {
      await Task.findByIdAndDelete(id);
      revalidatePath('/');

      return;
   } catch (err) {
      throw err;
   }
}

export const getTasks = async (): Promise<ITask[]> => {
   try {
      const tasks = await Task.find().sort('-createdAt');
      return toJson(tasks);
   } catch (err) {
      throw err;
   }
};
