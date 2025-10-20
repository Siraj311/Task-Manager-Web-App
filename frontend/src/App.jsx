import { Routes, Route, Outlet, Navigate } from 'react-router';
import Layout from './components/Layout';

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Signup from './pages/Signup';
import useAuth from './hooks/useAuth';

const ProtectedRoute = () => {
  const { auth } = useAuth();
  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route element={<Layout route="public" />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout route="protected" />}>
          <Route path="/tasks" element={<Tasks />} />
        </Route>
      </Route>
    </Routes>
  )
}
export default App