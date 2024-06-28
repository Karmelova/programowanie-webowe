import mongoose, { Schema, Document } from 'mongoose';

export interface IModel extends Document {
  uuid: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyUuid: string;
  addDate: Date;
  status: 'todo' | 'doing' | 'done';
  owner?: string;
  estimatedTime: number;
  startDate?: Date;
  endDate?: Date;
}

const taskSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyUuid: { type: String, required: true },
  addDate: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  owner: { type: String },
  estimatedTime: { type: Number},
  startDate: { type: Date },
  endDate: { type: Date },
});

const Task = mongoose.model<IModel>('Task', taskSchema);

export default Task;
