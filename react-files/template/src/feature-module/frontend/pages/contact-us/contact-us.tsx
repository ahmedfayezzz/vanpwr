import React from 'react';
import * as Icon from 'react-feather';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { Link } from 'react-router-dom';
import { all_routes } from '../../../../core/data/routes/all_routes';

const ContactUs = () => {
  const routes = all_routes;
  return (
    <>
      <div className="bg-img">
        <ImageWithBasePath
          src="assets/img/bg/work-bg-03.png"
          alt="img"
          className="bgimg1"
        />
        <ImageWithBasePath
          src="assets/img/bg/work-bg-03.png"
          alt="img"
          className="bgimg2"
        />
        <ImageWithBasePath
          src="assets/img/bg/feature-bg-03.png"
          alt="img"
          className="bgimg3"
        />
      </div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Contact Us</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          {/* Contact Details */}
          <div className="contact-details">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="contact-info flex-fill">
                  <span>
                    <Icon.Clock />
                  </span>
                  <div className="contact-data">
                    <h4>Opening Hours</h4>
                    <p>Monday - Sunday</p>
                    <p>06:00 - 23:59</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 d-flex">
                <div className="contact-info flex-fill">
                  <span>
                    <Icon.Mail />
                  </span>
                  <div className="contact-data">
                    <h4>Email Address</h4>
                    <p>
                      <Link to="mailto:hello@vanpowr.com">
                        hello@vanpowr.com
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Contact Details */}
          {/* Get In Touch */}
          <div className="row">
            <div className="col-md-6">
              <div className="contact-img">
                <ImageWithBasePath
                  src="assets/img/contactus.jpeg"
                  className="img-fluid"
                  alt="img"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-queries">
                <h2>Get In Touch</h2>
                <form action={routes.contactUs}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Name*"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="col-form-label">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Enter Email Address*"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="col-form-label">Phone Number</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                      <div className="form-group">
                        <label className="col-form-label">Message</label>
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Type Message"
                          defaultValue={''}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button className="btn btn-primary" type="submit">
                        Send Message
                        <Icon.ArrowRightCircle className="standard-feather ms-2" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* /Get In Touch */}
        </div>
      </div>
      {/* Map */}
      <div className="map-grid">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.5384376996303!2d-0.1436794!3d51.5216834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ad65ef3a8a7%3A0x3eee13b7cc7d1717!2s167%2C%20169%20Great%20Portland%20St%2C%20London%20W1W%205PF!5e0!3m2!1sen!2suk!4v1707244362625!5m2!1sen!2suk"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map"
        />
      </div>
      {/* /Map */}
    </>
  );
};

export default ContactUs;
