export type Task = {
  uuid: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyUuid: string;
  status: 'todo' | 'doing' | 'done';
  owner?: string;
  addDate: Date;
  estimatedTime: number;
  startDate?: Date;
  endDate?: Date;
};
