import React, { useEffect } from 'react';
import ProjectsTable from '../../components/Tables/ProjectsTable';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { setUserActiveProject } from '../../api/Projects/projectService';

const Projects: React.FC = () => {
  useEffect(() => {
    const clearActiveProject = async () => {
      try {
        await setUserActiveProject('not-set');
      } catch (error) {
        console.error('Error clearing active project:', error);
      }
    };
    clearActiveProject();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Projects" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"></div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12">
          <ProjectsTable />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Projects;
