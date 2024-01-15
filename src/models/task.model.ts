import mongoose, { Document, Schema } from 'mongoose';

import { connectDB } from '@/libs/mongoose.lib';

connectDB();

interface ITask extends Document {
   title: string;
   completed: boolean;
   createdAt: Date;
   updatedAt: Date;
}

const taskSchema = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      completed: {
         type: Boolean,
         default: false,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const TaskModel =
   mongoose.models?.Task || mongoose.model<ITask>('Task', taskSchema);

export default TaskModel;
