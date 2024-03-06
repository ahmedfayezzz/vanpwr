import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-feather';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { Modal } from 'bootstrap';

const ServiceList = () => {
  const pageParams = useSelector((state: any) => state.quotes);
  const routes = all_routes;

  const [quotes, setQuotes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [viewType, setViewType] = useState('list');
  const [collectionAddress, setCollectionAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [value, setValue] = useState([minPrice, maxPrice]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const params = {
      collection_location: pageParams.collection_location,
      dropoff_location: pageParams.dropoff_location,
      stops: pageParams.stops,
      day_of_week: getDayName(pageParams.day_of_week),
      time: pageParams.time,
      van_size: pageParams.van_size,
      helper_count: pageParams.helper_count,
      packings: getPackingOptions(pageParams.packings),
      assembly: getAssemblyOptions(pageParams.assembly),
      piano: handleEmptyArray(pageParams.piano),
      hours: parseInt(pageParams.hours, 10),
      floors: parseInt(pageParams.floors, 10),
    };

    const loadingModalElement = document.getElementById('loadingModal');
    const loadingModal = new Modal(loadingModalElement);
    loadingModal.show();
    const fetchData = async () => {
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

        loadingModal.hide();

        setQuotes(response.data);
      } catch (error) {
        loadingModal.hide();

        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const collectionAddr = sessionStorage.getItem('collectionAddress');
    const deliveryAddr = sessionStorage.getItem('deliveryAddress');

    if (collectionAddr) setCollectionAddress(collectionAddr);
    if (deliveryAddr) setDeliveryAddress(deliveryAddr);
  }, []);

  const getDayName = (dayNumber) => {
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return days[dayNumber];
  };

  const handleEmptyArray = (arr) => {
    if (arr.length === 0) {
      return '';
    } else {
      arr = arr.map((item) => {
        return item.name.toLowerCase().split(' ')[0];
      });
    }
    return arr;
  };

  const getAssemblyOptions = (assemblyOptions) => {
    if (
      assemblyOptions.length === 1 &&
      assemblyOptions[0].name === '' &&
      assemblyOptions[0].type === ''
    ) {
      return [];
    }
    return assemblyOptions;
  };

  const getPackingOptions = (packingOptions) => {
    if (
      packingOptions.length === 1 &&
      packingOptions[0].name === '' &&
      packingOptions[0].amount === 0
    ) {
      return [];
    }
    return packingOptions;
  };

  const sortServices = (option: string) => {
    let sortedServices;

    if (option === 'Price Low to High') {
      sortedServices = [...quotes].sort((a, b) => a.price - b.price);
    } else if (option === 'Price High to Low') {
      sortedServices = [...quotes].sort((a, b) => b.price - a.price);
    }

    setQuotes(sortedServices || []);
  };

  const handleSortOptionChange = (event: DropdownChangeEvent) => {
    setSortOption(event.target.value);
    sortServices(event.target.value);
  };

  const calculateTotalPrice = (data) => {
    let total_price = data.price || 0;

    total_price += data.floors_price || 0;

    total_price += parseFloat(data.mileage_price) || 0;

    const packing_price = data.packing_price || [];
    for (const packing of packing_price) {
      total_price += packing.price || 0;
    }

    const assembly_price = data.assembly_price || [];
    for (const assembly of assembly_price) {
      total_price += assembly.price || 0;
    }

    total_price += data.piano_price || 0;

    return total_price;
  };

  const priceRanking = [
    { name: 'Price Low to High', value: 'Price Low to High' },
    { name: 'Price High to Low', value: 'Price High to Low' },
  ];

  const totalItems = quotes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentItems = quotes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Quotes</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Filter */}
            {/* Filter */}
            <div className="col-lg-3 col-sm-12 theiaStickySidebar">
              <div className="stickybar">
                <div className="filter-div">
                  <div className="filter-head">
                    <h5>Your options</h5>
                  </div>
                  <div className="filter-content">
                    <h2>Van Size</h2>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Location"
                        value={pageParams.van_size}
                        readOnly
                      />
                    </div>
                    <br />
                    <h2>Helpers</h2>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Location"
                        value={pageParams.helper_count}
                        readOnly
                      />
                    </div>
                    <br />
                    <h2>Collection Address</h2>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Location"
                        value={collectionAddress}
                        readOnly
                      />
                      <Icon.MapPin className="react-feather-custom" />
                    </div>
                    <br />
                    <h2>Delivery Address</h2>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Location"
                        value={deliveryAddress}
                        readOnly
                      />
                      <Icon.MapPin className="react-feather-custom" />
                    </div>
                    <br />
                    <h2>Hours</h2>
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Select Location"
                        value={pageParams.hours}
                        readOnly
                      />
                    </div>
                    <br />
                    <Link to={routes.serviceFilter} className="reset-link">
                      Edit options
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* /Filter */}
            {/* /Filter */}
            {/* Service */}
            <div className="col-lg-9 col-sm-12">
              <div className="row sorting-div">
                <div className="col-lg-4 col-sm-12 ">
                  <div className="count-search">
                    <h6>Found {quotes.length} Services</h6>
                  </div>
                </div>
                <div className="col-lg-8 col-sm-12 d-flex justify-content-end ">
                  <div className="sortbyset">
                    <div className="sorting-select">
                      <Dropdown
                        value={sortOption}
                        onChange={handleSortOptionChange}
                        options={priceRanking}
                        optionLabel="name"
                        placeholder="Price Low to High"
                        className="select service-select"
                      />
                    </div>
                  </div>
                  <div className="grid-listview">
                    <ul>
                      <li>
                        <a
                          onClick={() => setViewType('grid')}
                          className={viewType === 'grid' ? 'active' : ''}
                        >
                          <Icon.Grid className="react-feather-custom" />
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => setViewType('list')}
                          className={viewType === 'list' ? 'active' : ''}
                        >
                          <Icon.List className="react-feather-custom" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Service List */}
                {viewType === 'list'
                  ? currentItems.map((item, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="service-list">
                          <div className="service-cont">
                            <div className="service-cont-img">
                              <img
                                className="img-fluid serv-img"
                                alt="Service Image"
                                src={item.van_photo}
                              />
                            </div>
                            <div className="service-cont-info">
                              <span className="item-cat">
                                {item.insurance_level}
                              </span>
                              <h3 className="title">
                                <Link to={item.bookingRoute}>
                                  {item.driver_name}
                                </Link>
                              </h3>
                              <p>
                                <i className="feather-map-pin" />
                                {item.location}
                              </p>
                              <div className="service-pro-img">
                                <img src={item.profile} alt="User" />
                              </div>
                            </div>
                          </div>
                          <div className="service-action d-flex">
                            <div className="col-md-4">
                              <h6>
                                £
                                {parseFloat(
                                  calculateTotalPrice(item).toFixed(2),
                                )}
                              </h6>
                            </div>
                            <div className="col-md-8">
                              <Link
                                to={routes.booking1}
                                className="btn btn-secondary"
                                onClick={() => {
                                  sessionStorage.setItem(
                                    'driverServiceId',
                                    item.driver_service_id,
                                  );
                                  sessionStorage.setItem(
                                    'totalDistance',
                                    item.totalDistance,
                                  );
                                }}
                              >
                                Reserve driver for £
                                {parseFloat(
                                  (calculateTotalPrice(item) * 0.2).toFixed(2),
                                )}{' '}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : currentItems.map((item, index) => (
                      <div className="col-xl-4 col-md-6" key={index}>
                        <div className="service-widget servicecontent">
                          <div className="service-img">
                            <img
                              className="img-fluid serv-img"
                              alt="Service Image"
                              src={item.van_photo}
                            />
                          </div>

                          <div className="service-content">
                            <p>
                              <span className="item-cat">
                                {item.insurance_level}
                              </span>{' '}
                            </p>

                            <h3 className="title">
                              <Link to={item.bookingRoute}>
                                {item.driver_name}
                              </Link>

                              <span className="item-img">
                                <img
                                  src={item.profile}
                                  className="avatar"
                                  alt="User"
                                />
                              </span>
                            </h3>
                            <p>
                              <i className="feather-map-pin" />
                              {item.location}
                            </p>

                            <div className="serv-info d-flex">
                              <div className="col-md-4">
                                <h6>
                                  £
                                  {parseFloat(
                                    calculateTotalPrice(item).toFixed(2),
                                  )}
                                </h6>
                              </div>
                              <div className="col-md-8">
                                <Link
                                  to={routes.booking1}
                                  className="btn btn-secondary"
                                  onClick={() => {
                                    sessionStorage.setItem(
                                      'driverServiceId',
                                      item.driver_service_id,
                                    );
                                    sessionStorage.setItem(
                                      'totalDistance',
                                      item.totalDistance,
                                    );
                                  }}
                                >
                                  Reserve driver for £
                                  {parseFloat(
                                    (calculateTotalPrice(item) * 0.2).toFixed(
                                      2,
                                    ),
                                  )}{' '}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                {/* /Service List */}
              </div>
              {/* Pagination */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="blog-pagination rev-page">
                    <nav>
                      <ul className="pagination justify-content-center mt-0">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? 'disabled' : ''
                          }`}
                        >
                          <Link
                            className="page-link page-prev"
                            onClick={handlePrev}
                          >
                            <i className="fa-solid fa-arrow-left me-1" /> PREV
                          </Link>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            className={`page-item ${
                              index + 1 === currentPage ? 'active' : ''
                            }`}
                            key={index}
                          >
                            <Link
                              className="page-link"
                              onClick={() => handleClick(index + 1)}
                            >
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? 'disabled' : ''
                          }`}
                        >
                          <Link
                            className="page-link page-next"
                            onClick={handleNext}
                          >
                            NEXT <i className="fa-solid fa-arrow-right ms-1" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              {/* /Pagination */}
            </div>
            {/* /Service */}
          </div>
        </div>
      </div>

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
    </>
  );
};

export default ServiceList;
