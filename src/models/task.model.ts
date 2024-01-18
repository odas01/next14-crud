import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface ITask extends Document {
   email: string;
   title: string;
   completed: boolean;
   createdAt: Date;
   updatedAt: Date;
}

const taskSchema = new Schema(
   {
      email: {
         type: String,
         required: true,
      },
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
