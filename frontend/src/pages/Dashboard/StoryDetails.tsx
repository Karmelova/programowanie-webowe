import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Story } from '../../types/story';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getStoryById, updateStory } from '../../api/Stories/storyService';
import { createTask } from '../../api/Tasks/taskService';
import { Task } from '../../types/tasks';

const StoryDetails: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] =
    useState<Story['priority']>('low');
    const [newTaskStatus, setNewTaskStatus] = useState<Story['status']>('todo');
  const [newTaskOwner, setNewTaskOwner] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const fetchedStory = await getStoryById(uuid as string);
        setStory(fetchedStory);
        setName(fetchedStory.name);
        setDescription(fetchedStory.description);
        setPriority(fetchedStory.priority);
        setStatus(fetchedStory.status);
        setOwner(fetchedStory.owner || '');
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    if (uuid) {
      fetchStory();
    }
  }, [uuid]);

  const updateStoryOnChange = async () => {
    if (!story) return;

    const updatedStory = {
      ...story,
      name,
      description,
      priority,
      status,
      owner,
    };

    try {
      //@ts-ignore
      const savedStory = await updateStory(story.uuid, updatedStory);
      setStory(savedStory);
      console.log('Story updated successfully:', savedStory);
    } catch (error) {
      console.error('Error updating story:', error);
    }
  };

  useEffect(() => {
    if (story && (
      story.name !== name ||
      story.description !== description ||
      story.priority !== priority ||
      story.status !== status ||
      story.owner !== owner
    )) {
      updateStoryOnChange();
    }
  }, [name, description, priority, status, owner, story]);

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

  const handleAddTask = async () => {
    const newTask = {
      uuid: '',
      name: newTaskName,
      description: newTaskDescription,
      priority: newTaskPriority,
      storyUuid: uuid,
      status: newTaskStatus,
      owner: '',
      addDate: new Date(),
      estimatedTime: null,
      startDate: null,
      endDate: null,
    };

    try {
      console.log(newTask);
      //@ts-ignore
      const createdTask = await createTask(newTask);
      console.log(createdTask);
      setTasks([...tasks, createdTask]);
      setNewTaskName('');
      setNewTaskDescription('');
      setNewTaskPriority('low');
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };


  if (!story) {
    return <p>Loading...</p>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Story Details" />
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
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark mt-4 w-40"
          >
            Add Task
          </button>
        </div>
      </div>
      {/* Modal add story */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-bodydark rounded-lg w-96 p-6">
            <h3 className="font-medium text-black dark:text-white mb-4">
              Add New Task
            </h3>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label
                  htmlFor="taskName"
                  className="mb-3 block text-black dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  name="name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="taskDescription"
                  className="mb-3 block text-black dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="taskDescription"
                  name="description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="taskPriority"
                  className="mb-3 block text-black dark:text-white"
                >
                  Priority
                </label>
                <select
                  id="taskPriority"
                  name="priority"
                  value={newTaskPriority}
                  onChange={(e) =>
                    setNewTaskPriority(
                      e.target.value as 'low' | 'medium' | 'high',
                    )
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="taskStatus"
                  className="mb-3 block text-black dark:text-white"
                >
                  Status
                </label>
                <select
                  id="taskStatus"
                  name="status"
                  value={newTaskStatus}
                  onChange={(e) =>
                    setNewTaskStatus(
                      e.target.value as 'todo' | 'doing' | 'done',
                    )
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-[#F87171] text-white rounded-md hover:bg-primary-dark"
                  onClick={() => {
                    setShowAddModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleAddTask();
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* end of modal add story */}
    </DefaultLayout>
  );
};

export default StoryDetails;
