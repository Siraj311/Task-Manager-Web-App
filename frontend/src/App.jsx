import { Routes, Route, Outlet, Navigate } from 'react-router';
import Layout from './components/Layout';

import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Signup from './pages/Signup';
import useAuth from './hooks/useAuth';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedUserRoute = () => {
  const { auth } = useAuth();
  if (!auth?.user) {
    return <Navigate to="/" replace />;
  }

  if (auth.user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

const PublicRoute = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return auth.user.role === 'admin'
      ? <Navigate to="/admin" replace />
      : <Navigate to="/tasks" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
        <Route element={<Layout route="public" />}>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>

        <Route element={<Layout route="protected" />}>
          <Route element={<ProtectedUserRoute />}>
            <Route path="/tasks" element={<Tasks />} />
          </Route>

          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
    
    </Routes>
  )
}
export default App