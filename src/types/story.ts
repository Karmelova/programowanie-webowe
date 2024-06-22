export type Story = {
  uuid: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  projectUuid: string;
  creationDate: Date;
  status: 'todo' | 'doing' | 'done';
  owner?: string;
};
