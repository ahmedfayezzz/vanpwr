import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import * as Icon from 'react-feather';

import { Dropdown } from 'primereact/dropdown';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ImageWithBasePath from '../../../../core/img/ImageWithBasePath';
import DefaultEditor from 'react-simple-wysiwyg';
import { all_routes } from '../../../../core/data/routes/all_routes';
import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import PlacesAutocomplete from 'react-places-autocomplete';
import axios from 'axios';
import { Modal } from 'bootstrap';

const routes = all_routes;

const ProviderCreateService = () => {
  dayjs.extend(customParseFormat);
  const navigate = useNavigate();
  const access_token = sessionStorage.getItem('access_token');
  const user_id = sessionStorage.getItem('user_id');

  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState('');
  const [vehicleReg, setVehicleReg] = useState('');
  const [selectedVehicleSize, setselectedVehicleSize] = useState('Small Van');
  const [workingHours, setWorkingHours] = useState<
    { day: string; start: string; end: string }[]
  >([]);
  const [monday, setMonday] = useState({ start: '00:00:00', end: '00:00:00' });
  const [tuesday, setTuesday] = useState({
    start: '00:00:00',
    end: '00:00:00',
  });
  const [wednesday, setWednesday] = useState({
    start: '00:00:00',
    end: '00:00:00',
  });
  const [thursday, setThursday] = useState({
    start: '00:00:00',
    end: '00:00:00',
  });
  const [friday, setFriday] = useState({ start: '00:00:00', end: '00:00:00' });
  const [saturday, setSaturday] = useState({
    start: '00:00:00',
    end: '00:00:00',
  });
  const [sunday, setSunday] = useState({ start: '00:00:00', end: '00:00:00' });
  const [prices, setPrices] = useState({});
  const [isPacking, setIsPacking] = useState(false);
  const [packingPrices, setPackingPrices] = useState({});
  const [isAssembly, setIsAssembly] = useState(false);
  const [assemblyPrices, setAssemblyPrices] = useState({});
  const [isPiano, setIsPiano] = useState(false);
  const [pianoPrices, setPainoPrices] = useState({});
  const [floorPrices, setFloorPrices] = useState({});
  const [longDistancePrices, setLongDistancePrices] = useState('');
  const [externalImages, setExternalImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState([]);
  const [licenseFront, setLicenseFront] = useState([]);
  const [licenseBack, setLicenseBack] = useState([]);
  const [profileImage, setProfileImage] = useState([]);
  const [motorInsurance, setMotorInsurance] = useState([]);
  const [goodsInTransit, setGoodsInTransit] = useState([]);
  const [publicLiability, setPublicLiability] = useState([]);
  const [backgroundCheck, setBackgroundCheck] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isPacking && !isAssembly && !isPiano) {
      setPackingPrices({});
      setAssemblyPrices({});
      setPainoPrices({});
    }
  }, [isPacking, isAssembly, isPiano]);

  useEffect(() => {
    setWorkingHours([
      { day: 'monday', ...monday },
      { day: 'tuesday', ...tuesday },
      { day: 'wednesday', ...wednesday },
      { day: 'thursday', ...thursday },
      { day: 'friday', ...friday },
      { day: 'saturday', ...saturday },
      { day: 'sunday', ...sunday },
    ]);
  }, [monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const areFirst6DocsUploaded = [
      externalImages,
      loadingImages,
      licenseFront,
      licenseBack,
      profileImage,
      motorInsurance,
      backgroundCheck,
    ].every((doc) => doc.length > 0);

    if (!areFirst6DocsUploaded) {
      setErrorMessage('Please upload the required documents.');
      return;
    }

    const params = {
      driver_id: user_id,
      location_base: address,
      location_radius: radius,
      first_name: firstName,
      last_name: lastName,
      mobile_number: phoneNumber,
      email_address: email,
      vehicle_reg: vehicleReg,
      van_size: selectedVehicleSize,
    };

    const loadingModalElement = document.getElementById('loadingModal');
    const loadingModal = new Modal(loadingModalElement);
    loadingModal.show();

    try {
      const response = await axios.post(
        'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/driver_service',
        params,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            apiKey: process.env.REACT_APP_BEARER_TOKEN,
            Prefer: 'return=representation',
          },
        },
      );

      if (response.status === 201) {

        const workingHoursParams = workingHours.map(
          ({ day: day_of_week, start: start_time, end: end_time }) => ({
            driver_id: user_id,
            day_of_week,
            start_time,
            end_time,
            driver_service_id: response.data[0].id, // Assuming the first API call returns the created driver service's ID
          }),
        );

        try {
          const workingHoursResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/availability',
            workingHoursParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (workingHoursError) {
          console.error('Error:', workingHoursError);
        }

        const transformPrices = () => {
          return Object.entries(prices).map(([key, price]) => {
            const [van_size, helper_count, day] = key.split('_');
            return {
              driver_id: user_id,
              helper_count,
              day,
              price,
              driver_service_id: response.data[0].id, // Replace with actual value
              van_size,
            };
          });
        };

        const pricesParams = transformPrices();

        try {
          const pricesResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/pricing',
            pricesParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (pricesError) {
          console.error('Error:', pricesError);
        }

        if (radius > 25) {
          const mileagePricesParams = {
            driver_id: user_id,
            price: longDistancePrices,
            driver_service_id: response.data[0].id, // Replace with actual value
          };

          try {
            const mileagePricesResponse = await axios.post(
              'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/mileage_pricing',
              mileagePricesParams,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  apiKey: process.env.REACT_APP_BEARER_TOKEN,
                  Prefer: 'return=minimal',
                },
              },
            );

          } catch (mileagePricesError) {
            console.error('Error:', mileagePricesError);
          }
        }

        const transformFloorPrices = () => {
          return Object.entries(floorPrices).map(([key, price]) => {
            const [helpers] = key.split('_');
            return {
              driver_id: user_id,
              helpers,
              price,
              driver_service_id: response.data[0].id, // Replace with actual value
            };
          });
        };

        const floorPricesParams = transformFloorPrices();
        try {
          const floorPricesResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/floors_pricing',
            floorPricesParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (floorPricesError) {
          console.error('Error:', floorPricesError);
        }

        const transformPackingPrices = () => {
          return Object.entries(packingPrices).map(([key, price]) => {
            const [packing_item] = key.split('_');
            return {
              driver_id: user_id,
              packing: packing_item,
              price,
              driver_service_id: response.data[0].id, // Replace with actual value
            };
          });
        };

        const packingPricesParams = transformPackingPrices();

        try {
          const packingPricesResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/packing_pricing',
            packingPricesParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (packingPricesError) {
          console.error('Error:', packingPricesError);
        }

        const transformAssemblyPrices = () => {
          return Object.entries(assemblyPrices).map(([key, price]) => {
            const [assembly_item] = key.split('_');
            return {
              driver_id: user_id,
              assembly: assembly_item,
              price,
              driver_service_id: response.data[0].id, // Replace with actual value
            };
          });
        };

        const assemblyPricesParams = transformAssemblyPrices();

        try {
          const assemblyPricesResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/assembly_pricing',
            assemblyPricesParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (assemblyPricesError) {
          console.error('Error:', assemblyPricesError);
        }

        const transformPianoPrices = () => {
          return Object.entries(pianoPrices).map(([key, price]) => {
            const [piano_item] = key.split('_');
            return {
              driver_id: user_id,
              piano: piano_item.toLowerCase().split(' ')[0],
              price,
              driver_service_id: response.data[0].id, // Replace with actual value
            };
          });
        };

        const pianoPricesParams = transformPianoPrices();

        try {
          const pianoPricesResponse = await axios.post(
            'https://wgjgzlvwmoavtpeylund.supabase.co/rest/v1/piano_pricing',
            pianoPricesParams,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                apiKey: process.env.REACT_APP_BEARER_TOKEN,
                Prefer: 'return=minimal',
              },
            },
          );

        } catch (pianoPricesError) {
          console.error('Error:', pianoPricesError);
        }

        const uploadImages = async (section, images) => {
          for (const [index, image] of images.entries()) {
            const formData = new FormData();
            formData.append('file', image);

            try {
              const docResponse = await axios.post(
                `https://wgjgzlvwmoavtpeylund.supabase.co/storage/v1/object/documents/${user_id}/${response.data[0].id}/${section}/${index}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${access_token}`,
                    apiKey: process.env.REACT_APP_BEARER_TOKEN,
                    'Content-Type': 'multipart/form-data',
                  },
                },
              );

            
            } catch (error) {
              console.error('Error:', error);
            }
          }
        };

        await uploadImages('external', externalImages);
        await uploadImages('loading', loadingImages);
        await uploadImages('license_front', licenseFront);
        await uploadImages('license_back', licenseBack);
        await uploadImages('profile', profileImage);
        await uploadImages('background_check', backgroundCheck);
        await uploadImages('motor_insurance', motorInsurance);
        await uploadImages('goods_in_transit', goodsInTransit);
        await uploadImages('public_liability', publicLiability);

        loadingModal.hide();

        const successModalElement = document.getElementById('successmodal');
        const successModal = new Modal(successModalElement);
        successModal.show();

        setTimeout(() => {
          // Manually hide the modal and remove the modal backdrop
          successModal.hide();
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }

          navigate(routes.providerService);
        }, 2000);
      }
    } catch (error) {
      loadingModal.hide();

      console.error('Error:', error);
    }
  };

  const handleAddressSelect = (address) => {
    setAddress(address);
  };

  const handleTimeChange = (type, value, dayOfWeek) => {
    const newTime = value.format('HH:mm:ss');
    switch (dayOfWeek) {
      case 'slot_monday':
        setMonday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_tuesday':
        setTuesday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_wednesday':
        setWednesday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_thursday':
        setThursday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_friday':
        setFriday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_saturday':
        setSaturday((prev) => ({ ...prev, [type]: newTime }));
        break;
      case 'slot_sunday':
        setSunday((prev) => ({ ...prev, [type]: newTime }));
        break;
    }
  };

  const resetTime = (dayOfWeek) => {
    switch (dayOfWeek) {
      case 'slot_monday':
        setMonday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_tuesday':
        setTuesday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_wednesday':
        setWednesday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_thursday':
        setThursday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_friday':
        setFriday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_saturday':
        setSaturday({ start: '00:00:00', end: '00:00:00' });
        break;
      case 'slot_sunday':
        setSunday({ start: '00:00:00', end: '00:00:00' });
        break;
    }
  };

  const handlePriceChange = (e, vehicleSize, loadingOption, time) => {
    setPrices({
      ...prices,
      [`${vehicleSize}_${loadingOption}_${time}`]: e.target.value,
    });
  };

  const handleFloorChange = (e, floorHelper) => {
    setFloorPrices({
      ...floorPrices,
      [`${floorHelper}`]: e.target.value,
    });
  };

  const handleLongDistanceChange = (e) => {
    setLongDistancePrices(e.target.value);
  };

  const handlePackingCheckboxChange = (e) => {
    setIsPacking(e.target.checked);
  };

  const handlePackingChange = (e, packingItem) => {
    setPackingPrices({
      ...packingPrices,
      [`${packingItem}`]: e.target.value,
    });
  };

  const handleAssemblyCheckboxChange = (e) => {
    setIsAssembly(e.target.checked);
  };

  const handleAssemblyChange = (e, assemblyItem) => {
    setAssemblyPrices({
      ...assemblyPrices,
      [`${assemblyItem}`]: e.target.value,
    });
  };

  const handlePianoCheckboxChange = (e) => {
    setIsPiano(e.target.checked);
  };

  const handlePianoChange = (e, pianoItem) => {
    setPainoPrices({
      ...pianoPrices,
      [`${pianoItem}`]: e.target.value,
    });
  };

  const handleExternalImages = (event) => {
    setExternalImages([...externalImages, ...event.target.files]);
  };

  const deleteExternalImages = (index) => {
    setExternalImages(externalImages.filter((_, i) => i !== index));
  };

  const handleLoadingImages = (event) => {
    setLoadingImages([...loadingImages, ...event.target.files]);
  };

  const deleteLoadingImages = (index) => {
    setLoadingImages(loadingImages.filter((_, i) => i !== index));
  };

  const handleLicenseFront = (event) => {
    setLicenseFront([...licenseFront, ...event.target.files]);
  };

  const deleteLicenseFront = (index) => {
    setLicenseFront(licenseFront.filter((_, i) => i !== index));
  };

  const handleLicenseBack = (event) => {
    setLicenseBack([...licenseBack, ...event.target.files]);
  };

  const deleteLicenseBack = (index) => {
    setLicenseBack(licenseBack.filter((_, i) => i !== index));
  };

  const handleProfileImage = (event) => {
    setProfileImage([...profileImage, ...event.target.files]);
  };

  const deleteProfileImage = (index) => {
    setProfileImage(profileImage.filter((_, i) => i !== index));
  };

  const handleMotorInsurance = (event) => {
    setMotorInsurance([...motorInsurance, ...event.target.files]);
  };

  const deleteMotorInsurance = (index) => {
    setMotorInsurance(motorInsurance.filter((_, i) => i !== index));
  };

  const handleGoodsInTransit = (event) => {
    setGoodsInTransit([...goodsInTransit, ...event.target.files]);
  };

  const deleteGoodsInTransit = (index) => {
    setGoodsInTransit(goodsInTransit.filter((_, i) => i !== index));
  };

  const handlePublicLiability = (event) => {
    setPublicLiability([...publicLiability, ...event.target.files]);
  };

  const deletePublicLiability = (index) => {
    setPublicLiability(publicLiability.filter((_, i) => i !== index));
  };

  const handleBackgroundCheck = (event) => {
    setBackgroundCheck([...backgroundCheck, ...event.target.files]);
  };

  const deleteBackgroundCheck = (index) => {
    setBackgroundCheck(backgroundCheck.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address ||
      !radius ||
      !vehicleReg ||
      !selectedVehicleSize
    ) {
      setErrorMessage('Please fill out all the required fields!');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const validateStep2 = () => {
    const isAnyDayFilled = workingHours.some(
      (day) => day.start !== '00:00:00' && day.end !== '00:00:00',
    );

    if (!isAnyDayFilled) {
      setErrorMessage('Please fill in times for at least one day!');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleNext = () => {
    let isValid;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      // Add more cases as needed
      default:
        isValid = true;
    }

    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const vehicleSizes = [
    'Small Van',
    'Medium Van',
    'Large Van',
    'Extra Large Van',
    'Luton Van',
    '7.5T Lorry',
  ];

  const minPrices = {
    'Small Van': {
      weekday: { 0: 25, 1: 30, 2: 40, 3: 60 },
      weekend: { 0: 30, 1: 35, 2: 45, 3: 65 },
    },
    'Medium Van': {
      weekday: { 0: 30, 1: 35, 2: 45, 3: 65 },
      weekend: { 0: 35, 1: 40, 2: 50, 3: 70 },
    },
    'Large Van': {
      weekday: { 0: 40, 1: 45, 2: 55, 3: 75 },
      weekend: { 0: 45, 1: 50, 2: 60, 3: 80 },
    },
    'Extra Large Van': {
      weekday: { 0: 45, 1: 50, 2: 60, 3: 85 },
      weekend: { 0: 50, 1: 55, 2: 65, 3: 90 },
    },
    'Luton Van': {
      weekday: { 0: 50, 1: 55, 2: 65, 3: 95 },
      weekend: { 0: 55, 1: 60, 2: 70, 3: 100 },
    },
    '7.5T Lorry': {
      weekday: { 0: 80, 1: 90, 2: 110, 3: 130 },
      weekend: { 0: 85, 1: 95, 2: 115, 3: 130 },
    },
  };

  const loadingOptions = [0, 1, 2, 3];

  const floorHelpers = [1, 2, 3];

  const options = {
    types: ['address'],
    componentRestrictions: { country: 'gb' },
  };

  const days = [
    { name: 'Monday', id: 'slot_monday' },
    { name: 'Tuesday', id: 'slot_tuesday' },
    { name: 'Wednesday', id: 'slot_wednesday' },
    { name: 'Thursday', id: 'slot_thursday' },
    { name: 'Friday', id: 'slot_friday' },
    { name: 'Saturday', id: 'slot_saturday' },
    { name: 'Sunday', id: 'slot_sunday' },
  ];

  const packingItems = [
    'Tape',
    'Packing Paper',
    'Small Box',
    'Medium Box',
    'Large Box',
    'Wardrobe Box',
    'Small Bubble Wrap',
    'Large Bubble Wrap',
  ];

  const assemblyTypes = ['Assembly', 'Disassembly', 'Both'];

  const pianoTypes = ['Upright Piano', 'Grand Piano'];

  const sections = [
    {
      title: 'External Images of Van',
      images: externalImages,
      handleImages: handleExternalImages,
      deleteImages: deleteExternalImages,
    },
    {
      title: 'Loading Space Images',
      images: loadingImages,
      handleImages: handleLoadingImages,
      deleteImages: deleteLoadingImages,
    },
    {
      title: 'Drivers License Images (Front)',
      images: licenseFront,
      handleImages: handleLicenseFront,
      deleteImages: deleteLicenseFront,
    },
    {
      title: 'Drivers License Images (Back)',
      images: licenseBack,
      handleImages: handleLicenseBack,
      deleteImages: deleteLicenseBack,
    },
    {
      title: 'Profile Picture (Clear portrait photo, white background)',
      images: profileImage,
      handleImages: handleProfileImage,
      deleteImages: deleteProfileImage,
    },
    {
      title: 'DBS Basic Certificate (Must be within last 3 months)',
      images: backgroundCheck,
      handleImages: handleBackgroundCheck,
      deleteImages: deleteBackgroundCheck,
    },
    {
      title: 'Motor Insurance (Hire & Reward)',
      images: motorInsurance,
      handleImages: handleMotorInsurance,
      deleteImages: deleteMotorInsurance,
    },
    {
      title: 'Goods in Transit Insurance (Minimum £10,000)',
      images: goodsInTransit,
      handleImages: handleGoodsInTransit,
      deleteImages: deleteGoodsInTransit,
    },
    {
      title: 'Public Liability Insurance (Minimum £1,000,000)',
      images: publicLiability,
      handleImages: handlePublicLiability,
      deleteImages: deletePublicLiability,
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Breadcrumb */}
          <div className="breadcrumb-bar">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-12">
                  <h2 className="breadcrumb-title">Add Service</h2>
                </div>
              </div>
            </div>
          </div>
          {/* /Breadcrumb */}
          <div className="row">
            <div className="col-md-12 mx-auto">
              {/* Service List */}
              <div className="service-wizard">
                <ul id="progressbar">
                  <li
                    className={
                      currentStep === 1
                        ? 'active'
                        : currentStep > 1
                        ? 'activated'
                        : ''
                    }
                  >
                    <div className="multi-step-icon span-info">
                      <span>
                        <i className="fa-regular fa-circle-check" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Information</h6>
                    </div>
                  </li>
                  <li
                    className={
                      currentStep === 2
                        ? 'active'
                        : currentStep > 2
                        ? 'activated'
                        : ''
                    }
                  >
                    <div className="multi-step-icon">
                      <span>
                        <i className="fa-regular fa-clock" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Availability</h6>
                    </div>
                  </li>
                  <li
                    className={
                      currentStep === 3
                        ? 'active'
                        : currentStep > 3
                        ? 'activated'
                        : ''
                    }
                  >
                    <div className="multi-step-icon">
                      <span>
                        <i className="fa-solid fa-chart-bar" />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Van Pricing</h6>
                    </div>
                  </li>
                  <li
                    className={
                      currentStep === 4
                        ? 'active'
                        : currentStep > 4
                        ? 'activated'
                        : ''
                    }
                  >
                    <div className="multi-step-icon">
                      <span>
                        <Icon.Image />
                      </span>
                    </div>
                    <div className="multi-step-info">
                      <h6>Documents</h6>
                    </div>
                  </li>
                </ul>
              </div>
              {/* /Service List */}
              <div className="service-inform-fieldset">
                {/* Service Information */}
                {currentStep === 1 && (
                  <fieldset id="first-field">
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>Driver Information</h6>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              First Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Email <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email Address"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group ">
                            <label className="col-form-label">
                              Phone Number{' '}
                              <span className="text-danger">*</span>
                            </label>
                            <PhoneInput
                              country={'gb'}
                              value={phoneNumber}
                              onChange={(phoneNumber) =>
                                setPhoneNumber(phoneNumber)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Address <span className="text-danger">*</span>
                            </label>
                            <PlacesAutocomplete
                              value={address}
                              onChange={(value) => {
                                setAddress(value);
                              }}
                              onSelect={handleAddressSelect}
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="col-form-label">
                              Radius from your adreess your willing to work (in
                              miles) <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Radius"
                              value={radius}
                              onChange={(e) =>
                                setRadius(Number(e.target.value))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>Van Information</h6>
                          </div>
                          <div className="form-group">
                            <label className="col-form-label">
                              Vehicle Registraion Number{' '}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="AS56 5GB"
                              value={vehicleReg}
                              onChange={(e) => setVehicleReg(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="col-form-label">
                              Vehicle Size{' '}
                              <span className="text-danger">*</span>
                            </label>
                            <div>
                              <Dropdown
                                value={selectedVehicleSize}
                                onChange={(e) =>
                                  setselectedVehicleSize(e.value)
                                }
                                options={vehicleSizes}
                                placeholder="Select Vehicle size"
                                className="select service-select"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-bottom-btns">
                          <div className="field-btns">
                            <button
                              className="btn btn-primary next_btn"
                              type="button"
                              onClick={handleNext}
                            >
                              Next <i className="fa-solid fa-arrow-right" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}
                {/* /Service Information */}
                {/* Availability */}
                {currentStep === 2 && (
                  <fieldset style={{ display: 'block' }}>
                    <div className="card add-service">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="sub-title">
                            <h6>Availability</h6>
                          </div>
                        </div>
                        <div className="col-md-12">
                          {/* Timeslot */}
                          <div className="timeslot-sec availablt-time-slots">
                            {/* Schedule Nav */}
                            <label className="col-form-label">
                              Choose your working hours
                            </label>
                            <div className="schedule-nav">
                              <ul className="nav">
                                {days.map((day, index) => (
                                  <li className="nav-item" key={index}>
                                    <Link
                                      className={`nav-link ${
                                        day.id === 'slot_monday' ? 'active' : ''
                                      }`}
                                      data-bs-toggle="tab"
                                      to={`#${day.id}`}
                                    >
                                      {day.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {/* /Schedule Nav */}
                            <div className="tab-content pt-0">
                              {days.map((day, index) => (
                                <div
                                  className={`tab-pane ${
                                    day.id === 'slot_monday' ? 'active' : ''
                                  }`}
                                  id={day.id}
                                  key={index}
                                >
                                  <div className="hours-info">
                                    <h4 className="nameof-day">{day.name}</h4>

                                    <div key={index} className="row hours-cont">
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>From</label>
                                          <div className="form-availability-field">
                                            <TimePicker
                                              className="form-control timepicker"
                                              onChange={(value) =>
                                                handleTimeChange(
                                                  'start',
                                                  value,
                                                  day.id,
                                                )
                                              }
                                              value={
                                                (day.id === 'slot_monday'
                                                  ? monday
                                                  : day.id === 'slot_tuesday'
                                                  ? tuesday
                                                  : day.id === 'slot_wednesday'
                                                  ? wednesday
                                                  : day.id === 'slot_thursday'
                                                  ? thursday
                                                  : day.id === 'slot_friday'
                                                  ? friday
                                                  : day.id === 'slot_saturday'
                                                  ? saturday
                                                  : sunday
                                                ).start !== '00:00:00'
                                                  ? dayjs(
                                                      (day.id === 'slot_monday'
                                                        ? monday
                                                        : day.id ===
                                                          'slot_tuesday'
                                                        ? tuesday
                                                        : day.id ===
                                                          'slot_wednesday'
                                                        ? wednesday
                                                        : day.id ===
                                                          'slot_thursday'
                                                        ? thursday
                                                        : day.id ===
                                                          'slot_friday'
                                                        ? friday
                                                        : day.id ===
                                                          'slot_saturday'
                                                        ? saturday
                                                        : sunday
                                                      ).start,
                                                      'HH:mm:ss',
                                                    )
                                                  : null
                                              }
                                              format="h:mm A"
                                            />
                                            <span className="cus-icon">
                                              <i className="fe fe-clock" />
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>To</label>
                                          <div className="form-availability-field">
                                            <TimePicker
                                              className="form-control timepicker"
                                              onChange={(value) =>
                                                handleTimeChange(
                                                  'end',
                                                  value,
                                                  day.id,
                                                )
                                              }
                                              value={
                                                (day.id === 'slot_monday'
                                                  ? monday
                                                  : day.id === 'slot_tuesday'
                                                  ? tuesday
                                                  : day.id === 'slot_wednesday'
                                                  ? wednesday
                                                  : day.id === 'slot_thursday'
                                                  ? thursday
                                                  : day.id === 'slot_friday'
                                                  ? friday
                                                  : day.id === 'slot_saturday'
                                                  ? saturday
                                                  : sunday
                                                ).end !== '00:00:00'
                                                  ? dayjs(
                                                      (day.id === 'slot_monday'
                                                        ? monday
                                                        : day.id ===
                                                          'slot_tuesday'
                                                        ? tuesday
                                                        : day.id ===
                                                          'slot_wednesday'
                                                        ? wednesday
                                                        : day.id ===
                                                          'slot_thursday'
                                                        ? thursday
                                                        : day.id ===
                                                          'slot_friday'
                                                        ? friday
                                                        : day.id ===
                                                          'slot_saturday'
                                                        ? saturday
                                                        : sunday
                                                      ).end,
                                                      'HH:mm:ss',
                                                    )
                                                  : null
                                              }
                                              format="h:mm A"
                                            />
                                            <span className="cus-icon">
                                              <i className="fe fe-clock" />
                                            </span>
                                          </div>
                                          <div className="field-btns">
                                            <button
                                              className="btn btn-primary prev_btn"
                                              type="button"
                                              onClick={() => resetTime(day.id)}
                                            >
                                              Reset
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          {/* Timeslot */}
                        </div>
                      </div>
                    </div>
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-bottom-btns">
                          <div className="field-btns">
                            <button
                              className="btn btn-primary prev_btn"
                              type="button"
                              onClick={handlePrev}
                            >
                              <i className="fa-solid fa-arrow-left" />
                              Prev
                            </button>
                          </div>
                          <div className="field-btns">
                            <button
                              className="btn btn-primary next_btn"
                              type="button"
                              onClick={handleNext}
                            >
                              Next <i className="fa-solid fa-arrow-right" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                )}
                {/* /Availability */}
                {/* Van details */}
                {currentStep === 3 && (
                  <fieldset style={{ display: 'block' }}>
                    <div className="card add-service">
                      <div className="sub-title">
                        <h6>
                          Van Size Hourly Prices (Include our 20% commission and
                          your VAT, if applicable)
                        </h6>
                      </div>
                      <div className="row">
                        {vehicleSizes.map((vehicleSize, index) => {
                          if (
                            vehicleSizes
                              .slice(index)
                              .includes(selectedVehicleSize)
                          ) {
                            return (
                              <div
                                className="col-lg-4 col-md-6 col-12"
                                key={index}
                              >
                                <div className="pricing-plans pricing-plans-five">
                                  <div className="pricing-planshead-five">
                                    <h4>{vehicleSize}</h4>
                                  </div>
                                  <div className="row">
                                    {loadingOptions.map((loadingOption) => (
                                      <>
                                        <div className="col-lg-6 pricing-planscontent pricing-planscontent-five">
                                          <ul>
                                            <li>
                                              <span>
                                                Weekday{' '}
                                                {loadingOption === 0
                                                  ? 'Customer'
                                                  : `${loadingOption} Man`}{' '}
                                                Loading
                                              </span>
                                            </li>
                                          </ul>
                                          <div className="form-group">
                                            <input
                                              type="number"
                                              className="form-control"
                                              placeholder={`Minimum ${minPrices[vehicleSize]['weekday'][loadingOption]}`}
                                              min={
                                                minPrices[vehicleSize][
                                                  'weekday'
                                                ][loadingOption]
                                              }
                                              onChange={(e) =>
                                                handlePriceChange(
                                                  e,
                                                  vehicleSize,
                                                  loadingOption,
                                                  'weekday',
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-6 pricing-planscontent pricing-planscontent-five">
                                          <ul>
                                            <li>
                                              <span>
                                                Weekend{' '}
                                                {loadingOption === 0
                                                  ? 'Customer'
                                                  : `${loadingOption} Man`}{' '}
                                                Loading
                                              </span>
                                            </li>
                                          </ul>
                                          <div className="form-group">
                                            <input
                                              type="number"
                                              className="form-control"
                                              placeholder={`Minimum ${minPrices[vehicleSize]['weekend'][loadingOption]}`}
                                              min={
                                                minPrices[vehicleSize][
                                                  'weekend'
                                                ][loadingOption]
                                              }
                                              onChange={(e) =>
                                                handlePriceChange(
                                                  e,
                                                  vehicleSize,
                                                  loadingOption,
                                                  'weekend',
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                    {radius > 25 && (
                      <div className="card add-service">
                        <div className="sub-title">
                          <h6>Long Distance Price (25+ miles)</h6>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-12">
                            <div className="pricing-plans pricing-plans-five">
                              <div className="pricing-planshead-five">
                                <h4>Price per mile</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 pricing-planscontent pricing-planscontent-five">
                                  <ul>
                                    <li>
                                      <span>Price</span>
                                    </li>
                                  </ul>
                                  <div className="form-group">
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="0"
                                      value={longDistancePrices}
                                      onChange={handleLongDistanceChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="card add-service">
                      <div className="sub-title">
                        <h6>Floor Prices per Floor</h6>
                      </div>
                      <div className="row">
                        {floorHelpers.map((floorHelper, index) => (
                          <div className="col-lg-4 col-md-6 col-12" key={index}>
                            <div className="pricing-plans pricing-plans-five">
                              <div className="pricing-planshead-five">
                                <h4>{floorHelper} Helper</h4>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 pricing-planscontent pricing-planscontent-five">
                                  <ul>
                                    <li>
                                      <span>Price</span>
                                    </li>
                                  </ul>
                                  <div className="form-group">
                                    <input
                                      type="number"
                                      className="form-control"
                                      placeholder="0"
                                      onChange={(e) =>
                                        handleFloorChange(e, floorHelper)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="card add-service">
                      <div className="row">
                        <div className="add-service-toggle">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="sub-title">
                                <h6>
                                  Packing Prices (This includes supplying and
                                  packing each item)
                                </h6>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="status-toggle sml-status float-sm-end">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={isPacking}
                                  onChange={handlePackingCheckboxChange}
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
                                  {packingItems.map((packingItem, index) => (
                                    <div
                                      className="col-lg-3 col-md-6 col-12"
                                      key={index}
                                    >
                                      <div className="pricing-plans pricing-plans-five">
                                        <div className="pricing-planshead-five">
                                          <h4>{packingItem}</h4>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-12 pricing-planscontent pricing-planscontent-five">
                                            <ul>
                                              <li>
                                                <span>Price</span>
                                              </li>
                                            </ul>
                                            <div className="form-group">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                onChange={(e) =>
                                                  handlePackingChange(
                                                    e,
                                                    packingItem,
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card add-service">
                      <div className="row">
                        <div className="add-service-toggle">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="sub-title">
                                <h6>Assembly/Disassembly Prices</h6>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="status-toggle sml-status float-sm-end">
                                <input
                                  type="checkbox"
                                  id="status_2"
                                  className="check"
                                  checked={isAssembly}
                                  onChange={handleAssemblyCheckboxChange}
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
                                  {assemblyTypes.map((assemblyType, index) => (
                                    <div
                                      className="col-lg-4 col-md-6 col-12"
                                      key={index}
                                    >
                                      <div className="pricing-plans pricing-plans-five">
                                        <div className="pricing-planshead-five">
                                          <h4>{assemblyType}</h4>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-12 pricing-planscontent pricing-planscontent-five">
                                            <ul>
                                              <li>
                                                <span>Price</span>
                                              </li>
                                            </ul>
                                            <div className="form-group">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                onChange={(e) =>
                                                  handleAssemblyChange(
                                                    e,
                                                    assemblyType,
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card add-service">
                      <div className="row">
                        <div className="add-service-toggle">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="sub-title">
                                <h6>Piano Prices</h6>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="status-toggle sml-status float-sm-end">
                                <input
                                  type="checkbox"
                                  id="status_3"
                                  className="check"
                                  checked={isPiano}
                                  onChange={handlePianoCheckboxChange}
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
                                  {pianoTypes.map((pianoType, index) => (
                                    <div
                                      className="col-lg-6 col-md-6 col-12"
                                      key={index}
                                    >
                                      <div className="pricing-plans pricing-plans-five">
                                        <div className="pricing-planshead-five">
                                          <h4>{pianoType}</h4>
                                        </div>
                                        <div className="row">
                                          <div className="col-lg-12 pricing-planscontent pricing-planscontent-five">
                                            <ul>
                                              <li>
                                                <span>Price</span>
                                              </li>
                                            </ul>
                                            <div className="form-group">
                                              <input
                                                type="number"
                                                className="form-control"
                                                placeholder="0"
                                                onChange={(e) =>
                                                  handlePianoChange(
                                                    e,
                                                    pianoType,
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="field-bottom-btns">
                      <div className="field-btns">
                        <button
                          className="btn btn-primary prev_btn"
                          type="button"
                          onClick={handlePrev}
                        >
                          <i className="fa-solid fa-arrow-left" />
                          Prev
                        </button>
                      </div>
                      <div className="field-btns">
                        <button
                          className="btn btn-primary next_btn"
                          type="button"
                          onClick={handleNext}
                        >
                          Next <i className="fa-solid fa-arrow-right" />
                        </button>
                      </div>
                    </div>
                  </fieldset>
                )}
                {/* /Van details */}
                {/* Documents */}
                {currentStep === 4 && (
                  <fieldset style={{ display: 'block' }}>
                    {sections.map((section, sectionIndex) => (
                      <div className="card add-service" key={sectionIndex}>
                        <div className="sub-title">
                          <h6>
                            {section.title}{' '}
                            {sectionIndex < sections.length - 2 && (
                              <span className="text-danger">*</span>
                            )}
                          </h6>
                        </div>
                        <div className="file-upload">
                          <ImageWithBasePath
                            src="assets/img/icons/upload-icon.svg"
                            alt="image"
                          />
                          <h6>
                            Drag &amp; drop files or <span>Browse</span>
                          </h6>
                          <p>Supported formates: JPEG, PNG, PDF</p>
                          <input
                            type="file"
                            accept="image/jpeg, image/png, application/pdf"
                            onChange={section.handleImages}
                          />{' '}
                        </div>
                        <div className="file-preview">
                          <ul className="gallery-selected-img">
                            {section.images.map((file, index) => (
                              <li key={index}>
                                <div className="img-preview">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`${section.title} ${index + 1}`}
                                    style={{
                                      width: '100px',
                                      height: '100px',
                                    }} // Set the width and height here
                                  />
                                </div>
                                <label className="custom_check">
                                  <Link
                                    to="#"
                                    className="remove-gallery"
                                    onClick={() => section.deleteImages(index)}
                                  >
                                    <Icon.Trash2
                                      style={{
                                        width: '16px',
                                        height: '16px',
                                      }}
                                    />
                                  </Link>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
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
                    <div className="field-bottom-btns">
                      <div className="field-btns">
                        <button
                          className="btn btn-primary prev_btn"
                          type="button"
                          onClick={handlePrev}
                        >
                          <i className="fa-solid fa-arrow-left" />
                          Prev
                        </button>
                      </div>
                      <div className="field-btns">
                        <button
                          className="btn btn-primary done_btn"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </fieldset>
                )}
                {/* /Docuemnts */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {/* Modal Succss */}
        <div
          className="modal fade add-service-modal"
          id="successmodal"
          tabIndex={-1}
          aria-labelledby="successmodal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <span>
                  <i className="fa-regular fa-circle-check" />
                </span>
                <h3>Success</h3>
                <p>Service has been created succeessfully</p>
                <div className="popup-btn">
                  <a href={routes.providerService} className="btn btn-primary">
                    Go to Dashboard <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Succss */}
      </>

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

export default ProviderCreateService;
