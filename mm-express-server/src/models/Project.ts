import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  uuid: string;
  name: string;
  description: string;
}

const ProjectSchema: Schema = new Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
