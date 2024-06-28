import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Story } from '../../types/story';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getStoryById } from '../../api/Stories/storyService';

const StoryDetails: React.FC = () => {

  const { uuid } = useParams<{ uuid: string }>();
  const [story, setStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const fetchedStory = await getStoryById(uuid as string);
        setStory(fetchedStory);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    if (uuid) {
      fetchStory();
    }
  }, [uuid]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Story Details" />
      <div className="p-4 bg-white dark:bg-boxdark rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{story?.name}</h1>
        <p className="mb-4">{story?.description}</p>
        <p className="mb-2"><strong>Priority:</strong> {story?.priority}</p>
        <p className="mb-2"><strong>Status:</strong> {story?.status}</p>
        <p className="mb-2"><strong>Owner:</strong> {story?.owner || 'N/A'}</p>
        {/* <p className="mb-2"><strong>Creation Date:</strong> {new Date(story.creationDate).toLocaleDateString()}</p> */}
      </div>
    </DefaultLayout>
  );
};

export default StoryDetails;
