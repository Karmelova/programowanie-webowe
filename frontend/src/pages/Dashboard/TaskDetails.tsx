import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Task } from '../../types/tasks';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getTaskById, updateTask } from '../../api/Tasks/taskService';
import { createTask } from '../../api/Tasks/taskService';

const TaskDetails: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTaskById(uuid as string);
        setTask(fetchedTask);
        setName(fetchedTask.name);
        setDescription(fetchedTask.description);
        setPriority(fetchedTask.priority);
        setStatus(fetchedTask.status);
        setOwner(fetchedTask.owner || '');
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (uuid) {
      fetchTask();
    }
  }, [uuid]);

  const updateTaskOnChange = async () => {
    if (!task) return;

    const updatedTask = {
      ...task,
      name,
      description,
      priority,
      status,
      owner,
    };

    try {
      //@ts-ignore
      const savedTask = await updateTask(task.uuid, updatedTask);
      setTask(savedTask);
      console.log('Task updated successfully:', savedTask);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    if (
      task &&
      (task.name !== name ||
        task.description !== description ||
        task.priority !== priority ||
        task.status !== status ||
        task.owner !== owner)
    ) {
      updateTaskOnChange();
    }
  }, [name, description, priority, status, owner, task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'priority':
        setPriority(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'owner':
        setOwner(value);
        break;
      default:
        break;
    }
  };


  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Task Details" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3  p-4 bg-white dark:bg-boxdark text-black dark:text-white rounded-lg shadow-md">
        <div className="col-span-2">
          <h1 className="text-2xl font-bold mb-4">
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </h1>
          <p className="mb-4">
            <textarea
              name="description"
              value={description}
              //@ts-ignore
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </p>
        </div>
        <div className="flex flex-col">
          <label>
            Priority:
            <select
              name="priority"
              value={priority}
              onChange={handleChange}
              className="py-3 outline-none focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-transparent"
            >
              <option
                value="low"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                Low
              </option>
              <option
                value="medium"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                Medium
              </option>
              <option
                value="high"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                High
              </option>
            </select>
          </label>

          <label>
            Status:
            <select
              name="status"
              value={status}
              onChange={handleChange}
              className="py-3 outline-none focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-transparent dark:bg-form-input"
            >
              <option
                value="todo"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                To Do
              </option>
              <option
                value="doing"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                Doing
              </option>
              <option
                value="done"
                className="text-body dark:text-bodydark dark:bg-form-input"
              >
                Done
              </option>
            </select>
          </label>
          <label>
            Owner:
            <input
              type="text"
              name="owner"
              value={owner}
              onChange={handleChange}
              className="  border-stroke bg-transparent py-3 px-1 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark  dark:text-white dark:focus:border-primary"
            />
          </label>
         
        </div>
      </div>
      
    </DefaultLayout>
  );
};

export default TaskDetails;
