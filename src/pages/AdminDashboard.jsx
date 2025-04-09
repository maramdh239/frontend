import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './../components/common/Sidebar';
import MainContent from './../components/common/MainContent';
import './../assets/css/AdminDashboard.css';

function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('user-dashboard');
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showModelsDashboard = (userName) => {
    setSelectedUser(userName);
    setActiveView('models-dashboard');
  };

  const showUserDashboard = () => {
    setActiveView('user-dashboard');
  };

  const handleNavigation = (view) => {
    setActiveView(view);
    // If navigating to models dashboard without a selected user, use default value
    if (view === 'models-dashboard' && !selectedUser) {
      setSelectedUser('All Users');
    }
  };

  return (
    <div className="d-flex h-100">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onNavigate={handleNavigation}
        activeView={activeView}
      />
      <MainContent 
        toggleSidebar={toggleSidebar} 
        activeView={activeView}
        showModelsDashboard={showModelsDashboard}
        showUserDashboard={showUserDashboard}
        selectedUser={selectedUser}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  );
}

export default AdminDashboard;