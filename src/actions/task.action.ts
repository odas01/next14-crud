'use server';
import delay from 'delay';
import { revalidatePath } from 'next/cache';

import Task from '@/models/task.model';
import { ITask } from '@/types/task';
import { toJson } from '@/handler/toJson.handler';

export async function createTaskAction(formData: FormData) {
   const title = formData.get('title') as string;

   try {
      const task = await Task.create({ title, completed: false });

      revalidatePath('/');

      await delay(1000);

      return { task: toJson(task) };
   } catch (err) {
      throw err;
   }
}

export async function updateTask(id: string, data: Partial<ITask>) {
   try {
      const newTask = await Task.findByIdAndUpdate(id, data, { new: true });

      revalidatePath('/');

      return { newTask: toJson(newTask) };
   } catch (err) {
      throw err;
   }
}

export async function deleteTask(id: string) {
   try {
      await Task.findByIdAndDelete(id);
      revalidatePath('/');

      await delay(1000);

      return { message: 'Success' };
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
