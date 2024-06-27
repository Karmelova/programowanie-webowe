import mongoose, { Schema, Document } from 'mongoose';

export interface IStory extends Document {
  uuid: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  projectUuid: string;
  creationDate: Date;
  status: 'todo' | 'doing' | 'done';
  owner?: string;
}

const storySchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  projectUuid: { type: String, required: true },
  creationDate: { type: Date, required: true },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  owner: { type: String },
});

const Story = mongoose.model<IStory>('Story', storySchema);

export default Story;
