import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import LogIn from './pages/Authentication/LogIn';
import Settings from './pages/Settings';
import Stories from './pages/Dashboard/Stories';
import Projects from './pages/Dashboard/Projects';
import Kanban from './pages/Dashboard/Kanban';
import StoryDetails from './pages/Dashboard/StoryDetails';
import TaskDetails from './pages/Dashboard/TaskDetails';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Projects | ManageMe" />
              <Projects />
            </>
          }
        />

        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | ManageMe" />
              <Settings />
            </>
          }
        />

        <Route
          path="/auth/login"
          element={
            <>
              <PageTitle title="Log In | ManageMe" />
              <LogIn />
            </>
          }
        />

        <Route
          path="/projects/:uuid/stories"
          element={
            <>
              <PageTitle title="Stories Kanban | ManageMe" />
              <Stories />
            </>
          }
        />

        <Route
          path="/stories/:uuid"
          element={
            <>
              <PageTitle title="Story Details | ManageMe" />
              <StoryDetails />
            </>
          }
        />
        <Route
          path="/tasks/:uuid"
          element={
            <>
              <PageTitle title="Task Details | ManageMe" />
              <TaskDetails />
            </>
          }
        />
      <Route
          path="/projects/kanban"
          element={
            <>
              <PageTitle title="Project Kanban | ManageMe" />
              <Kanban />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
