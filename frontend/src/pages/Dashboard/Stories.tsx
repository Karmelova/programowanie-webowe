import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getStories } from '../../api/Stories/storyService';
import { Story } from '../../types/story';
import { getUserActiveProject } from '../../api/Projects/projectService';

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const activeUserStory = await getUserActiveProject();
        const data = await getStories(activeUserStory.toString());
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const columns = [
    { title: 'To Do', status: 'todo' },
    { title: 'Doing', status: 'doing' },
    { title: 'Done', status: 'done' },
  ];

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
          <div
            className="w-1/3 p-2 bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none rounded-lg text-center justify-center relative"
            key={column.status}
          >
            <h2 className="text-xl font-bold ">{column.title}</h2>
            {column.status === 'todo' && (
              <div className="absolute w-4 p-2 -top-0.5  -top-0.">
                <button className="absolute w-4" onClick={handlePlusClick}>
                  <p className=" font-bold text-2xl">+</p>
                </button>
              </div>
            )}
            <div className="space-y-4">
              {stories
                .filter((story) => story.status === column.status)
                .map((story) => (
                  <div
                    key={story.uuid}
                    className="p-4 bg-white rounded-lg shadow"
                  >
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-gray-600">{story.description}</p>
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
                  htmlFor="projectName"
                  className="mb-3 block text-black dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  // value={newProjectName}
                  // onChange={(e) => setNewProjectName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="projectDescription"
                  className="mb-3 block text-black dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={newProjectDescription}
                  // onChange={(e) => setNewProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
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
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                  onClick={() => {
                    // handleAddProject();
                    setShowAddModal(false);
                  }}
                >
                  Add Project
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
