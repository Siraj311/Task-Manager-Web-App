import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Tasks from './pages/Tasks';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/tasks" element={<Tasks />} />
      </Route>
    </Routes>
  )
}
export default App