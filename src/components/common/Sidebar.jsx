import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCube,
  faUserShield,
  faTachometerAlt,
  faUsers,
  faDatabase,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

function Sidebar({ collapsed, onNavigate, activeView }) {
  // Handle logout by navigating to home page
  const handleLogout = () => {
    // Navigate to home page
    onNavigate('/');
    
    // You can add additional logout logic here if needed
    // For example, clearing user session, auth tokens, etc.
  };

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="logo-container p-3 d-flex align-items-center">
        <div className="bg-primary rounded-circle p-2 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faCube} />
        </div>
        <span className="logo-text ms-3 fw-bold fs-5">ModelAdmin</span>
      </div>
      
      <div className="user-profile p-3 d-flex align-items-center">
        <div className="bg-primary bg-opacity-25 rounded-circle p-2 d-flex align-items-center justify-content-center">
          <FontAwesomeIcon icon={faUserShield} />
        </div>
        <div className="ms-3">
          <div className="sidebar-text fw-medium">Admin User</div>
          <div className="sidebar-text text-white-50 small">Super Admin</div>
        </div>
      </div>
      
      <nav className="p-2">
        <div
          className={`nav-item d-flex align-items-center p-3 rounded mb-1 ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
        >
          <FontAwesomeIcon icon={faTachometerAlt} />
          <span className="sidebar-text ms-3">Dashboard</span>
        </div>
        <div
          className={`nav-item d-flex align-items-center p-3 rounded mb-1 ${activeView === 'user-dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('user-dashboard')}
        >
          <FontAwesomeIcon icon={faUsers} />
          <span className="sidebar-text ms-3">Users</span>
        </div>
        <div
          className={`nav-item d-flex align-items-center p-3 rounded mb-1 ${activeView === 'models-dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('models-dashboard')}
        >
          <FontAwesomeIcon icon={faDatabase} />
          <span className="sidebar-text ms-3">Models</span>
        </div>
        <div
          className={`nav-item d-flex align-items-center p-3 rounded mb-1 ${activeView === 'settings' ? 'active' : ''}`}
          onClick={() => onNavigate('settings')}
        >
          <FontAwesomeIcon icon={faCog} />
          <span className="sidebar-text ms-3">Settings</span>
        </div>
      </nav>
      
      <div className="mt-auto p-3 border-top border-light border-opacity-25">
        <div 
          className="nav-item d-flex align-items-center p-3 rounded"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span className="sidebar-text ms-3">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;