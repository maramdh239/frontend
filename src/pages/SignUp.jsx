import { useState } from 'react'
import { Link } from 'react-router-dom'
import ClientFeedback from '../components/common/ClientFeedback'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    console.log('Sign up with:', name, email, password)
    // Add registration logic here
  }

  return (
    <div className="signup-area">
      <div className="wrapper">
        <div className="row">
          <div className="col-lg-6 bg-color-blackest left-wrapper">
            <div className="sign-up-box">
              <div className="signup-box-top">
               
              </div>
              <div className="signup-box-bottom">
                <div className="signup-box-content">
                 
                 
                  <div className="text-social-area">
                    <hr />
                    <hr />
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="input-section">
                      <div className="icon"><i className="feather-user"></i></div>
                      <input 
                        type="text" 
                        placeholder="Enter Your Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
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
                        placeholder="Create Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-section password-section">
                      <div className="icon"><i className="fa-sharp fa-regular fa-lock"></i></div>
                      <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="forget-text">
                      <a className="btn-read-more" href="#"><span>Forgot password</span></a>
                    </div>
                    <button type="submit" className="btn-default">Sign Up</button>
                  </form>
                </div>
                <div className="signup-box-footer">
                  <div className="bottom-text">
                    Do you have an account? <Link className="btn-read-more ml--5" to="/signin"><span>Sign In</span></Link>
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

export default SignUp