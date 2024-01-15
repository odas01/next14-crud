import { IUSer } from '.';

export interface ITask {
   _id: string;
   user: IUser;
   title: string;
   completed: boolean;
   createdAt: Date;
}

export interface TaskForm {
   title: string;
   completed: boolean;
}
