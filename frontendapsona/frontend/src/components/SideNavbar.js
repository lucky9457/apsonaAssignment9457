import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Sidebar.css";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {

    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <div className="SideNavContainer ulcontainer">
      <ul className="">
        <Link className="linkele" to="/">
          <li className={`navitem ${location.pathname === '/' ? 'active' : ''}`}>Notes</li>
        </Link>
        <Link className="linkele" to="/archieve">
          <li className={`navitem ${location.pathname === '/archieve' ? 'active' : ''}`}>Archived</li>
        </Link>
        <Link className="linkele" to="/trash">
          <li className={`navitem ${location.pathname === '/trash' ? 'active' : ''}`}>Trashes</li>
        </Link>
       
      </ul>
      <button className=" btnlogout navitem logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SideBar;
