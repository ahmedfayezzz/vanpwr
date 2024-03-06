import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as Icon from 'react-feather';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import FooterOne from './footer-one';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import HomeHeader from '../header/home-header';
import axios from 'axios';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Modal } from 'bootstrap';

const HomeOne = () => {
  const routes = all_routes;
  AOS.init();

  const [collectionAddress, setCollectionAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  sessionStorage.setItem('collectionAddress', collectionAddress);
  sessionStorage.setItem('deliveryAddress', deliveryAddress);

  const handleCollectionSelect = (address) => {
    setCollectionAddress(address);
  };

  const handleDeliverySelect = (address) => {
    setDeliveryAddress(address);
  };

  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!collectionAddress || !deliveryAddress) {
      setErrorMessage('Both collection and delivery addresses are mandatory.');
      return;
    }

    const params = {
      collection_location: collectionAddress,
      dropoff_location: deliveryAddress,
      stops: [],
      day_of_week: 'monday',
      time: '10:00:00',
      van_size: 'Small Van',
      helper_count: 0,
      packings: [],
      assembly: [],
      piano: '',
      hours: 2,
    };


    const loadingModalElement = document.getElementById('loadingModal');
    const loadingModal = new Modal(loadingModalElement);
    loadingModal.show();

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/functions/v1/get-quotes',
        params,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          },
        },
      );


      if (!response.data || response.data.length === 0) {
        setErrorMessage('No drivers available for the selected route.');
        return;
      }

      const prices = response.data.map((quote) => quote.price);

      sessionStorage.setItem('prices', `${Math.min(...prices)}`);

      loadingModal.hide();

      navigate(routes.serviceFilter, {
        state: {
          collectionAddress,
          deliveryAddress,
          results: Math.min(...prices),
        },
      });
    } catch (error) {
      loadingModal.hide();

      console.error('Failed to fetch data:', error);
      setErrorMessage('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const handleScroll = () => {
    AOS.refresh();
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clientSlider = {
    dots: false,
    autoplay: true,
    slidesToShow: 2,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const partnerSlider = {
    dots: false,
    autoplay: true,
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 776,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const heroPics = [
    {
      name: 'assets/img/hero1.png',
      banner: 1,
      shape: 1,
    },
    { name: 'assets/img/hero2.png', banner: 2, shape: 3 },
    { name: 'assets/img/hero3.png', banner: 3, shape: 3 },
    { name: 'assets/img/hero4.png', banner: 4, shape: 2 },
  ];

  const howItWorks = [
    {
      name: 'assets/img/icons/find-icon.svg',
      title: 'Search',
      description: 'Find the best quote',
      number: 1,
    },
    {
      name: 'assets/img/icons/work-icon.svg',
      title: 'Book',
      description: 'Reserve your driver',
      number: 2,
    },
    {
      name: 'assets/img/icons/place-icon.svg',
      title: 'Move',
      description: 'Doorbell rings, time to move',
      number: 3,
    },
  ];

  const clientSliderData = [
    {
      title: 'Amazing Service',
      description:
        'Amazing service, the guys were really helpful moving me from a 2nd floor flat to another 2nd floor flat. I even offered to help but they did it all. Will definitely be using them again and recommending cant thank them enough. Smooth and stress free',
      name: 'Ed Riley',
      link: 'https://g.co/kgs/Ny7xidP',
    },
    {
      title: 'Excellent Service',
      description:
        'Excellent service with vanpowr! The driver sent to me easily loaded up everything in my flat and onto the destination. Such a quick and swift move. All my belongings were packed safely within the van. Very friendly driver! The price was just too good to say no. I will make sure to use vanpowr every time! Thank you once again.',
      name: 'Danny Fryer',
      link: 'https://g.co/kgs/e9HCkSP',
    },
    {
      title: 'Best Moving Experience',
      description:
        'Best moving experience ever with the fabulous Vanpowr. So helpful, quick and efficient. Genuinely a very nice person and passionate about what he does. I will certainly be using him again and would recommend him and his business to anyone needing a van with manpower.',
      name: 'Nicola Brown',
      link: 'https://g.co/kgs/B1SY5jw',
    },
    {
      title: 'Life Saver',
      description:
        'Life Saver! Thank you Vanpowr. These guys helped me out with my move. Superb customer service, quick service, very friendly moreover very adequate pricing. These guys went above and beyond to help me out! Would recommend to anyone!!!!',
      name: 'Mike Suliks',
      link: 'https://g.co/kgs/TN2AmH5',
    },
    {
      title: 'Amazing and Very Helpful',
      description:
        'Very good experience, easy to hire through the website and they had everything done on time. Omar is amazing and very helpful. I will definitely call them again. Highly recommended',
      name: 'Sergio Cachinero Blanco',
      link: 'https://g.co/kgs/CpFLNtU',
    },
    {
      title: 'For Sure Recommend',
      description:
        'Quick and swift move.. everything was securly loaded, really good and genuine guy.. would for sure recommend. Thank you.',
      name: 'Rizwan A',
      link: 'https://g.co/kgs/9F9LjwP',
    },
  ];

  const partnerSliderData = [
    { name: 'assets/img/visa.png' },
    { name: 'assets/img/mastercard.png' },
    { name: 'assets/img/amex.png' },
    { name: 'assets/img/jcb.png' },
    { name: 'assets/img/discover.png' },
  ];

  const options = {
    types: ['address'],
    componentRestrictions: { country: 'uk' },
  };

  return (
    <>
      <HomeHeader type={1} />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="home-banner">
            <div className="row align-items-center w-100">
              <div className="col-lg-7 col-md-10 mx-auto">
                <div className="section-search aos" data-aos="fade-up">
                  <h1>
                    BOOK ON-DEMAND <br /> STRESS-FREE MOVERS{' '}
                  </h1>
                  <p>
                    Compare FREE Moving &amp; Man with Van quotes in under 30
                    seconds
                  </p>
                  <div className="search-box">
                    <form>
                      <div className="search-input line">
                        <div className="search-group-icon">
                          <Icon.MapPin className="standard-feather" />
                        </div>
                        <div className="form-group mb-0">
                          <label>Collection Address </label>
                          <PlacesAutocomplete
                            value={collectionAddress}
                            onChange={setCollectionAddress}
                            onSelect={handleCollectionSelect}
                            options={options}
                            required
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: 'Collection Address',
                                    className: 'form-control',
                                  })}
                                />
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion, index) => (
                                    <div
                                      key={index}
                                      {...getSuggestionItemProps(suggestion, {
                                        className: suggestion.active
                                          ? 'suggestion-item--active'
                                          : 'suggestion-item',
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </div>
                      </div>
                      <div className="search-input">
                        <div className="search-group-icon">
                          <Icon.MapPin className="standard-feather" />
                        </div>
                        <div className="form-group mb-0">
                          <label>Delivery Address</label>
                          <PlacesAutocomplete
                            value={deliveryAddress}
                            onChange={setDeliveryAddress}
                            onSelect={handleDeliverySelect}
                            options={options}
                            required
                          >
                            {({
                              getInputProps,
                              suggestions,
                              getSuggestionItemProps,
                              loading,
                            }) => (
                              <div>
                                <input
                                  {...getInputProps({
                                    placeholder: 'Delivery Address',
                                    className: 'form-control',
                                  })}
                                />
                                <div className="autocomplete-dropdown-container">
                                  {loading && <div>Loading...</div>}
                                  {suggestions.map((suggestion, index) => (
                                    <div
                                      key={index}
                                      {...getSuggestionItemProps(suggestion, {
                                        className: suggestion.active
                                          ? 'suggestion-item--active'
                                          : 'suggestion-item',
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </div>
                      </div>

                      <div className="search-btn">
                        <button
                          className="btn btn-primary"
                          onClick={handleSearch}
                        >
                          <Icon.Search className="react-feather-custom me-2" />
                          Search
                        </button>
                      </div>
                    </form>
                    {errorMessage && (
                      <div
                        style={{
                          color: 'red',
                          textAlign: 'center',
                          // Add any other styles you want
                        }}
                      >
                        {errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div>
                        <ImageWithBasePath
                          src="assets/img/googleReview.png"
                          className="review-image"
                          alt="img"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div>
                        <ImageWithBasePath
                          src="assets/img/trustPilot1.png"
                          className="review-image-1"
                          alt="img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="banner-imgs">
                  {heroPics.map((hero, index) => (
                    <div
                      key={index}
                      className={`banner-${hero.banner} shape-${hero.shape}`}
                    >
                      <ImageWithBasePath
                        className="img-fluid"
                        alt="banner"
                        src={hero.name}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Hero Section */}
      {/* About */}
      <div className="about-sec pt-15">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img">
                <div className="about-exp">
                  <span style={{ marginLeft: '-130px', marginBottom: '-50px' }}>
                    99.9% Customer Satisfaction
                  </span>
                </div>
                <div className="abt-img">
                  <ImageWithBasePath
                    src="assets/img/about.jpeg"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <h6>ABOUT OUR COMPANY</h6>
                <h2>Best Solution For Moving Services</h2>
                <p>
                  We know inviting someone into your home is a big deal. All
                  Vanpowr drivers are carefully vetted by us, so we choose the
                  right person to take care of your move. We guarantee your
                  driver will always be:
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul>
                      <li>Reliable & professional</li>
                      <li>Background checked</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul>
                      <li>English speaking</li>
                      <li>Fully insured</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /About */}

      {/* Work Section */}
      <section className="work-section ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-heading aos" data-aos="fade-up">
                <h2>How It Works</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {howItWorks.map((work, index) => (
              <div className="col-md-4" key={index}>
                <div className="work-box aos" data-aos="fade-up">
                  <div className="work-icon">
                    <span>
                      <ImageWithBasePath src={work.name} alt="img" />
                    </span>
                  </div>
                  <h5>{work.title}</h5>
                  <p>{work.description}</p>
                  <h4>{work.number}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-12 text-center">
              <div
                className="section-heading category-heading aos"
                data-aos="fade-up"
              >
                <h2>Why Choose Vanpowr</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="trust-us-main">
                <div className="trust-us-img">
                  <Icon.MapPin size={50} />
                </div>
                <h6>We cover the entire UK</h6>
                <p>
                  Serving the entire UK to and from Greater London, our moving
                  services ensures a seamless and reliable relocation experience
                  wherever you are.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="trust-us-main">
                <div className="trust-us-img">
                  <Icon.Eye size={50} />
                </div>
                <h6>Quote comparison</h6>
                <p>
                  Benefit from our quote comparison feature, allowing you to
                  find the best rates for your relocation and make an informed
                  decision.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="trust-us-main">
                <div className="trust-us-img">
                  <Icon.CreditCard size={50} />
                </div>
                <h6>Secure online payment</h6>
                <p>
                  Enjoy peace of mind with our secure checkout, ensuring a
                  hassle-free and trustworthy transaction process.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              <div className="trust-us-main">
                <div className="trust-us-img">
                  <Icon.UserCheck size={50} />
                </div>
                <h6>Top customer service</h6>
                <p>
                  Our commitment to excellent customer service ensures that your
                  needs are met with professionalism and efficiency throughout
                  the entire moving process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Work Section */}

      {/* Client Section */}
      <section className="client-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-heading aos" data-aos="fade-up">
                <h2>What our clients say</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Slider {...clientSlider}>
                {clientSliderData.map((client, index) => (
                  <div
                    className="client-box aos"
                    data-aos="fade-up"
                    key={index}
                  >
                    <div className="client-content">
                      <div className="rating">
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                        <i className="fas fa-star filled" />
                      </div>
                      <h6>{client.title}</h6>
                      <p>{client.description}</p>
                    </div>
                    <div className="client-img">
                      <div className="client-name">
                        <h5>{client.name}</h5>
                        <Link to={client.link}>See on Google Reviews</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* /Client Section */}

      {/* Partners Section */}
      <section className="blog-section ">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center aos " data-aos="fade-up">
              <div className="section-heading">
                <h2>We accept payments by </h2>
              </div>
            </div>
            <div className="aos" data-aos="fade-up">
              <Slider {...partnerSlider}>
                {partnerSliderData.map((partner, index) => (
                  <div className="partner-img" key={index}>
                    <ImageWithBasePath src={partner.name} alt="img" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* Partners Section */}

      <>
        {/* Loading Modal */}
        <div
          className="modal fade"
          id="loadingModal"
          tabIndex={-1}
          aria-labelledby="loadingModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Loading Modal */}
      </>

      <FooterOne />
    </>
  );
};
export default HomeOne;
