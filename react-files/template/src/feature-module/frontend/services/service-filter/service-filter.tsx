import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as Icon from 'react-feather';

import { Dropdown } from 'primereact/dropdown';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import { all_routes } from '../../../../core/data/routes/all_routes';
import Calendar from 'react-calendar';
import PlacesAutocomplete from 'react-places-autocomplete';
import { setQuotes } from '../../../../core/data/redux/action';
import { useDispatch } from 'react-redux';
const routes = all_routes;

const ServiceFilter = () => {
  dayjs.extend(customParseFormat);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const collectionAddress =
    sessionStorage.getItem('collectionAddress') ||
    location.state.collectionAddress;
  const deliveryAddress =
    sessionStorage.getItem('deliveryAddress') || location.state.deliveryAddress;
  const results = sessionStorage.getItem('prices') || location.state.results;

  const [selectedVehicleSize, setselectedVehicleSize] = useState('Small Van');
  const [selectedHelp, setselectedHelp] = useState(0);
  const [isPacking, setIsPacking] = useState(false);
  const [packingOptions, setPackingOptions] = useState([
    { name: '', amount: 0 },
  ]);
  const [isAssembly, setIsAssembly] = useState(false);
  const [assemblyOptions, setAssemblyOptions] = useState([
    { name: '', type: '' },
  ]);
  const [isPiano, setIsPiano] = useState(false);
  const [pianoOptions, setPainoOptions] = useState([{ name: '' }]);
  const [description, setDescription] = useState('');
  const [collectionAddressState, setCollectionAddressState] = useState('');
  const [stops, setStops] = useState([]);
  const [deliveryAddressState, setDeliveryAddressState] = useState('');
  const [selectedFloors, setselectedFloors] = useState('Ground floor or Lift');
  const [selectedHours, setselectedHours] = useState('2 hour');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('12:00');

  useEffect(() => {
    if (!isPacking && !isAssembly && !isPiano) {
      setPackingOptions([]);
      setAssemblyOptions([]);
      setPainoOptions([]);
    }
  }, [isPacking, isAssembly, isPiano]);

  useEffect(() => {
    setCollectionAddressState(collectionAddress);
  }, [collectionAddress]);

  useEffect(() => {
    setDeliveryAddressState(deliveryAddress);
  }, [deliveryAddress]);

  const handleClick = () => {
    const params = {
      collection_location: collectionAddressState,
      dropoff_location: deliveryAddressState,
      stops: stops.filter((stop) => stop !== ''),
      floors: selectedFloors,
      day_of_week: selectedDate.getDay(),
      date: dayjs(selectedDate).format('DD/MM/YYYY'),
      time: selectedTime,
      van_size: selectedVehicleSize,
      helper_count: selectedHelp,
      packings: packingOptions,
      assembly: formattedAssemblyOptions,
      piano: pianoOptions,
      hours: selectedHours,
      description: description,
    };

    dispatch(setQuotes(params));

    navigate(routes.serviceList);
  };

  const handleVehicleSizeClick = (size: React.SetStateAction<string>) => {
    setselectedVehicleSize(size);
  };

  const handleHelpClick = (count: React.SetStateAction<number>) => {
    setselectedHelp(count);
  };

  const handlePackOptionChange = (
    index: number,
    field: string,
    value: React.SetStateAction<string | number>,
  ) => {
    const newPackingOptions = [...packingOptions];
    newPackingOptions[index][field] = value;
    setPackingOptions(newPackingOptions);
  };

  const addPackOption = () => {
    setPackingOptions([...packingOptions, { name: '', amount: 0 }]);
  };

  const removePackOption = (index: number) => {
    const newPackingOptions = [...packingOptions];
    newPackingOptions.splice(index, 1);
    setPackingOptions(newPackingOptions);
  };

  const handleAssemblyOptionChange = (
    index: number,
    field: string,
    value: React.SetStateAction<string>,
  ) => {
    const newAssemblyOptions = [...assemblyOptions];
    newAssemblyOptions[index][field] = value;
    setAssemblyOptions(newAssemblyOptions);
  };

  const addAssemblyOption = () => {
    setAssemblyOptions([...assemblyOptions, { name: '', type: '' }]);
  };

  const removeAssemblyOption = (index: number) => {
    const newAssemblyOptions = [...assemblyOptions];
    newAssemblyOptions.splice(index, 1);
    setAssemblyOptions(newAssemblyOptions);
  };

  const groupedAssemblyOptions = assemblyOptions.reduce((acc, option) => {
    const key = option.type;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});

  const formattedAssemblyOptions = Object.entries(groupedAssemblyOptions).map(
    ([type, amount]) => ({
      type,
      amount,
    }),
  );

  const handlePianoOptionChange = (
    index: number,
    field: string,
    value: React.SetStateAction<string | number>,
  ) => {
    const newPianoOptions = [...pianoOptions];
    newPianoOptions[index][field] = value;
    setPainoOptions(newPianoOptions);
  };

  const addPianoOption = () => {
    setPainoOptions([...pianoOptions, { name: '' }]);
  };

  const removePianoOption = (index: number) => {
    const newPianoOptions = [...pianoOptions];
    newPianoOptions.splice(index, 1);
    setPainoOptions(newPianoOptions);
  };

  const handleCollectionSelect = (address) => {
    setCollectionAddressState(address);
  };

  const handleDeliverySelect = (address) => {
    setDeliveryAddressState(address);
  };

  const handleStopSelect = (index, address) => {
    const newStops = [...stops];
    newStops[index] = address;
    setStops(newStops);
  };

  const handleStopChange = (index, address) => {
    const newStops = [...stops];
    newStops[index] = address;
    setStops(newStops);
  };

  const handelAdd = () => {
    setStops((prevStops) => [...prevStops, '']);
  };

  const handelRemove = (index) => {
    setStops((prevStops) => prevStops.filter((stop, i) => i !== index));
  };

  const handleDateChange = (value: React.SetStateAction<Date>) => {
    setSelectedDate(value);
  };

  const handleTimeClick = (time: React.SetStateAction<string>) => {
    setSelectedTime(time);
  };

  const vehicleInfo = [
    {
      size: 'Small Van',
      pic: 'assets/img/SmallVan.png',
      length: '1.5-1.7m / 4.92-5.58ft',
      width: '1.4-1.5m / 4.59-4.92ft',
      height: '1.2m / 3.94ft',
      payload: '500kg to 900kg',
      seats: '2',
      loadVolume: '3m3 / 106ft3',
    },
    {
      size: 'Medium Van',
      pic: 'assets/img/MediumVan.png',
      length: '2.4m/7.8ft',
      width: '1.7m/5.58ft',
      height: '1.4-1.65m / 4.59-5.41ft',
      payload: '900kg to 1,200kg ',
      seats: '3',
      loadVolume: '5.9m3 / 208.4ft3',
    },
    {
      size: 'Large Van',
      pic: 'assets/img/LargeVan.png',
      length: '3.5-4m / 11.48-13.12ft',
      width: '1.7m / 5.58ft',
      height: '1.7m / 5.58ft',
      payload: '1,000kg to 1200kg',
      seats: '3',
      loadVolume: '11.3m3 / 399.1ft3',
    },
    {
      size: 'Extra Large Van',
      pic: 'assets/img/ExtraLargeVan.png',
      length: '4.5m / 14.76ft',
      width: '1.7m / 5.58ft',
      height: '1.8m / 6.2ft',
      payload: '1,000kg to 1200kg',
      seats: '3',
      loadVolume: '15-17m3 / 529.72-600.35ft3',
    },
    {
      size: 'Luton Van',
      pic: 'assets/img/LutonVan.png',
      length: '4m / 13.12ft',
      width: '2m / 6.56ft',
      height: '2.2m / 7.22ft',
      payload: '1,000kg to 1,100kg',
      seats: '3',
      loadVolume: '19m3 / 670.979ft3',
    },
    {
      size: '7.5T Lorry',
      pic: 'assets/img/7.5TLorry.png',
      length: '6m / 19.68ft',
      width: '6m / 19.68ft',
      height: '12.4-3.4m / 7.87-11.15ft',
      payload: '2,500-2.800kg',
      seats: '2/3',
      loadVolume: '33.9m3 / 1197.17ft3',
    },
  ];

  const helpOptions = [
    {
      help: 'No help needed',
      description:
        'Your driver will arrive and drive, he will not assist with loading or unloading',
      count: 0,
    },
    {
      help: 'Driver helping',
      description:
        'Your driver will arrive  and he will  assist with loading or unloading',
      count: 1,
    },
    {
      help: 'Driver + 1 helper',
      description:
        'Your driver will arrive, and he will bring one helper to assist with loading or unloading',
      count: 2,
    },
    {
      help: 'Driver + 2 helpers',
      description:
        'Your driver will arive , and he will bring two helpers to assist with loading or unloading',
      count: 3,
    },
  ];

  const packOptions = [
    'Tape',
    'Packing Paper',
    'Small Box',
    'Medium Box',
    'Large Box',
    'Wardrobe Box',
    'Small Bubble Wrap Roll',
    'Large Bubble Wrap Roll',
  ];

  const category = [
    'Baby Cot',
    'Bunk Bed',
    'Single Bed',
    'Double Bed',
    'King Size Bed',
    'Single Bed (Ottoman)',
    'Double Bed (Ottoman)',
    'King Size Bed (Ottoman)',
    'Two Door Wardrobe',
    'Three Door Wardrobe',
    'Four Door Wardrobe',
    'Sliding Door Wardrobe',
    'Sliding Miror Wardrobe',
    'Chest of Drawers',
    'Vanity',
    'Office Desk',
    'Meeting Table',
    'Book Shelving Unit',
    'Dining Table',
    'Dining Display Cabinet',
    'TV Stand',
    'Cabinet',
    'TV Cabinet',
    'Arm Chair',
    'Arm Chair (Recliner)',
    'Sofa Bed',
    'Two Seater Sofa',
    'Two Seater Sofa (Recliner)',
    'Three Seater Sofa',
    'Three Seater Sofa (Recliner)',
    'L Shape Sofa',
    'L Shape Sofa (Recliner)',
    'Multi Gym Machine',
    'Treadmill',
    'Garden Table',
    'Trampoline',
  ];

  const catOptions = ['Assembly', 'Disassembly', 'Both'];

  const piano = ['Upright Piano', 'Grand Piano'];

  const floors = [
    'Ground floor or Lift',
    '1 floor',
    '2 floors',
    '3 floors',
    '4 floors',
    '5 floors',
    '6 floors',
    '7 floors',
    '8 floors',
    '9 floors',
    '10 floors',
  ];

  const hours = [
    '2 hour',
    '3 hour',
    '4 hour',
    '5 hour',
    '6 hour',
    '7 hour',
    '8 hour',
    '9 hour',
    '10 hour',
    '11 hour',
    '12 hour',
    '13 hour',
    '14 hour',
    '15 hour',
  ];

  const time = [
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const options = {
    types: ['address'],
    componentRestrictions: { country: 'uk' },
  };

  return (
    <>
      <>
        {/* Breadcrumb */}
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-12">
                <h2 className="breadcrumb-title">
                  Your Vanpowr quote could be as low as:{' '}
                </h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb"></nav>
              </div>
              <div className="col-md-4 col-12">
                <h2 className="breadcrumb-title">£{results}</h2>
                <nav aria-label="breadcrumb" className="page-breadcrumb"></nav>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
      </>

      <div className="page-wrapper">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="service-inform-fieldset">
                  {/* Service Information */}
                  <fieldset id="first-field">
                    {/* Vechile size  Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>Which vehicle do you need?</h6>
                          </div>
                        </div>
                        <div className="container">
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                            >
                              <div
                                className="row aos justify-content-center"
                                data-aos="fade-up"
                              >
                                {vehicleInfo.map((vehicle, index) => (
                                  <div
                                    key={index}
                                    className="col-lg-4 col-md-6 col-12"
                                    onClick={() =>
                                      handleVehicleSizeClick(vehicle.size)
                                    }
                                  >
                                    <div
                                      className={`pricing-plans pricing-plans-five ${
                                        selectedVehicleSize === vehicle.size
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      <div className="pricing-planshead-five">
                                        <h4>{vehicle.size}</h4>
                                      </div>
                                      <div className="pricing-planscontent pricing-planscontent-five">
                                        <ul>
                                          <li>
                                            <span>
                                              <ImageWithBasePath
                                                className={` ${
                                                  vehicle.size === 'Luton Van'
                                                    ? 'vehicle-image-luton'
                                                    : 'vehicle-image'
                                                } `}
                                                src={vehicle.pic}
                                                alt={vehicle.size}
                                              />
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              Length: {vehicle.length}
                                            </span>
                                          </li>
                                          <li>
                                            <span>Width: {vehicle.width}</span>
                                          </li>
                                          <li>
                                            <span>
                                              Height: {vehicle.height}
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              Payload: {vehicle.payload}
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              Seats(inc driver): {vehicle.seats}
                                            </span>
                                          </li>
                                          <li>
                                            <span>
                                              Load Volume: {vehicle.loadVolume}
                                            </span>
                                          </li>
                                        </ul>
                                        <div className="pricing-btn-five">
                                          <button
                                            className="btn btn-primary btn-view "
                                            style={{ width: '100%' }}
                                          >
                                            Choose {vehicle.size}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Vechile size Section */}
                    {/* Vehicle Help Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>
                              Do you need help with loading and unloading?
                            </h6>
                          </div>
                        </div>

                        <div className="container">
                          <div className="tab-content" id="pills-tabContent">
                            <div
                              className="tab-pane fade show active"
                              id="pills-home"
                              role="tabpanel"
                              aria-labelledby="pills-home-tab"
                            >
                              <div
                                className="row aos justify-content-center"
                                data-aos="fade-up"
                              >
                                {helpOptions.map((helpOption, index) => (
                                  <div
                                    key={index}
                                    className="col-lg-3 col-md-6 col-12"
                                    onClick={() =>
                                      handleHelpClick(helpOption.count)
                                    }
                                  >
                                    <div
                                      className={`pricing-plans pricing-plans-five ${
                                        selectedHelp === helpOption.count
                                          ? 'active'
                                          : ''
                                      }`}
                                    >
                                      <div className="pricing-planshead-five">
                                        <h4>{helpOption.help}</h4>
                                      </div>
                                      <div className="pricing-planscontent pricing-planscontent-five">
                                        <ul>
                                          <li>
                                            <span>
                                              {helpOption.description}
                                            </span>
                                          </li>
                                        </ul>
                                        <div className="pricing-btn-five">
                                          <button
                                            className="btn btn-primary btn-view"
                                            style={{ width: '100%' }}
                                          >
                                            Choose {helpOption.help}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Vechile Help  Section */}
                    {/* Vechile Packing  Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="add-service-toggle">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="sub-title">
                                <h6>Do you need packing?</h6>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="status-toggle sml-status float-sm-end">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={isPacking}
                                  onChange={(e) =>
                                    setIsPacking(e.target.checked)
                                  }
                                />
                                <label
                                  htmlFor="status_1"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {isPacking && (
                          <div className="container">
                            <div className="tab-content" id="pills-tabContent">
                              <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                              >
                                <div
                                  className="row aos justify-content-center"
                                  data-aos="fade-up"
                                >
                                  {packingOptions.map((option, index) => (
                                    <div
                                      className="row service-cont"
                                      key={index}
                                    >
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            The packing option I need is
                                          </label>
                                          <Dropdown
                                            value={packingOptions[index].name}
                                            onChange={(e) => {
                                              handlePackOptionChange(
                                                index,
                                                'name',
                                                e.value,
                                              );
                                            }}
                                            options={packOptions}
                                            placeholder="Select Item"
                                            className="select w-100"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-5">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            The amount I need is
                                          </label>
                                          <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Enter amount"
                                            value={option.amount}
                                            min="0"
                                            onChange={(e) =>
                                              handlePackOptionChange(
                                                index,
                                                'amount',
                                                Number(e.target.value),
                                              )
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-1">
                                        <div className="d-flex mt-5">
                                          <div
                                            className="form-group"
                                            onClick={() =>
                                              removePackOption(index)
                                            }
                                          >
                                            <label className="col-form-label">
                                              &nbsp;
                                            </label>
                                            <Link
                                              to="#"
                                              className="btn btn-danger-outline trash"
                                            >
                                              <i className="far fa-trash-alt"></i>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <Link
                                    to="#"
                                    className="add-text add-extra"
                                    onClick={addPackOption}
                                  >
                                    <i className="feather-plus-circle" /> Add
                                    new packing option
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Vechile Packing  Section */}
                    {/* Vehicle Assembly  Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="add-service-toggle">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="sub-title">
                                <h6>Do you need assembly or disassembly?</h6>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="status-toggle sml-status float-sm-end">
                                <input
                                  type="checkbox"
                                  id="status_2"
                                  className="check"
                                  checked={isAssembly}
                                  onChange={(e) =>
                                    setIsAssembly(e.target.checked)
                                  }
                                />
                                <label
                                  htmlFor="status_2"
                                  className="checktoggle"
                                >
                                  checkbox
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {isAssembly && (
                          <div className="container">
                            <div className="tab-content" id="pills-tabContent">
                              <div
                                className="tab-pane fade show active"
                                id="pills-home"
                                role="tabpanel"
                                aria-labelledby="pills-home-tab"
                              >
                                <div
                                  className="row aos justify-content-center"
                                  data-aos="fade-up"
                                >
                                  {assemblyOptions.map((option, index) => (
                                    <div
                                      className="row service-cont"
                                      key={index}
                                    >
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            The item I have is
                                          </label>
                                          <Dropdown
                                            value={assemblyOptions[index].name}
                                            onChange={(e) => {
                                              handleAssemblyOptionChange(
                                                index,
                                                'name',
                                                e.value,
                                              );
                                            }}
                                            options={category}
                                            placeholder="Select Item"
                                            className="select w-100"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-5">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            I want
                                          </label>
                                          <Dropdown
                                            value={assemblyOptions[index].type}
                                            onChange={(e) =>
                                              handleAssemblyOptionChange(
                                                index,
                                                'type',
                                                e.value,
                                              )
                                            }
                                            options={catOptions}
                                            placeholder="Select "
                                            className="select w-100"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-1">
                                        <div className="d-flex mt-5">
                                          <div
                                            className="form-group"
                                            onClick={() =>
                                              removeAssemblyOption(index)
                                            }
                                          >
                                            <label className="col-form-label">
                                              &nbsp;
                                            </label>
                                            <Link
                                              to="#"
                                              className="btn btn-danger-outline trash"
                                            >
                                              <i className="far fa-trash-alt"></i>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <Link
                                    to="#"
                                    className="add-text add-extra"
                                    onClick={addAssemblyOption}
                                  >
                                    <i className="feather-plus-circle" /> Add
                                    Item
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* /Assembly Section */}
                    {/* Piano  Section */}
                    {selectedHelp !== 0 && (
                      <div className="card add-service">
                        <div className="row">
                          <div className="add-service-toggle">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="sub-title">
                                  <h6>Are you moving a piano?</h6>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="status-toggle sml-status float-sm-end">
                                  <input
                                    type="checkbox"
                                    id="status_3"
                                    className="check"
                                    checked={isPiano}
                                    onChange={(e) =>
                                      setIsPiano(e.target.checked)
                                    }
                                  />
                                  <label
                                    htmlFor="status_3"
                                    className="checktoggle"
                                  >
                                    checkbox
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {isPiano && (
                            <div className="container">
                              <div
                                className="tab-content"
                                id="pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="pills-home"
                                  role="tabpanel"
                                  aria-labelledby="pills-home-tab"
                                >
                                  <div
                                    className="row aos justify-content-center"
                                    data-aos="fade-up"
                                  >
                                    {pianoOptions.map((option, index) => (
                                      <div
                                        className="row service-cont"
                                        key={index}
                                      >
                                        <div className="col-md-6">
                                          <div className="form-group">
                                            <label className="col-form-label">
                                              The piano I have is
                                            </label>
                                            <Dropdown
                                              value={pianoOptions[index].name}
                                              onChange={(e) => {
                                                handlePianoOptionChange(
                                                  index,
                                                  'name',
                                                  e.value,
                                                );
                                              }}
                                              options={piano}
                                              placeholder="Select Piano"
                                              className="select w-100"
                                            />
                                          </div>
                                        </div>
                                        <div className="col-md-1">
                                          <div className="d-flex mt-5">
                                            <div
                                              className="form-group"
                                              onClick={() =>
                                                removePianoOption(index)
                                              }
                                            >
                                              <label className="col-form-label">
                                                &nbsp;
                                              </label>
                                              <Link
                                                to="#"
                                                className="btn btn-danger-outline trash"
                                              >
                                                <i className="far fa-trash-alt"></i>
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <Link
                                      to="#"
                                      className="add-text add-extra"
                                      onClick={addPianoOption}
                                    >
                                      <i className="feather-plus-circle" /> Add
                                      Piano
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* /Piano Section */}
                    {/* Description  Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>
                              What are you moving? (Add notes for driver here)
                            </h6>
                          </div>
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              rows={5}
                              placeholder="Add a Short Description....."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Description  Section */}
                    {/* /Address pickup Section */}
                    <div className="card add-service">
                      <div className="col-md-12">
                        <div className="sub-title">
                          <h6>Where are you moving?</h6>
                        </div>
                      </div>
                      <div className="row service-cont">
                        <div className="col-sm-12">
                          <label className="col-form-label">
                            Collection Address
                          </label>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <PlacesAutocomplete
                              value={collectionAddressState}
                              onChange={(value) => {
                                setCollectionAddressState(value);
                              }}
                              onSelect={handleCollectionSelect}
                              options={options}
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
                                      placeholder: 'Address',
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
                        {stops.map((stop, index) => (
                          <div className="row service-cont" key={index}>
                            <div className="col-md-10">
                              <div className="form-group">
                                <PlacesAutocomplete
                                  value={stops[index]}
                                  onChange={(address) =>
                                    handleStopChange(index, address)
                                  }
                                  onSelect={(address) =>
                                    handleStopSelect(index, address)
                                  }
                                  options={options}
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
                                          placeholder: 'Address',
                                          className: 'form-control',
                                        })}
                                      />
                                      <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map((suggestion, i) => (
                                          <div
                                            key={i}
                                            {...getSuggestionItemProps(
                                              suggestion,
                                              {
                                                className: suggestion.active
                                                  ? 'suggestion-item--active'
                                                  : 'suggestion-item',
                                              },
                                            )}
                                          >
                                            <span>
                                              {suggestion.description}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </PlacesAutocomplete>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <div className="d-flex ">
                                <div
                                  className="form-group"
                                  onClick={() => handelRemove(index)}
                                >
                                  <label className="col-form-label">
                                    &nbsp;
                                  </label>
                                  <Link
                                    to="#"
                                    className="btn btn-danger-outline trash"
                                  >
                                    <i className="far fa-trash-alt"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Link
                          to="#"
                          className="add-text add-extra"
                          onClick={handelAdd}
                        >
                          <i className="feather-plus-circle" /> Add Stop to
                          Journey
                        </Link>
                        <div className="col-sm-12 mt-3">
                          <label className="col-form-label">
                            Delivery Address
                          </label>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <PlacesAutocomplete
                              value={deliveryAddressState}
                              onChange={(value) => {
                                setDeliveryAddressState(value);
                              }}
                              onSelect={handleDeliverySelect}
                              options={options}
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
                      </div>
                    </div>
                    {/* /Address pickup Section */}
                    {/* Address Floor  Section */}
                    {selectedHelp !== 0 && (
                      <div className="card add-service">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="sub-title">
                              <h6>How many floors do you have?</h6>
                            </div>
                            <div className="form-group">
                              <label className="col-form-label">
                                Total floors at locations
                              </label>
                              <Dropdown
                                value={selectedFloors}
                                onChange={(e) => setselectedFloors(e.value)}
                                options={floors}
                                placeholder="Select Floor"
                                className="select w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* /Address Floor  Section */}
                    {/* Vechile Hours  Section */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>How many hours do you want the van for?</h6>
                          </div>
                          <div className="form-group">
                            <label className="col-form-label">
                              I would like the van for
                            </label>
                            <Dropdown
                              value={selectedHours}
                              onChange={(e) => setselectedHours(e.value)}
                              options={hours}
                              placeholder="Select Hours"
                              className="select w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Vechile Hours  Section */}
                    {/* Appointment Date & Time */}
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-lg-4">
                          <div className="book-title">
                            <h5>Appointment Date</h5>
                          </div>
                          <div id="datetimepickershow">
                            <Calendar
                              defaultValue={selectedDate}
                              minDate={new Date()}
                              onChange={handleDateChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-8">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="book-title">
                                <h5>Appointment Time</h5>
                              </div>
                            </div>
                          </div>
                          <div className="token-slot mt-2">
                            {time.map((time, index) => (
                              <div
                                key={index}
                                className="form-check-inline visits me-0"
                                onClick={() => handleTimeClick(time)}
                              >
                                <label className="visit-btns">
                                  <input
                                    type="radio"
                                    className="form-check-input"
                                    name="appintment"
                                    checked={selectedTime === time}
                                    onChange={() => handleTimeClick(time)}
                                  />
                                  <span className="visit-rsn">{time}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /Appointment Date & Time */}
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-bottom-btns">
                          <div className="search-btn">
                            <button
                              className="btn btn-primary"
                              onClick={handleClick}
                            >
                              <Icon.Search className="react-feather-custom me-2" />
                              Get Free Quotes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  {/* /Service Information */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceFilter;
