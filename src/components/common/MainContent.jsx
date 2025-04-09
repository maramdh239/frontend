import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faBell, 
  faUser, 
  faChartLine,
  faUsers,
  faWrench
} from '@fortawesome/free-solid-svg-icons';
import UserDashboard from './UserDashboard';
import ModelsDashboard from './ModelsDashboard';
import { Card, Row, Col } from 'react-bootstrap';

function MainContent({ 
  toggleSidebar, 
  activeView, 
  showModelsDashboard, 
  showUserDashboard, 
  selectedUser,
  sidebarCollapsed
}) {
  // Helper function to render the title based on active view
  const renderTitle = () => {
    switch(activeView) {
      case 'dashboard':
        return 'Dashboard';
      case 'user-dashboard':
        return 'User Management';
      case 'models-dashboard':
        return `Models - ${selectedUser}`;
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className={`content-area ${sidebarCollapsed ? 'content-expanded' : ''}`}>
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="d-flex justify-content-between align-items-center px-4 py-3">
          <div className="d-flex align-items-center">
            <button 
              onClick={toggleSidebar} 
              className="btn btn-link text-secondary me-3"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h1 className="fs-5 fw-semibold mb-0">{renderTitle()}</h1>
          </div>
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <button className="btn btn-link text-secondary">
                <FontAwesomeIcon icon={faBell} />
                <span className="position-absolute top-0 end-0 bg-danger rounded-circle" style={{ width: '8px', height: '8px' }}></span>
              </button>
            </div>
            <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center">
              <FontAwesomeIcon icon={faUser} className="text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-4">
        {activeView === "dashboard" && (
          <DashboardView />
        )}
        
        {activeView === "user-dashboard" && (
          <UserDashboard showModelsDashboard={showModelsDashboard} />
        )}
        
        {activeView === "models-dashboard" && (
          <ModelsDashboard showUserDashboard={showUserDashboard} selectedUser={selectedUser} />
        )}
        
        {activeView === "settings" && (
          <SettingsView />
        )}
      </main>
    </div>
  );
}

// Dashboard component
function DashboardView() {
  return (
    <div className="fade-in">
      <h2 className="fs-4 fw-bold mb-4">Dashboard Overview</h2>
      
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fs-5 mb-0">System Status</h3>
                <FontAwesomeIcon icon={faChartLine} className="text-primary" />
              </div>
            </Card.Header>
            <Card.Body>
              <p className="text-success mb-3">
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                All systems operational
              </p>
              <div className="progress mb-3">
                <div className="progress-bar bg-success" style={{ width: "92%" }} role="progressbar" aria-valuenow="92" aria-valuemin="0" aria-valuemax="100">92%</div>
              </div>
              <p className="text-secondary small mb-0">Last checked: Today at 10:45 AM</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="bg-light">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="fs-5 mb-0">Quick Stats</h3>
                <FontAwesomeIcon icon={faUsers} className="text-primary" />
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6} className="mb-3">
                  <div className="text-secondary small">Total Users</div>
                  <div className="fs-4 fw-bold">142</div>
                </Col>
                <Col xs={6} className="mb-3">
                  <div className="text-secondary small">Total Models</div>
                  <div className="fs-4 fw-bold">356</div>
                </Col>
                <Col xs={6}>
                  <div className="text-secondary small">Active Today</div>
                  <div className="fs-4 fw-bold">87</div>
                </Col>
                <Col xs={6}>
                  <div className="text-secondary small">New This Week</div>
                  <div className="fs-4 fw-bold">42</div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header className="bg-light">
          <h3 className="fs-5 mb-0">Recent Activity</h3>
        </Card.Header>
        <Card.Body>
          <p className="text-center text-secondary my-5">
            Dashboard content under development. Check back soon!
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

// Settings component
function SettingsView() {
  return (
    <div className="fade-in">
      <h2 className="fs-4 fw-bold mb-4">Settings</h2>
      
      <Card className="mb-4">
        <Card.Header className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="fs-5 mb-0">System Configuration</h3>
            <FontAwesomeIcon icon={faWrench} className="text-primary" />
          </div>
        </Card.Header>
        <Card.Body>
          <p className="text-center text-secondary my-5">
            Settings panel under development. Check back soon!
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MainContent;