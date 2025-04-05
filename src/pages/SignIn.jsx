import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClientFeedback from '../components/common/ClientFeedback'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sign in with:', email, password)
    // Add authentication logic here
  }

  return (
    <div className="signup-area">
      <div className="wrapper">
        <div className="row">
          <div className="col-lg-6 bg-color-blackest left-wrapper">
            <div className="sign-up-box">
              <div className="signup-box-top">
                <Link to="/">
                  
                 
                </Link>
              </div>
              <div className="signup-box-bottom">
                <div className="signup-box-content">
                  <div className="social-btn-grp">
                    
                   
                  </div>
                  <div className="text-social-area">
                    <hr />
                    <span>Or continue with</span>
                    <hr />
                  </div>
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
                    <button type="submit" className="btn-default">Sign In</button>
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