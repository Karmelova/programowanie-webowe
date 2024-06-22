export type Task = {
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
};
