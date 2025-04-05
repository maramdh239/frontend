import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileDetails = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'Maram',
    lastName: 'Dhambri',
    username: 'Maram Dhambri',
    phoneNumber: '+216 58 410 466',
    bio: "I'm the Front-End Developer for #Rainbow IT in Bangladesh, OR. I have serious passion for UI effects, animations and creating intuitive, dynamic user experiences."
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic
    console.log('Profile updated:', profileData);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    // Handle password update logic
    console.log('Password updated:', passwords);
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    // Handle account deletion logic
    console.log('Account deletion requested');
  };

  return (
    <div className="rbt-main-content mb--0">
      <div className="rbt-daynamic-page-content center-width">
        <div className="rbt-dashboard-content">
          <div className="banner-area">
            <div className="settings-area">
              <h3 className="title">Profile Details</h3>
              <ul className="user-nav">
                <li>
                  <Link to="/profile">
                    <span>Profile Details</span>
                  </Link>
                </li>
                <li>
                  <Link to="/notifications">
                    <span>Notifications</span>
                  </Link>
                </li>
                <li>
                  <Link to="/chat-export">
                    <span>Chat Export</span>
                  </Link>
                </li>
                <li>
                  <Link to="/appearance">
                    <span>Appearance</span>
                  </Link>
                </li>
                <li>
                  <Link to="/plans">
                    <span>Plans and Billing</span>
                  </Link>
                </li>
                <li>
                  <Link to="/sessions">
                    <span>Sessions</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="content-page pb--50">
            <div className="chat-box-list">
              <div className="single-settings-box profile-details-box overflow-hidden">
                <div className="profile-details-tab">
                  <div className="advance-tab-button mb--30">
                    <ul className="nav nav-tabs tab-button-style-2 justify-content-start">
                      <li>
                        <button 
                          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
                          onClick={() => setActiveTab('profile')}
                        >
                          <span className="title">Profile</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`tab-button ${activeTab === 'password' ? 'active' : ''}`}
                          onClick={() => setActiveTab('password')}
                        >
                          <span className="title">Password</span>
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`tab-button ${activeTab === 'delete' ? 'active' : ''}`}
                          onClick={() => setActiveTab('delete')}
                        >
                          <span className="title">Delete Account</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="tab-content">
                    {activeTab === 'profile' && (
                      <div className="tab-pane fade show active">
                        <form onSubmit={handleProfileUpdate} className="rbt-profile-row rbt-default-form row row--15">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="firstname">First Name</label>
                              <input 
                                id="firstname" 
                                type="text" 
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="lastname">Last Name</label>
                              <input 
                                id="lastname" 
                                type="text" 
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="username">User Name</label>
                              <input 
                                id="username" 
                                type="text" 
                                value={profileData.username}
                                onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="phonenumber">Phone Number</label>
                              <input 
                                id="phonenumber" 
                                type="tel" 
                                value={profileData.phoneNumber}
                                onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="bio">Bio</label>
                              <textarea 
                                id="bio" 
                                rows="5"
                                value={profileData.bio}
                                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12 mt--20">
                            <div className="form-group mb--0">
                              <button type="submit" className="btn-default">Update Info</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {activeTab === 'password' && (
                      <div className="tab-pane fade show active">
                        <form onSubmit={handlePasswordUpdate} className="rbt-profile-row rbt-default-form row row--15">
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="currentpassword">Current Password</label>
                              <input 
                                id="currentpassword" 
                                type="password" 
                                value={passwords.current}
                                onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="newpassword">New Password</label>
                              <input 
                                id="newpassword" 
                                type="password"
                                value={passwords.new}
                                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="confirmpassword">Confirm New Password</label>
                              <input 
                                id="confirmpassword" 
                                type="password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                              />
                            </div>
                          </div>
                          <div className="col-12 mt--20">
                            <div className="form-group mb--0">
                              <button type="submit" className="btn-default">Update Password</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}

                    {activeTab === 'delete' && (
                      <div className="tab-pane fade show active">
                        <form onSubmit={handleDeleteAccount} className="rbt-profile-row rbt-default-form row row--15">
                          <div className="col-11 text-center">
                            <p className="mb--20">
                              <strong>Warning: </strong>
                              Deleting your account will permanently erase all your data and cannot be reversed. 
                              This includes your profile, conversations, comments, and any other info linked to 
                              your account. Are you sure you want to go ahead with deleting your account? 
                              Enter your password to confirm.
                            </p>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label htmlFor="deletepassword">Your Password</label>
                              <input id="deletepassword" type="password" />
                            </div>
                          </div>
                          <div className="col-12 mt--20">
                            <div className="form-group mb--0">
                              <button type="submit" className="btn-default">
                                <i className="fa-solid fa-trash-can"></i> Delete Account
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;