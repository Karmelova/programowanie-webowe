import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Story } from '../../types/story';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getStoryById, updateStory } from '../../api/Stories/storyService'; // Dodajemy funkcję updateStory do aktualizacji historii

const StoryDetails: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const fetchedStory = await getStoryById(uuid as string);
        setStory(fetchedStory);
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

  useEffect(() => {
    const updateStoryOnChange = async () => {
      if (!story) return;

      try {
        const updatedStory = { ...story, priority, status, owner };
        //@ts-ignore
        const savedStory = await updateStory(story.uuid, updatedStory); 
        setStory(savedStory);
        console.log('Story updated successfully:', savedStory);
      } catch (error) {
        console.error('Error updating story:', error);
      }
    };

   
    updateStoryOnChange();
  }, [priority, status, owner]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
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

  if (!story) {
    return <p>Loading...</p>;
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Story Details" />
      <div className="p-4 bg-white dark:bg-boxdark text-black dark:text-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">{story.name}</h1>
        <p className="mb-4">{story.description}</p>
        <form>
          <label>
            Priority:
            <select name="priority" value={priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <br />
          <label>
            Status:
            <select name="status" value={status} onChange={handleChange}>
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>
          <br />
          <label>
            Owner:
            <input type="text" name="owner" value={owner} onChange={handleChange} />
          </label>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default StoryDetails;
