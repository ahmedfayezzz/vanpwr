import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { all_routes } from '../../../../core/data/routes/all_routes';

const Faq = () => {
  const routes = all_routes;
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const faq = [
    {
      question: 'How does this service work?',
      answer:
        'We know how stressful moving can be, so we have created a large database of local, reliable removals drivers as well as companies. We connect our customers with experienced removals drivers and companies in their area to make moving hassle free.',
    },
    {
      question: 'How do I book?',
      answer:
        'To book a removals driver, simply fill in the required details of your move and receive your free quotes instantly. Once you have selected your driver, proceed to pay using our secure checkout. We will then email you your booking confirmation along with the drivers contact information.',
    },
    {
      question: 'How do I pay?',
      answer:
        'To make moving easier for our customers, we allow you to reserve your driver and settle the outstanding balance with the driver on completion.',
    },
    {
      question: 'Is there a cancellation fee?',
      answer:
        'If you for any reason decide to cancel your booking, a cancellation fee may apply. Please read our ‘Refund & Cancellation policy’ in the Terms and Conditions',
    },
    {
      question: 'What if my move takes longer than expected?',
      answer:
        'Please ensure you book enough hours for your move, we recommend adding an extra hour to the time you expect it will take to load, drive and unload. If your move happens to take longer than expected, you will be able to extend your booking directly with the driver depending on their availability.',
    },
    {
      question: 'What if the driver cancels my booking?',
      answer:
        'In the unlikely event that your driver cancels your booking, we will do our best to provide you with a driver of the same calibre.',
    },
    {
      question: 'Can I travel in the van?',
      answer:
        'This decision lies solely with the driver, please contact your assigned driver for confirmation.',
    },
    {
      question: 'Will the driver help me move?',
      answer:
        'This depends on the option selected when you book your move. You can choose between having 1-3 helpers including the driver or no help at all.',
    },
    {
      question: 'Does my quote include parking fees?',
      answer:
        'No, you will be required to pay any parking fees directly to the driver upon completion of the move.',
    },
    {
      question: 'Does my quote include toll charges?',
      answer:
        'No, you will be required to pay any toll charges directly to the driver upon completion of the move.',
    },
    {
      question:
        'Can extra stops be made between the collection point and delivery point?',
      answer:
        'Yes, extra stops can be made, however this must be selected at the booking stage.',
    },
    {
      question: 'Are your drivers insured?',
      answer:
        'Yes, all the drivers are insured. You can choose between bronze cover, silver cover and gold cover.',
    },
    {
      question: 'What is bronze cover?',
      answer:
        'Bronze cover means that the driver holds a valid motor insurance and a driver’s license.',
    },
    {
      question: 'What is silver cover?',
      answer:
        'Silver cover means that the driver holds a valid motor insurance, driver’s license, and goods in transit insurance.',
    },
    {
      question: 'What is gold cover?',
      answer:
        'Gold cover means that the driver holds a valid motor insurance, driver’s license, goods in transit insurance as well as public liability insurance.',
    },
    {
      question: 'What if I book the wrong van size?',
      answer:
        'Please see the measurements provided for each van size before making a booking, if the van you booked is still too small then the driver will be able to make a second trip for an extra charge depending on distance and availability.',
    },
    {
      question: 'What if my driver is late?',
      answer:
        'Our drivers aim to be on time, every time. However, drivers may sometimes be delayed due to unforeseen circumstances such as bad weather and traffic. In this case the driver would call ahead to notify you about the delay, if you are unable to wait for the driver then please contact us immediately and we will do our best to dispatch a different driver who will be able to get to you earlier.',
    },
    {
      question: 'What if I am late?',
      answer: 'Please notify your assigned driver of any delays.',
    },
    {
      question: 'Can my pet travel with me in the van?',
      answer:
        'This decision lies solely with the driver, please contact your assigned driver for confirmation.',
    },
    {
      question:
        'Will my driver help me disassemble and reassemble my furniture?',
      answer:
        'Yes, for a fee your driver will help disassemble and reassemble your furniture.',
    },
  ];
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">FAQ</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Faq List */}
            <div className="col-md-10 mx-auto">
              <div className="faq-section">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-lead">
                  We have compiled a list of frequently asked questions to help
                  you understand our service better.
                </p>
                {faq.map((item, index) => (
                  <div className="faq-card" key={index}>
                    <h4 className="faq-title">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to={`#faq${index}`}
                        aria-expanded="false"
                      >
                        {item.question}
                      </Link>
                    </h4>
                    <div id={`faq${index}`} className="card-collapse collapse">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* /Faq List */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
