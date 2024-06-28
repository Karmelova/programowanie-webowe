import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { createStory, getStories } from '../../api/Stories/storyService';
import { Story } from '../../types/story';
import { getUserActiveProject } from '../../api/Projects/projectService';
import { Link } from 'react-router-dom';

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStoryName, setNewStoryName] = useState('');
  const [activeProject, setactiveProject] = useState('');
  const [newStoryDescription, setNewStoryDescription] = useState('');
  const [newStoryPriority, setNewStoryPriority] =
    useState<Story['priority']>('low');
  const [newStoryStatus, setNewStoryStatus] = useState<Story['status']>('todo');

  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    { title: 'To Do', status: 'todo' },
    { title: 'Doing', status: 'doing' },
    { title: 'Done', status: 'done' },
  ];

  const handleAddStory = async () => {
    const newStory = {
      uuid: '',
      name: newStoryName,
      description: newStoryDescription,
      priority: newStoryPriority,
      projectUuid: activeProject,
      status: newStoryStatus,
      creationDate: new Date(),
      owner: '', 
    }

    try {
      const createdStory = await createStory(newStory);
      console.log(createdStory);
      setStories([...stories, createdStory]);
      setNewStoryName('');
      setNewStoryDescription('');
      setNewStoryPriority('low');
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const activeUserStory = await getUserActiveProject();
        setactiveProject(activeUserStory.toString())
        //@ts-ignore
        const data = await getStories(activeUserStory.toString());
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handlePlusClick = () => {
    setShowAddModal(true);
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="
      Project Stories"
      />
      <div className="flex gap-4">
        {columns.map((column) => (
          <div className="w-1/3 p-2 rounded-lg text-center justify-center relative">
            <div
              className="w-full p-2 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-lg text-center justify-center relative"
              key={column.status}
            >
              <h2 className="text-xl font-bold text-black dark:text-white">{column.title}</h2>
              {column.status === 'todo' && (
                <div className="absolute w-4 p-2 -top-0.5  -top-0.">
                  <button className="absolute w-4" onClick={handlePlusClick}>
                    <p className=" font-bold text-2xl">+</p>
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-4 mt-3">
            {stories
                .filter((story) => story.status === column.status)
                .map((story) => (
                  <div
                    key={story.uuid}
                    className="p-4 bg-[#E6E7E8] dark:bg-[#444B54] text-black dark:text-white rounded-lg shadow"
                  >
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-black dark:text-white">{story.description}</p>
                    <Link to={`/stories/${story.uuid}`} className="text-blue-500 hover:underline">See Story</Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      {/* Modal add story */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="relative bg-white shadow-default dark:border-strokedark dark:bg-boxdark dark:text-bodydark rounded-lg w-96 p-6">
            <h3 className="font-medium text-black dark:text-white mb-4">
              Add New Story
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="storyName"
                  className="mb-3 block text-black dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="storyName"
                  name="name"
                  value={newStoryName}
                  onChange={(e) => setNewStoryName(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="storyDescription"
                  className="mb-3 block text-black dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="storyDescription"
                  name="description"
                  value={newStoryDescription}
                  onChange={(e) => setNewStoryDescription(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="storyPriority"
                  className="mb-3 block text-black dark:text-white"
                >
                  Priority
                </label>
                <select
                  id="storyPriority"
                  name="priority"
                  value={newStoryPriority}
                  onChange={(e) =>
                    setNewStoryPriority(e.target.value as Story['priority'])
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
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
                    handleAddStory();
                    setShowAddModal(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Add Story
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

export default Stories;
