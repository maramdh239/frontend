import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClientFeedback from '../components/common/ClientFeedback'

const SignIn = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // SignIn.jsx - Update the handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Check for admin credentials (if you still want this special case)
  if (email === 'admin@admin' && password === 'Admin123*') {
    onLogin('admin-token', { 
      _id: 'admin-id',
      full_name: 'Admin User',
      email: 'admin@admin',
      is_verified: true
    });
    navigate('/admin');
    return;
  }

  try {
    // Regular user authentication flow
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to sign in');
    }

    // After successful login, fetch user data
    const userResponse = await fetch('http://127.0.0.1:8000/api/v1/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await userResponse.json();

    // Call the onLogin callback with both token and user data
    onLogin(data.access_token, userData);
    navigate('/');
  } catch (err) {
    setError(err.message || 'An error occurred during login');
  } finally {
    setLoading(false);
  }
};

  return (
      <div className="signup-area">
        <div className="wrapper">
          <div className="row">
            <div className="col-lg-6 bg-color-blackest left-wrapper">
              <div className="sign-up-box">
                <div className="signup-box-top">
                  <Link to="/">
                    {/* Logo can go here */}
                  </Link>
                </div>
                <div className="signup-box-bottom">
                  <div className="signup-box-content">
                    <div className="text-social-area">
                      <hr />
                      <span>Sign in with email</span>
                      <hr />
                    </div>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="input-section mail-section">
                        <div className="icon"><i className="fa-sharp fa-regular fa-envelope"></i></div>
                        <input
                            type="email"
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                      </div>
                      <div className="input-section password-section">
                        <div className="icon"><i className="fa-sharp fa-regular fa-lock"></i></div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                      </div>
                      <div className="forget-text">
                        <a className="btn-read-more" href="#"><span>Forgot password</span></a>
                      </div>
                      <button
                          type="submit"
                          className="btn-default"
                          disabled={loading}
                      >
                        {loading ? 'Signing in...' : 'Sign In'}
                      </button>
                    </form>
                  </div>
                  <div className="signup-box-footer">
                    <div className="bottom-text">
                      Don't have an account? <Link className="btn-read-more ml--5" to="/signup"><span>Sign Up</span></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 right-wrapper">
              <ClientFeedback />
            </div>
          </div>
        </div>
        <Link className="close-button" to="/">
          <i className="fa-sharp fa-regular fa-x"></i>
        </Link>
      </div>
  )
}

export default SignIn