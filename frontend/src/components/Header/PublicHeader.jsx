import { Link, useNavigate } from 'react-router';
import { FaBars, FaUserCircle } from "react-icons/fa";
import './Header.css';

const PublicHeader = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header-content">

        <div className="header-title">
          <button className="menu-button" title='Menu'>
            <Link to="/"><FaBars size={32} /></Link>
          </button>
          <button onClick={() => navigate('/')}><p>To Do Tasks</p></button>
        </div>

      </div>
    </header>
  )
}
export default PublicHeader