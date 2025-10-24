import { Link, useNavigate } from 'react-router';
import { FaBars, FaUserCircle } from "react-icons/fa";
import './Header.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';

const Header = () => {
  const { setAuth } = useAuth();
  
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosPrivate.post('/auth/logout');
      setAuth({});
      toast.success('Logged out successfully!');
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <header>
      <div className="header-content">

        <div className="header-title">
          <button className="menu-button" title='Menu'>
            <FaBars size={32} />
          </button>
          <button onClick={() => navigate('/tasks')}><p>To Do Tasks</p></button>
        </div>

        {/* <nav className="header-nav">
          <ul>
            <li><Link to="/tasks">Dashboard</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
          </ul>
        </nav> */}

        <div className="header-actions">
          <button className="auth-button" onClick={handleLogout}>Logout</button>
        </div>

      </div>
    </header>
  )
}
export default Header