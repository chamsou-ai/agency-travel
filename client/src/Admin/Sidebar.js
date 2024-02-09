import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import I1 from "../Images/icon.png";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const logout = () => {
    // Remove the JWT token from storage
    localStorage.removeItem("jwtToken");

    // Redirect the user to the login page
    navigate("/admin/login");
  };
  const toggleLinks = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsOpen(false);
  };
  return (
    <div>
      {window.innerWidth > 768 ? (
        <button className="sidebar-toggle" onClick={toggleLinks}>
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      ) : (
        <div className="sidebar-toggle-mobile">
          <button onClick={toggleSidebar}>
            <i className={`fas fa-times`}></i>
          </button>
        </div>
      )}
      {/* Show the links when isOpen is true */}
      {isOpen && (
        <nav id="sidebar" className={isOpen ? "active" : ""}>
          <div className="sidebar-header">
            <img src={I1} width={30} alt="" style={{ marginRight: "10px" }} />
            SUBLIME TRAVEL
          </div>
          <ul className="list-unstyled components">
            <li>
              <Link to="/">
              <FontAwesomeIcon icon={faHome} style={{ marginRight:'5px'}}/> Home
              </Link>
            </li>
            <li>
              <Link to="/admin/reservations">
                <i className="fas fa-calendar-alt"></i> Reservations
              </Link>
            </li>
            <li>
              <Link to="/admin/profile">
                <i className="fas fa-user"></i> Profile
              </Link>
            </li>
            <li>
              <Link onClick={logout} to={"/admin/login"}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
