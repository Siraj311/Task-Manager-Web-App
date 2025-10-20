import { Link, useNavigate } from 'react-router';
import { FaBars, FaUserCircle } from "react-icons/fa";
import './Header.css';
import { use } from 'react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-content">

        <div className="header-title">
          <button className="menu-button" title='Menu'>
            <FaBars size={32} />
          </button>
          <button onClick={() => navigate('/tasks')}><p>To Do Tasks</p></button>
        </div>

        <nav className="header-nav">
          <ul>
            <li><Link to="/tasks">Dashboard</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="auth-button">Logout</button>
          <button className="profile-button" title='Profile'>
            <FaUserCircle size={45} />
          </button>
        </div>

      </div>
    </header>
  )
}
export default Header