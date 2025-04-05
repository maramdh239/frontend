import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faHeadphones, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [activeTab, setActiveTab] = useState('image-generator');

  return (
    <div className="main-content">
      <div className="rainbow-contact-area ">
        <div className="container">
          <div className="row mt--40 row--15">
            <div className="col-lg-8">
              <div className="contact-details-box">
                <h3 className="title">Contact Us</h3>

                <div className="profile-details-tab">
                  

                  <div className="tab-content">
                    <form className="rbt-profile-row rbt-default-form row row--15">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" className="form-control" id="firstName" placeholder="First Name" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" className="form-control" id="lastName" placeholder="lastName" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input type="email" className="form-control" id="email" placeholder="email" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="form-group">
                          <label htmlFor="phone">Phone Number</label>
                          <input type="tel" className="form-control" id="phone" placeholder="+216" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea className="form-control" id="message" rows={5} placeholder="Your message"></textarea>
                        </div>
                      </div>
                      <div className="col-12 mt--20">
                        <button type="submit" className="btn btn-primary">Send Message</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mt_md--30 mt_sm--30">
              
              
              <div className="rainbow-address">
                <div className="icon">
                  <FontAwesomeIcon icon={faHeadphones} />
                </div>
                <div className="inner">
                  <h4 className="title">Contact Number</h4>
                  <p className="b2">
                    <a href="tel:+14445556667">+1 444 555 6667</a><br />
                    <a href="tel:+12222222333">+1 222 222 2333</a>
                  </p>
                </div>
              </div>
              
              <div className="rainbow-address">
                <div className="icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="inner">
                  <h4 className="title">Email Address</h4>
                  <p className="b2">
                    <a href="mailto:admin@example.com">admin@example.com</a><br />
                    <a href="mailto:info@example.com">info@example.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;