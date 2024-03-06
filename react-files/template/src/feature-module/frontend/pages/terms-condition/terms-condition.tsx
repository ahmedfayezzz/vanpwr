import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { all_routes } from '../../../../core/data/routes/all_routes';

const TermsCondition = () => {
  const routes = all_routes;
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Terms &amp; Condition</h2>
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
              <div className="terms-content">
                <h6>OVERVIEW</h6>
                <p>
                  This website is operated by Vanpowr Ltd. Throughout the site,
                  the terms “we” and “us” refer to Vanpowr Ltd, the term “our
                  drivers” refer to the independent service providers. Vanpowr
                  Ltd offers this website, including all information, tools and
                  services available from this site to you, the user,
                  conditioned upon your acceptance of all terms, conditions,
                  policies and notices stated here. By visiting our site and/ or
                  purchasing our services, you engage in our “Service” and agree
                  to be bound by the following terms and conditions (“Terms of
                  Service”, “Terms”), including those additional terms and
                  conditions and policies referenced herein and/or available by
                  hyperlink. These Terms of Service apply to all users of the
                  site, including without limitation users who are browsers,
                  vendors, customers, merchants, and/ or contributors of
                  content. Please read these Terms of Service carefully before
                  accessing or using our website. By accessing or using any part
                  of the site, you agree to be bound by these Terms of Service.
                  If you do not agree to all the terms and conditions of this
                  agreement, then you may not access the website or use any
                  services. If these Terms of Service are considered an offer,
                  acceptance is expressly limited to these Terms of Service. Any
                  new features or tools which are added to the current store
                  shall also be subject to the Terms of Service. You can review
                  the most current version of the Terms of Service at any time
                  on this page. We reserve the right to update, change or
                  replace any part of these Terms of Service by posting updates
                  and/or changes to our website. It is your responsibility to
                  check this page periodically for changes. Your continued use
                  of or access to the website following the posting of any
                  changes constitutes acceptance of those changes.
                </p>
                <h6>SECTION 1 - WEBSITE TERMS</h6>
                <p>
                  By agreeing to these Terms of Service, you represent that you
                  are at least the age of majority in your state or province of
                  residence, or that you are the age of majority in your state
                  or province of residence and you have given us your consent to
                  allow any of your minor dependents to use this site. You may
                  not use our products for any illegal or unauthorized purpose
                  nor may you, in the use of the Service, violate any laws in
                  your jurisdiction (including but not limited to copyright
                  laws). You must not transmit any worms or viruses or any code
                  of a destructive nature. A breach or violation of any of the
                  Terms will result in an immediate termination of your
                  Services.
                </p>
                <h6>SECTION 2 - GENERAL CONDITIONS</h6>
                <p>
                  We reserve the right to refuse service to anyone for any
                  reason at any time. You understand that your content (not
                  including credit card information), may be transferred
                  unencrypted and involve (a) transmissions over various
                  networks; and (b) changes to conform and adapt to technical
                  requirements of connecting networks or devices. Credit card
                  information is always encrypted during transfer over networks.
                  You agree not to reproduce, duplicate, copy, sell, resell or
                  exploit any portion of the Service, use of the Service, or
                  access to the Service or any contact on the website through
                  which the service is provided, without express written
                  permission by us. The headings used in this agreement are
                  included for convenience only and will not limit or otherwise
                  affect these Terms.
                </p>
                <h6>
                  SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF
                  INFORMATION
                </h6>
                <p>
                  We are not responsible if information made available on this
                  site is not accurate, complete or current. The material on
                  this site is provided for general information only and should
                  not be relied upon or used as the sole basis for making
                  decisions without consulting primary, more accurate, more
                  complete or more timely sources of information. Any reliance
                  on the material on this site is at your own risk. This site
                  may contain certain historical information. Historical
                  information, necessarily, is not current and is provided for
                  your reference only. We reserve the right to modify the
                  contents of this site at any time, but we have no obligation
                  to update any information on our site. You agree that it is
                  your responsibility to monitor changes to our site.
                </p>
                <h6>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h6>
                <p>
                  Prices for our services are subject to change without notice.
                  We reserve the right at any time to modify or discontinue the
                  Service (or any part or content thereof) without notice at any
                  time. We shall not be liable to you or to any third-party for
                  any modification, price change, suspension or discontinuance
                  of the Service.
                </p>
                <h6>SECTION 5 - PRODUCTS OR SERVICES (if applicable)</h6>
                <p>
                  Our services are available exclusively online through the
                  website or over the phone. We have made every effort to
                  display as accurately as possible the sizes and images of the
                  vehicles that we have available. We cannot guarantee that your
                  computer monitors display shows inaccurate images. We reserve
                  the right, but are not obligated, to limit the sales of our
                  services to any person, geographic region or jurisdiction. We
                  may exercise this right on a case-by-case basis. We reserve
                  the right to limit the quantities of any products or services
                  that we offer. All descriptions of products or product pricing
                  are subject to change at anytime without notice, at the sole
                  discretion of us. We reserve the right to discontinue any
                  services at any time. Any offer for any service made on this
                  site is void where prohibited. We do not warrant that the
                  quality of our services, information, or other material
                  purchased or obtained by you will meet your expectations, or
                  that any errors in the service will be corrected. We are not
                  liable for any damages to any of your belongings, the drivers
                  that work with us are self employed and insured. Therefore any
                  legal disputes should be directed at the driver who performed
                  the job.
                </p>
                <h6>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h6>
                <p>
                  We reserve the right to refuse any order you place with us. We
                  may, in our sole discretion, limit or cancel quantities
                  purchased per person, per household or per order. These
                  restrictions may include orders placed by or under the same
                  customer account, the same credit card, and/or orders that use
                  the same billing and/or shipping address. In the event that we
                  make a change to or cancel an order, we may attempt to notify
                  you by contacting the e-mail and/or billing address/phone
                  number provided at the time the order was made. We reserve the
                  right to limit or prohibit orders that, in our sole judgment,
                  appear to be placed by anyone who does not appear to be a
                  genuine customer. You agree to provide current, complete and
                  accurate purchase and account information for all purchases
                  made on our website or elsewhere. You agree to promptly update
                  your account and other information, including your email
                  address and credit card numbers and expiration dates, so that
                  we can complete your transactions and contact you as needed.
                  For more detail, please review our Returns Policy.
                </p>
                <h6>SECTION 7 - OPTIONAL TOOLS</h6>
                <p>
                  We may provide you with access to third-party tools over which
                  we neither monitor nor have any control nor input. You
                  acknowledge and agree that we provide access to such tools ”as
                  is” and “as available” without any warranties, representations
                  or conditions of any kind and without any endorsement. We
                  shall have no liability whatsoever arising from or relating to
                  your use of optional third-party tools. Any use by you of
                  optional tools offered through the site is entirely at your
                  own risk and discretion and you should ensure that you are
                  familiar with and approve of the terms on which tools are
                  provided by the relevant third-party provider(s). We may also,
                  in the future, offer new services and/or features through the
                  website (including, the release of new tools and resources).
                  Such new features and/or services shall also be subject to
                  these Terms of Service.
                </p>
                <h6>SECTION 8 - THIRD-PARTY LINKS</h6>
                <p>
                  Certain content, products and services available via our
                  Service may include materials from third-parties. Third-party
                  links on this site may direct you to third-party websites that
                  are not affiliated with us. We are not responsible for
                  examining or evaluating the content or accuracy and we do not
                  warrant and will not have any liability or responsibility for
                  any third-party materials or websites, or for any other
                  materials, products, or services of third-parties. We are not
                  liable for any harm or damages related to the purchase or use
                  of goods, services, resources, content, or any other
                  transactions made in connection with any third-party websites.
                  Please review carefully the third-party policies and practices
                  and make sure you understand them before you engage in any
                  transaction. Complaints, claims, concerns, or questions
                  regarding third-party products should be directed to the
                  third-party.
                </p>
                <h6>
                  SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
                </h6>
                <p>
                  If, at our request, you send certain specific submissions (for
                  example contest entries) or without a request from us you send
                  creative ideas, suggestions, proposals, plans, or other
                  materials, whether online, by email, by postal mail, or
                  otherwise (collectively, comments), you agree that we may, at
                  any time, without restriction, edit, copy, publish,
                  distribute, translate and otherwise use in any medium any
                  comments that you forward to us. We are and shall be under no
                  obligation (1) to maintain any comments in confidence; (2) to
                  pay compensation for any comments; or (3) to respond to any
                  comments. We may, but have no obligation to, monitor, edit or
                  remove content that we determine in our sole discretion are
                  unlawful, offensive, threatening, libelous, defamatory,
                  pornographic, obscene or otherwise objectionable or violates
                  any party’s intellectual property or these Terms of Service.
                  You agree that your comments will not violate any right of any
                  third-party, including copyright, trademark, privacy,
                  personality or other personal or proprietary right. You
                  further agree that your comments will not contain libelous or
                  otherwise unlawful, abusive or obscene material, or contain
                  any computer virus or other malware that could in any way
                  affect the operation of the Service or any related website.
                  You may not use a false e-mail address, pretend to be someone
                  other than yourself, or otherwise mislead us or third-parties
                  as to the origin of any comments. You are solely responsible
                  for any comments you make and their accuracy. We take no
                  responsibility and assume no liability for any comments posted
                  by you or any third-party.
                </p>
                <h6>SECTION 10 - PERSONAL INFORMATION</h6>
                <p>
                  Your submission of personal information through the store is
                  governed by our Privacy Policy. To view our Privacy Policy.
                </p>
                <h6>SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</h6>
                <p>
                  Occasionally there may be information on our site or in the
                  Service that contains typographical errors, inaccuracies or
                  omissions that may relate to service descriptions, pricing,
                  promotions, offers, service charges, transit times and
                  availability. We reserve the right to correct any errors,
                  inaccuracies or omissions, and to change or update information
                  or cancel orders if any information in the Service or on any
                  related website is inaccurate at any time without prior notice
                  (including after you have submitted your order). We undertake
                  no obligation to update, amend or clarify information in the
                  Service or on any related website, including without
                  limitation, pricing information, except as required by law. No
                  specified update or refresh date applied in the Service or on
                  any related website, should be taken to indicate that all
                  information in the Service or on any related website has been
                  modified or updated.
                </p>
                <h6>SECTION 12 - PROHIBITED USES</h6>
                <p>
                  In addition to other prohibitions as set forth in the Terms of
                  Service, you are prohibited from using the site or its
                  content: (a) for any unlawful purpose; (b) to solicit others
                  to perform or participate in any unlawful acts; (c) to violate
                  any international, federal, provincial or state regulations,
                  rules, laws, or local ordinances; (d) to infringe upon or
                  violate our intellectual property rights or the intellectual
                  property rights of others; (e) to harass, abuse, insult, harm,
                  defame, slander, disparage, intimidate, or discriminate based
                  on gender, sexual orientation, religion, ethnicity, race, age,
                  national origin, or disability; (f) to submit false or
                  misleading information; (g) to upload or transmit viruses or
                  any other type of malicious code that will or may be used in
                  any way that will affect the functionality or operation of the
                  Service or of any related website, other websites, or the
                  Internet; (h) to collect or track the personal information of
                  others; (i) to spam, phish, pharm, pretext, spider, crawl, or
                  scrape; (j) for any obscene or immoral purpose; or (k) to
                  interfere with or circumvent the security features of the
                  Service or any related website, other websites, or the
                  Internet. We reserve the right to terminate your use of the
                  Service or any related website for violating any of the
                  prohibited uses.
                </p>
                <h6>
                  SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
                </h6>
                <p>
                  We do not guarantee, represent or warrant that your use of our
                  service will be uninterrupted, timely, secure or error-free.
                  We do not warrant that the results that may be obtained from
                  the use of the service will be accurate or reliable. You agree
                  that from time to time we may remove the service for
                  indefinite periods of time or cancel the service at any time,
                  without notice to you. You expressly agree that your use of,
                  or inability to use, the service is at your sole risk. The
                  service and all products and services delivered to you through
                  the service are (except as expressly stated by us) provided
                  “as is” and “as available” for your use, without any
                  representation, warranties or conditions of any kind, either
                  express or implied, including all implied warranties or
                  conditions of merchantability, merchantable quality, fitness
                  for a particular purpose, durability, title, and
                  non-infringement. In no case shall Vanpowr Ltd, our directors,
                  officers, employees, affiliates, agents, contractors, interns,
                  suppliers, service providers or licensors be liable for any
                  injury, loss, claim, or any direct, indirect, incidental,
                  punitive, special, or consequential damages of any kind,
                  including, without limitation lost belongings, damaged
                  belongings, loss of data, replacement costs, or any similar
                  damages, whether based in contract, tort (including
                  negligence), strict liability or otherwise, arising from your
                  use of any of the service procured using the service, or for
                  any other claim related in any way to your use of the service
                  or any product, including, but not limited to, any errors or
                  omissions in any content, or any loss or damage of any kind
                  incurred as a result of the use of the service or any content
                  (or product) posted, transmitted, or otherwise made available
                  via the service, even if advised of their possibility. Because
                  some states or jurisdictions do not allow the exclusion or the
                  limitation of liability for consequential or incidental
                  damages, in such states or jurisdictions, our liability shall
                  be limited to the maximum extent permitted by law.
                </p>
                <h6>SECTION 14 - INDEMNIFICATION</h6>
                <p>
                  You agree to indemnify, defend and hold harmless Vanpowr Ltd
                  and our parent, subsidiaries, affiliates, partners, officers,
                  directors, agents, contractors, licensors, service providers,
                  subcontractors, suppliers, interns and employees, harmless
                  from any claim or demand, including reasonable attorneys’
                  fees, made by any third-party due to or arising out of your
                  breach of these Terms of Service or the documents they
                  incorporate by reference, or your violation of any law or the
                  rights of a third-party.
                </p>
                <h6>SECTION 15 - SEVERABILITY</h6>
                <p>
                  In the event that any provision of these Terms of Service is
                  determined to be unlawful, void or unenforceable, such
                  provision shall nonetheless be enforceable to the fullest
                  extent permitted by applicable law, and the unenforceable
                  portion shall be deemed to be severed from these Terms of
                  Service, such determination shall not affect the validity and
                  enforceability of any other remaining provisions.
                </p>
                <h6>SECTION 16 - TERMINATION</h6>
                <p>
                  The obligations and liabilities of the parties incurred prior
                  to the termination date shall survive the termination of this
                  agreement for all purposes. These Terms of Service are
                  effective unless and until terminated by either you or us. You
                  may terminate these Terms of Service at any time by notifying
                  us that you no longer wish to use our Services, or when you
                  cease using our site. If in our sole judgment you fail, or we
                  suspect that you have failed, to comply with any term or
                  provision of these Terms of Service, we also may terminate
                  this agreement at any time without notice and you will remain
                  liable for all amounts due up to and including the date of
                  termination; and/or accordingly may deny you access to our
                  Services (or any part thereof).
                </p>
                <h6>SECTION 17 - ENTIRE AGREEMENT</h6>
                <p>
                  The failure of us to exercise or enforce any right or
                  provision of these Terms of Service shall not constitute a
                  waiver of such right or provision. These Terms of Service and
                  any policies or operating rules posted by us on this site or
                  in respect to The Service constitutes the entire agreement and
                  understanding between you and us and govern your use of the
                  Service, superseding any prior or contemporaneous agreements,
                  communications and proposals, whether oral or written, between
                  you and us (including, but not limited to, any prior versions
                  of the Terms of Service). Any ambiguities in the
                  interpretation of these Terms of Service shall not be
                  construed against the drafting party.
                </p>
                <h6>SECTION 18 - GOVERNING LAW</h6>
                <p>
                  These Terms of Service and any separate agreements whereby we
                  provide you Services shall be governed by and construed in
                  accordance with the laws of the United Kingdom.
                </p>
                <h6>SECTION 19 - CHANGES TO TERMS OF SERVICE</h6>
                <p>
                  You can review the most current version of the Terms of
                  Service at any time at this page. We reserve the right, at our
                  sole discretion, to update, change or replace any part of
                  these Terms of Service by posting updates and changes to our
                  website. It is your responsibility to check our website
                  periodically for changes. Your continued use of or access to
                  our website or the Service following the posting of any
                  changes to these Terms of Service constitutes acceptance of
                  those changes.
                </p>
                <h6>SECTION 20 - MONITORING EMAILS</h6>
                <p>
                  We may store emails for quality and training purposes, we
                  reserve the right to use any emails in the unfortunate event
                  that a legal dispute should arise.
                </p>
                <h6>SECTION 21 - WHO ARE WE?</h6>
                <p>
                  Vanpowr Ltd is a platform who connects customers in need of
                  removals and transport services with independent drivers as
                  well as companies. Vanpowr is not responsible for any
                  transaction made between you and the service provider, Vanpowr
                  can therefore not be held responsible for any disputes.
                </p>
                <h6>SECTION 22 - FEEDBACK</h6>
                <p>
                  We reserve the right to investigate any negative feedback left
                  for us or a service provider, we also reserve the right to
                  either modify or not publish such feedbacks should it be
                  inaccurate or unfair. This will be done without your consent.
                </p>
                <h6>SECTION 23 - GOODS IN TRANSIT</h6>
                <p>
                  Our service providers goods in transit insurance covers up to
                  £10.000.
                </p>
                <h6>SECTION 24 - CANCELLATIONS</h6>
                <p>
                  Cancellations made by the customer is non-refundable.
                  Cancellations made by a driver is refundable if we fail to
                  assign you a replacement driver of the same calibre.
                </p>
                <h6>SECTION 25 - THE FEES</h6>
                <p>
                  Our platform is free to use for our customers, a small
                  reservation fee of 20% is payable when you book a service
                  provider. The payment is made via debit or credit card, the
                  outstanding balance will be paid to the driver upon completion
                  of the job. The customers are responsible for paying any
                  additional monies directly to the driver in cash upon
                  completion of the job, such as exceeding the time booked and
                  any flights of stairs and stop points not mentioned when
                  booking the service provider. Please make a note of the time
                  the driver arrives as your booking starts once the driver has
                  arrived at your chosen pick-up location (only if a time change
                  agreement has been made), the driver will also make you aware
                  once your booked time is about to end. You can either agree to
                  continue into extra time and let the driver complete the job,
                  by doing that you agree to pay the supplement half hourly
                  charge for the vehicle chosen specified on the result(s) page.
                  You may also ask the driver not to complete the job and end
                  the booking at the once your time booked has finished.
                </p>
                <h6>SECTION 26 - YOUR RESPONSIBILITIES</h6>
                <p>
                  It is the customers responsibility to select the correct van
                  size, please refer to the measurements provided on the
                  result(s) page or please contact our customer service team if
                  you are still unsure. It is the customers responsibility to
                  pre-arrange or reserve parking in order to avoid the service
                  provider receiving a parking ticket whilst completing a job.
                  The customer will be required to pay the penalty charge in
                  cash to the driver upon completion of the job. The customer is
                  responsible for packing and preparing everything properly,
                  unless a packing service has been booked. The time of the
                  booking starts once the driver is at the chosen pick-up
                  location (only if a time change agreement has been made).
                  Vanpowr will not be responsible for any loss, damaged or
                  breakage caused by poor packing by customers. It is the
                  customers responsibility to disassemble or reassemble any
                  furniture, items or units etc. before the arrival of the
                  service provider. Unless this service has been requested prior
                  to arrival, in some cases the drivers are able to help with
                  assemble and disassemble depending on availability and tools
                  available, the driver might ask for a small fee for this
                  service which should be paid directly to the driver upon
                  completion of the service. It is the customers responsibility
                  to pay any toll charges/congestion charges and parking charges
                  directly to the driver upon completion of the job. It is the
                  customers responsibility to pay any toll charges/congestion
                  charges and parking charges directly to the driver in cash
                  upon completion of the job. All customers are able to travel
                  in the van, when booking your van the amount of seats
                  including the driver is displayed on the result(s) page. This
                  depends on the vehicle and amount of helpers chosen, if you
                  are unsure then please call the driver on the number provided
                  on your driver booking confirmation. It is also the customers
                  responsibility to make sure that the driver is happy with pets
                  travelling in the van, this decision lies solely with the
                  driver. Vanpowr can not be held responsible for any refusals
                  made by the driver for not accepting pets in their vans,
                  however the customer should contact Vanpowrs customer service
                  team about the situation so they can source a different driver
                  to complete the job. It is the customers responsibility to
                  choose the correct manpower needed, if the customer chooses
                  not receive any help then the customer is liable for any
                  damage to their items. The service provider will not have any
                  involvement loading/unloading, the insurance will only cover
                  for damaged items in the event of a road traffic accident.
                </p>
                <h6>SECTION 27 - EQUIPMENT</h6>
                <p>
                  The service provider will be equipped with trolleys, blankets
                  and straps to carry out home and office moves as well as
                  deliveries.
                </p>
                <h6>SECTION 28 - NO SHOW</h6>
                <p>
                  In the unlikely event that your service provider does not show
                  up at your chosen pick-up location as arranged then please
                  contact our customer service team immediately on
                  hello@vanpowr.com.
                </p>
                <h6>SECTION 29 - VAT ON CONFIRMED BOOKINGS</h6>
                <p>Confirmed bookings are exclusive of VAT.</p>
                <h6>SECTION 30 - MINIMUM BOOKING CHARGE</h6>
                <p>
                  There is a 2 hour minimum charge on all of our bookings,
                  please ensure that you book the correct time needed this
                  includes the time it takes to load and unload the vehicle. In
                  case you need more time than expected you are able to extend
                  your booking depending on the drivers availability, this will
                  be charged at the half hourly cash rate displayed on the
                  result(s) page when booking.
                </p>
                <h6>SECTION 31 - CONTACT INFORMATION</h6>
                <p>
                  Questions about the Terms of Service should be sent to us at
                  hello@vanpowr.com.
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

export default TermsCondition;
