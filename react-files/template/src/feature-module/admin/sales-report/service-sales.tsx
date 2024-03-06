import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import ReactApexChart from 'react-apexcharts';
import ImageWithBasePath from '../../../core/img/ImageWithBasePath';
import { useSelector } from 'react-redux';
import {ServiceSalesInterface } from '../../../core/models/interface';

const ServiceSales = () => {
  const data = useSelector((state:ServiceSalesInterface) => state.sales_report);
  const barChart = {
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
      stacked: false,
      toolbar: {
        show: false
      },
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    series: [{
      color: '#000',
      data: [420, 532, 516, 575, 519, 517, 454, 392, 262, 383, 446, 551],
    }],
    labels: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#777'
        }
      }
    },
  };
  const renderBody = (res: ServiceSalesInterface) => {
    console.log(res);
    return (
      <Link to="#" className="table-imgname">
        <ImageWithBasePath src={res.img} className="me-2" alt="img" />
        <span>{res.service}</span>
      </Link>
    );
  };

  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [selectedValue5, setSelectedValue5] = useState(null);

  const value1 = [
    { name: 'Date' },
    { name: '01' },
    { name: '02' },
    { name: '03' },
  ];
  const value2 = [{ name: 'July' }, { name: 'Aug' }, { name: 'Sep' }];
  const value3 = [{ name: '2023' }, { name: '2022' }, { name: '2021' }];
  const value4 = [
    { name: 'Select Provider' },
    { name: 'Jerry' },
    { name: 'Pauline' },
    { name: 'Robert' },
  ];
  const value5 = [
    { name: 'Plumbing Services' },
    { name: 'Car Repair' },
    { name: 'Interior Design' },
  ];

  return (
    <div className="page-wrapper page-settings">
      <div className="content">
        <div className="content-page-header content-page-headersplit">
          <h5>Service Sales</h5>
          <div className="list-btn">
            <ul>
              <li>
                <Link className="btn-downloads down-pdf" to="#">
                  <ImageWithBasePath
                    src="assets/img/icons/pdf-icon.svg"
                    alt="img"
                  />{' '}
                  Download as PDF
                </Link>
              </li>
              <li>
                <Link className="btn-downloads down-excel" to="#">
                  <ImageWithBasePath
                    src="assets/img/icons/excel-icon.svg"
                    alt="img"
                  />
                  Download as Excel{' '}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            {/* Chart */}
            <div className="card card-chart-blk">
              <div className="card-head-blk">
                <div className="row align-items-center">
                  <div className="col-xl-6 col-md-6">
                    <div className="card-table-head">
                      <h4>Service Sales report</h4>
                      <ul>
                        <li>
                          <span className="earning-black" />
                          No of Sales
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="earning-group">
                      <div className="sortby-section invoice-sort">
                        <div className="sorting-info">
                          <div className="sortby-filter-group court-sortby">
                            <div className="sortbyset week-bg me-0">
                              <div className="sorting-select">
                                <Dropdown
                                  value={selectedValue1}
                                  onChange={(e) => setSelectedValue1(e.value)}
                                  options={value1}
                                  optionLabel="name"
                                  placeholder="Date"
                                  className="select admin-dropdown custom-dropdown"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sortby-section invoice-sort">
                        <div className="sorting-info">
                          <div className="sortby-filter-group court-sortby">
                            <div className="sortbyset week-bg me-0">
                              <div className="sorting-select">
                                <Dropdown
                                  value={selectedValue2}
                                  onChange={(e) => setSelectedValue2(e.value)}
                                  options={value2}
                                  optionLabel="name"
                                  placeholder="July"
                                  className="select admin-dropdown custom-dropdown"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="sortby-section invoice-sort">
                        <div className="sorting-info">
                          <div className="sortby-filter-group court-sortby">
                            <div className="sortbyset week-bg me-0">
                              <div className="sorting-select">
                                <Dropdown
                                  value={selectedValue3}
                                  onChange={(e) => setSelectedValue3(e.value)}
                                  options={value3}
                                  optionLabel="name"
                                  placeholder="2023"
                                  className="select admin-dropdown custom-dropdown"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ReactApexChart
                  options={barChart}
                  series={barChart.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
            {/* /Chart */}
          </div>
        </div>
        <div className="card card-status">
          <div className="card-head-blk border-bottom-0">
            <div className="row align-items-center">
              <div className="col-xl-12 col-md-12">
                <div className="earning-group">
                  <div className="sortby-section status-provider">
                    <div className="sorting-info">
                      <div className="sortby-filter-group court-sortby">
                        <div className="sortbyset week-bg me-0">
                          <div className="sorting-select">
                            <Dropdown
                              value={selectedValue5}
                              onChange={(e) => setSelectedValue5(e.value)}
                              options={value5}
                              optionLabel="name"
                              placeholder="Select Services"
                              className="select admin-dropdown"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="sortby-section status-provider">
                    <div className="sorting-info">
                      <div className="sortby-filter-group court-sortby">
                        <div className="sortbyset week-bg me-0">
                          <div className="sorting-select">
                            <Dropdown
                              value={selectedValue4}
                              onChange={(e) => setSelectedValue4(e.value)}
                              options={value4}
                              optionLabel="name"
                              placeholder="Select Provider"
                              className="select admin-dropdown"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <div className="table-resposnive table-div">
              <table className="table datatable">
                <DataTable
                    paginatorTemplate="RowsPerPageDropdown CurrentPageReport PrevPageLink PageLinks NextPageLink  "
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                  value={data}
                  paginator
                  rows={10}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  tableStyle={{ minWidth: '50rem' }}
                >
                  <Column sortable field="id" header="#"></Column>
                  <Column sortable header="Service" body={renderBody}></Column>
                  <Column sortable field="provider" header="Provider"></Column>
                  <Column sortable field="sales" header="No Sales"></Column>
                  <Column sortable field="amount" header="Amount"></Column>
                </DataTable>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSales;
