import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import LogIn from './pages/Authentication/LogIn';
import Home from './pages/Dashboard/Home';
import Settings from './pages/Settings';
import Kanban from './pages/Dashboard/Kanban';

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
              <Home />
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
          path="/projects/:uuid"
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
