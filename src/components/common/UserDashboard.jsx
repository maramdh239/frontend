import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch,
  faPlus,
  faUsers,
  faUserCheck,
  faCubes,
  faUserPlus,
  faArrowUp,
  faArrowDown,
  faEye,
  faChevronRight,
  faEdit,
  faTrash,
  faChevronLeft,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { Table, Card, Button, Spinner } from 'react-bootstrap';

function UserDashboard({ showModelsDashboard }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeToday: 0,
    totalModels: 0,
    newThisWeek: 0
  });

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('auth_token');
        
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch('http://127.0.0.1:8000/api/v1/users/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        
        // Transform the data to match our UI needs
        const transformedUsers = data.map(user => ({
          id: user._id,
          name: user.full_name,
          email: user.email,
          role: user.role || 'User',
          models: user.models_count || 0,
          avatarColor: getRandomColor(user.email),
          created_at: user.created_at
        }));

        setUsers(transformedUsers);
        
        // Update stats
        setStats({
          totalUsers: transformedUsers.length,
          activeToday: transformedUsers.filter(u => isActiveToday(u.last_login)).length,
          totalModels: transformedUsers.reduce((acc, user) => acc + user.models, 0),
          newThisWeek: transformedUsers.filter(u => isCreatedThisWeek(u.created_at)).length
        });
      } catch (err) {
        console.error("Error fetching users:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper functions
  const getRandomColor = (email) => {
    const colors = ['primary', 'success', 'danger', 'warning', 'info', 'purple', 'indigo', 'blue', 'green'];
    // Use email to determine a consistent color
    const charSum = email.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return colors[charSum % colors.length];
  };

  const isActiveToday = (lastLogin) => {
    if (!lastLogin) return false;
    const today = new Date();
    const loginDate = new Date(lastLogin);
    return today.toDateString() === loginDate.toDateString();
  };

  const isCreatedThisWeek = (createdAt) => {
    if (!createdAt) return false;
    const today = new Date();
    const creationDate = new Date(createdAt);
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return creationDate >= oneWeekAgo;
  };

  // Filter users based on search query
  const filteredUsers = searchQuery
    ? users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  const handlePasswordShow = (index) => {
    // In a real app, this would show the actual password
    alert('Password viewing functionality would be implemented here');
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-4 fw-bold">All Users</h2>
        <div className="d-flex gap-3">
          <div className="position-relative">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="form-control ps-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="position-absolute text-secondary" style={{ left: '10px', top: '12px' }} />
          </div>
          <Button variant="primary" className="d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add User</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary mb-1">Total Users</p>
                  <p className="fs-3 fw-bold mb-1">{stats.totalUsers}</p>
                </div>
                <div className="icon-bg bg-primary bg-opacity-10">
                  <FontAwesomeIcon icon={faUsers} className="text-primary" />
                </div>
              </div>
              <div className="text-success small">
                <FontAwesomeIcon icon={faArrowUp} /> 12% from last month
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary mb-1">Active Today</p>
                  <p className="fs-3 fw-bold mb-1">{stats.activeToday}</p>
                </div>
                <div className="icon-bg bg-success bg-opacity-10">
                  <FontAwesomeIcon icon={faUserCheck} className="text-success" />
                </div>
              </div>
              <div className="text-success small">
                <FontAwesomeIcon icon={faArrowUp} /> 5% from yesterday
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary mb-1">Total Models</p>
                  <p className="fs-3 fw-bold mb-1">{stats.totalModels}</p>
                </div>
                <div className="icon-bg bg-purple bg-opacity-10" style={{backgroundColor: '#f3e8ff'}}>
                  <FontAwesomeIcon icon={faCubes} style={{color: '#9333ea'}} />
                </div>
              </div>
              <div className="text-success small">
                <FontAwesomeIcon icon={faArrowUp} /> 23% from last month
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="stats-card h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="text-secondary mb-1">New This Week</p>
                  <p className="fs-3 fw-bold mb-1">{stats.newThisWeek}</p>
                </div>
                <div className="icon-bg bg-info bg-opacity-10">
                  <FontAwesomeIcon icon={faUserPlus} className="text-info" />
                </div>
              </div>
              <div className="text-danger small">
                <FontAwesomeIcon icon={faArrowDown} /> 3% from last week
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading users...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <div className="text-danger mb-3">
              <i className="fas fa-exclamation-circle fa-3x"></i>
            </div>
            <p className="mb-0">Error loading users: {error}</p>
            <Button variant="primary" className="mt-3" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Models</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.id} className="highlight-row">
                      <td>
                        <div className="d-flex align-items-center">
                          <div 
                            className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                            style={{
                              width: '40px', 
                              height: '40px', 
                              backgroundColor: `var(--bs-${user.avatarColor || 'primary'}-bg-subtle)`
                            }}
                          >
                            <FontAwesomeIcon 
                              icon={faUser} 
                              style={{color: `var(--bs-${user.avatarColor || 'primary'})`}} 
                            />
                          </div>
                          <div>
                            <div className="fw-medium">{user.name}</div>
                            <div className="text-secondary small">{user.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">{user.email}</td>
                      <td className="align-middle">
                        <span className="bg-light px-2 py-1 rounded small">••••••••</span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-primary p-0 ms-2"
                          onClick={() => handlePasswordShow(index)}
                        >
                          <FontAwesomeIcon icon={faEye} /> Show
                        </Button>
                      </td>
                      <td className="align-middle">
                        <Button 
                          variant="link" 
                          className="text-primary p-0"
                          onClick={() => showModelsDashboard(user.name)}
                        >
                          {user.models} Models <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
                        </Button>
                      </td>
                      <td className="align-middle">
                        <Button variant="link" className="text-primary p-1 me-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="link" className="text-danger p-1">
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      {searchQuery ? "No users found matching your search" : "No users found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
        <Card.Footer className="bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0 small">
                Showing 1 to {filteredUsers.length} of {filteredUsers.length} results
              </p>
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default UserDashboard;