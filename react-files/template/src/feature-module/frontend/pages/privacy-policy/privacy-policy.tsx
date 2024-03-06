import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';

const PrivacyPolicy = () => {
  const routes = all_routes;
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Privacy Policy</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Terms & Conditions */}
            <div className="col-md-12">
              <div className="terms-content privacy-cont">
                <h2 className="section-title">Vanpowr Privacy</h2>
                <br />

                <h6>What’s in a Privacy Notice?</h6>
                <ul>
                  <li>
                    {' '}
                    www.vanpowr.com is a site operated by Vanpowr Ltd. Vanpowr
                    Ltd (“Vanpowr, “we” “us”) takes the privacy rights of all
                    individuals who use our website very seriously. In this
                    Privacy Notice we explain who we are, how we collect, share
                    and use personal information about individuals and how you
                    (the reader) can exercise your privacy rights.
                  </li>
                  <li>
                    This Privacy Notice applies to any individual who visits our
                    website at www.vanpowr.com, or who otherwise gives us
                    information either voluntarily or automatically when they
                    interact with us online or otherwise.
                  </li>
                  <li>
                    You should read this Privacy Notice to the end so that you
                    know what we do and what your rights are.
                  </li>
                </ul>

                <h6>What does Vanpowr do?</h6>
                <ul>
                  <li>
                    We are Vanpowr Ltd registered in England and Wales under
                    company number 10819640 and have our registered offices at
                    167-169 Great Portland Street, London, England, W1W 5PF with
                    Vat no GB [**] (“Vanpowr”, “we”, “our” or “us”.)
                  </li>
                  <li>
                    We provide an online booking platform to individuals (“you”
                    or “your”) to obtain quotes from our pre-selected community
                    of ‘removals’ drivers (each a “Driver”) offering logistical
                    services so you can select the date, time and price best
                    suited for your needs and we provide the technical support
                    to connect you with a Driver.
                  </li>
                </ul>

                <h6>
                  What information does Vanpowr collect when I visit your
                  Website?
                </h6>
                <ul>
                  <li>
                    If you are visiting our website, then we generally collect
                    the following information automatically. We also collect
                    this information if you use the website to book a Driver.
                  </li>
                  <li>
                    Whenever you visit our website information about your
                    device, location, IP address and browser can all be
                    collected by us. Depending on the device you are using and
                    how it is set up we may collect information such as: IP
                    address, Device type (OS, model and manufacturer), Browser ,
                    unique device identification number, Where you are located
                    (e.g. country or city-level location), other technical
                    information supplied by your ISP or device
                  </li>
                  <li>
                    Some of this information is collected using cookies and
                    similar tracking software. You can read more about that in
                    our Cookie Notice,
                  </li>
                  <li>
                    We may also collect information about the pages you visited
                    on our website and how long you spent there as well as which
                    and which links you clicked on. We do this so we can
                    understand how people use our website and what we can do to
                    improve the experience for users,
                  </li>
                  <li>
                    If you decide to contact us by email, then we will collect
                    the information you give us in your email. This will usually
                    be similar to the information we collect when you use our
                    website to book a Driver.
                  </li>
                </ul>

                <h6>
                  What personal information does Vanpowr collect when you engage
                  our services.
                </h6>
                <ul>
                  <li>
                    If you decide to book a Driver through our website will
                    collect the personal information that you give us
                    voluntarily through our Website. This will usually be
                    through you completing an online booking or sending us an
                    email via the address shown on the site. This information
                    might include: Your name and full address, Your contact
                    information e.g. your email address and a telephone number,
                    Your full home and/or business address, Certain payment
                    information, Any other personal information that you give to
                    us to help us book you a Driver.
                  </li>
                  <li>
                    The above list is just an example of the information we
                    might need but any personal information you give to us will
                    be dealt with as set out in this Privacy Notice. If you want
                    to know why we are asking for certain information, then just
                    ask us and we will explain.
                  </li>
                  <li>
                    We will also collect the same information automatically as
                    we set out above. Most of the personal information we
                    collect is provided by you, but we also collect information
                    from other sources.
                  </li>
                  <li>
                    If you give us information about your health or another type
                    of special category data then we will only process this with
                    your consent.
                  </li>
                </ul>

                <h6>I’m a Driver, what information do you collect about me?</h6>
                <ul>
                  <li>
                    We will collect the same information as we would anyone else
                    engaging our services or visiting our website but we will
                    also collect: Driving license information, Details of your
                    insurance policies covering your business, Information about
                    anyone else connected with your business, Information held
                    by the DVLA, insurers, banks or other parties we need to
                    request information from to verify your identity, Any other
                    information we need to onboard you to our system.
                  </li>
                </ul>

                <h6>Why do you collect information about me?</h6>
                <ul>
                  <li>
                    The information we collect from you when you use our Website
                    to book a Driver is needed so that we can match your
                    requirements with a suitable driver. We need to know where
                    you are and where you want your items to be moved to.
                  </li>
                  <li>
                    We collect certain other information automatically to help
                    us understand who uses our site and analysis how we can
                    improve our services.
                  </li>
                </ul>

                <h6>
                  Who do we share your personal information with and when do we
                  do that?
                </h6>
                <ul>
                  <li>
                    We will share your personal information with the Driver we
                    select to complete your booked job. If that Driver cannot
                    complete your booking as requested then we may share your
                    personal information with another Driver or in some
                    circumstances a third party service provider.
                  </li>
                </ul>

                <h6>
                  What is Legal basis for processing my personal information
                </h6>
                <ul>
                  <li>
                    We must have a legal basis to collect and process personal
                    information. Data protection laws set out the legal basis we
                    can use and which one we rely on will depend on the
                    circumstances and context of collection.
                  </li>
                  <li>
                    We normally collect and process information so we can
                    arrange for a Driver to complete your booking or the
                    processing is in our legitimate business interests which are
                    not overridden by your fundamental rights. We will also
                    process certain information with your consent.
                  </li>
                  <li>
                    Sometimes we will have to process or share personal
                    information because we have a legal obligation to do so or
                    need to exercise, establish or defend legal claims.
                  </li>
                  <li>
                    We will tell you at the time if we need information to
                    perform a contract or to comply with a legal requirement and
                    if providing us with that information is mandatory (as well
                    as what will happen if you don’t give us the information).
                  </li>
                  <li>
                    If you have questions or need more information about the
                    legal basis we rely on to collect and process your personal
                    information then email us at hello@vanpowr.com.
                  </li>
                </ul>

                <h6>
                  Do keep my personal information secure and do you send it
                  overseas?{' '}
                </h6>
                <ul>
                  <li>
                    We use appropriate technical and organisational measure to
                    protect your personal information and we do send information
                    outside of the United Kingdom
                  </li>
                  <li>
                    Our website and email servers are located in the United
                    Kingdom some of our service providers are located overseas.
                    This means your personal information may be processed in
                    countries that may have data protection laws that are
                    different to the laws of the United Kingdom.
                  </li>
                  <li>
                    We have taken appropriate safeguards to require that the
                    personal information we process will remain protected in
                    accordance with this Privacy Notice.
                  </li>
                </ul>

                <h6>How long do we keep your data?</h6>
                <ul>
                  <li>
                    We will keep information for as long as we have a legitimate
                    business interest to do so which may be indefinitely if we
                    continue to have a relationship.
                  </li>
                  <li>
                    If we cease to have a legitimate business interest to
                    process your personal information, we will either delete or
                    anonymise it or. If this is not possible (E.g. Because our
                    backup files include your personal information) then we will
                    securely store your personal information and stop further
                    access and processing until it can be deleted.
                  </li>
                  <li>
                    If you have questions or need more information about the
                    legal basis, we rely on to collect and process your personal
                    information then email us at hello@vanpowr.com.
                  </li>
                </ul>

                <h6>
                  A person has rights Under UK data protection laws, you have
                  certain data protection rights which are the right to:
                </h6>
                <ul>
                  <li>
                    ask for access to your personal information and other
                    supplementary information
                  </li>
                  <li>
                    ask for correction if any of your information is not
                    accurate or to complete missing information, we hold on you
                  </li>
                  <li>
                    ask for correction if any of your information is not
                    accurate or to complete missing information, we hold on you
                  </li>
                  <li>
                    {' '}
                    ask for your personal information to be erased, in certain
                    circumstances
                  </li>
                  <li>
                    receive a copy of the personal information you have provided
                    to us or have this information sent to a third party. We
                    will provide any information requested in a electronic
                    format that a computer can read E.g. a word doc.
                  </li>
                  <li>
                    {' '}
                    object at any time to our processing of your personal
                    information
                  </li>
                  <li>
                    object in certain other situations to the continued
                    processing of your personal information
                  </li>
                  <li>
                    restrict us form processing your personal information in
                    certain circumstances.
                  </li>
                  <li>
                    We respond to all requests received from individuals wishing
                    to exercise their data protection rights in accordance with
                    applicable data protection laws. The best way to contact us
                    is by email at hello@vanpowr.com.
                  </li>
                  <li>
                    If you want more information about your rights under the
                    GDPR please see “the Guidance from the Information
                    Commissioners Office on Individual’s rights under the GDPR.
                  </li>
                </ul>

                <h6>Marketing emails</h6>
                <p>
                  If you want to unsubscribe from any marketing emails that you
                  receive from us, then email your request to hello@vanpowr.com
                  (subject line: ‘unsubscribe’). We will process all requests as
                  quickly as possible, but it may take up to 10 working days for
                  this to become effective.
                </p>

                <h6>Updates to this Privacy Notice</h6>
                <p>
                  This privacy notice was last updated on 31st January 2024. We
                  regularly review our procedures and may update this Privacy
                  Notice from time to time by publication to our website
                </p>

                <h6>How to contact us</h6>
                <p>
                  If you have questions or need more information about the
                  legal basis, we rely on to collect and process your personal
                  information then email us at hello@vanpowr.com. Vanpowr Ltd is
                  the Data Controller for all personal information collected and
                  processed and we are registered in the UK with the Information
                  Commissioners Office with the registration number: XXXXX.
                </p>

                <h2 className="section-title">Vanpowr Cookie Policy</h2>
                <br />

                <h6>Simple Cookie Policy</h6>
                <p>
                  We use cookies on our website. These are pieces of software
                  that are placed on your device that can help make the site run
                  smoothly (E.g. remembering which page you visited) or to help
                  us track how the site is used. You can find out more about
                  cookies and how to control them in the information below.
                </p>
                <p>
                  If you do not want to use Cookies, then you can disable them
                  by changing your browser settings so that the website cannot
                  place cookie son your device. This might mean the website does
                  not run as well.
                </p>
              </div>
            </div>
            {/* /Terms & Conditions */}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
