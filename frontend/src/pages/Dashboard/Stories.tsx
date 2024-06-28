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

  const closeAddStoryModal = () => {
    setShowAddModal(false);
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
    </DefaultLayout>
  );
};

export default Stories;
