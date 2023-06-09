import React, { useMemo, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
//MRT Imports
import MaterialReactTable from 'material-react-table';
import { Collapse, Tabs } from 'antd';
//Material-UI Imports
import {
    Box,
    Tooltip,
    IconButton,
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import ApprovalIcon from '@mui/icons-material/Approval';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import AppFormStatusPane from '../AppFormStatusPane';
import CustomBgColorBox from '../../Components/CommonFunction/bgcolorbox';
import GetIncentiveTypeLabel from '../../Components/CommonFunction/incentivetype';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import GetStructFundLabel from '../../Components/CommonFunction/structoffund';
const { Panel } = Collapse;
const { TabPane } = Tabs;

const MGMTDash = () => {
    return (<Tabs centered defaultActiveKey="1">
        <TabPane tab="Application" key="1">
            <Content1 />
        </TabPane>
        <TabPane tab="ARR" key="2" disabled>
            <Content2 />
        </TabPane>
        <TabPane tab="Request" key="3" disabled>
            <Content3 />
        </TabPane>
    </Tabs>);
};


const Content1 = () => {
    const [pieData, setPieData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#E53935', '#D81B60', '#8E24AA', '#3949AB', '#039BE5'],
                hoverBackgroundColor: ['#EF9A9A', '#F48FB1', '#CE93D8', '#9FA8DA', '#81D4FA'],
            },
        ],
    });
    const [pieStrData, setPieStrData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#00ACC1', '#00897B', '#C0CA33', '#FB8C00', '#6D4C41'],
                hoverBackgroundColor: ['#80DEEA', '#80CBC4', '#E6EE9C', '#FFCC80', '#BCAAA4'],
            },
        ],
    });
    const [barFundPerfData, setBarFundPerfData] = useState({
        labels: ['2020', '2021', '2022'],
        datasets: [
            {
                label: 'Committed',
                data: [4250, 5730, 6872],
                backgroundColor: ['#3949AB'],
                hoverBackgroundColor: ['#9FA8DA'],
            },
            {
                label: 'Actual',
                data: [4380, 5930, 7150],
                backgroundColor: ['#F4511E'],
                hoverBackgroundColor: ['#FFAB91'],
            },
        ],
    });
    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        gap: '50px'
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Hide the legend
            },
            tooltip: {
                enabled: true, // Disable tooltips
            },
        },
        aspectRatio: 1,
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // Hide the legend
            },
            tooltip: {
                enabled: true, // Disable tooltips
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '(million)', // Specify the Y-axis alias
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Year', // Specify the X-axis alias
                },
            },
        },
        aspectRatio: 1,
    };


    const { accessToken } = useContext(AuthContext);
    const [postResult, setPostResult] = useState(null);
    async function fetchDashData() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/find',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                setPostResult(response.data.documents);
                fetchIncentivePieData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function fetchIncentivePieData() {
        let pieLabelArr = [];
        let pieValueArr = [];
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
            "pipeline": [
                {
                    "$group": {
                        "_id": {
                            "incentiveType": "$preAppData.incentiveType"
                        },
                        "count": { "$sum": 1 },
                    }
                },
                { "$sort": { "_id.incentiveType": 1 } }
            ],
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/aggregate',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                response.data.documents.map(c => {
                    pieLabelArr.push(GetIncentiveTypeLabel(c._id.incentiveType));
                    pieValueArr.push(c.count);
                });
                const data = {
                    labels: pieLabelArr,
                    datasets: [
                        {
                            data: pieValueArr,
                            backgroundColor: ['#E53935', '#D81B60', '#8E24AA', '#3949AB', '#039BE5'],
                            hoverBackgroundColor: ['#EF9A9A', '#F48FB1', '#CE93D8', '#9FA8DA', '#81D4FA'],
                        },
                    ],
                };
                setPieData(data);
                fetchStructurePieData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function fetchStructurePieData() {
        let pieLabelArr = [];
        let pieValueArr = [];
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
            "pipeline": [
                {
                    "$group": {
                        "_id": {
                            "structureOfFund": "$preAppData.structureOfFund"
                        },
                        "count": { "$sum": 1 },
                    }
                },
                { "$sort": { "_id.structureOfFund": 1 } }
            ],
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/aggregate',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                response.data.documents.map(c => {
                    pieLabelArr.push(GetStructFundLabel(c._id.structureOfFund));
                    pieValueArr.push(c.count);
                });
                const data = {
                    labels: pieLabelArr,
                    datasets: [
                        {
                            data: pieValueArr,
                            backgroundColor: ['#00ACC1', '#00897B', '#C0CA33', '#FB8C00', '#6D4C41'],
                            hoverBackgroundColor: ['#80DEEA', '#80CBC4', '#E6EE9C', '#FFCC80', '#BCAAA4'],
                        },
                    ],
                };
                setPieStrData(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDashData();
    }, []);

    const columns = useMemo(
        () => [
            {
                id: 'application', //id used to define `group` column
                header: '',
                columns: [
                    {
                        accessorKey: 'appId',
                        id: 'appId', //id is still required when using accessorFn instead of accessorKey
                        header: 'Application Id',
                        size: 50,
                    },
                    {
                        accessorKey: 'preAppData.applicantName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Applicant Name',
                        size: 100,
                    },
                    {
                        accessorKey: 'preAppData.preFormDate', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Submission Date',
                        size: 100,
                    },
                    {
                        accessorKey: 'assignee', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Asignee',
                        size: 100,
                    },
                    {
                        accessorKey: 'appStatus', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'App Status',
                        size: 100,
                        Cell: ({ cell }) => (
                            <CustomBgColorBox appStatus={cell.getValue()} />
                        ),
                    }
                ],
            }
        ],
        [],
    );


    return (
        <div>
            <Collapse className='chart-container' defaultActiveKey={['1']}>
                <Panel header="Application Stats" key="1">
                    <div style={chartContainerStyle}>
                        <div className='indv-chart-container'>
                            <div className='indv-chart-title'><b>Incentive Type</b></div>
                            <div className='indv-chart-content'><Pie data={pieData} options={options} /></div>
                        </div>
                        <div className='indv-chart-container'>
                            <div className='indv-chart-title'><b>Fund Size</b></div>
                            <div className='indv-chart-content'><Bar data={barFundPerfData} options={barChartOptions} /></div>
                        </div>
                        <div className='indv-chart-container'>
                            <div className='indv-chart-title'><b>Fund Structure</b></div>
                            <div className='indv-chart-content'><Pie data={pieStrData} options={options} /></div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
            <div><AppFormStatusPane parentData={postResult} stage='mgmtDash' /></div>
            <Collapse className='chart-container' defaultActiveKey={['1']}>
                <Panel header="Application Tracker" key="1">
                    <div className='mui-table'>
                        <MaterialReactTable
                            displayColumnDefOptions={{
                                'mrt-row-actions': {
                                    muiTableHeadCellProps: {
                                        align: 'center',
                                    },
                                    size: 120,
                                },
                            }}
                            enableRowActions
                            columns={columns}
                            data={postResult === null ? [] : postResult}
                            enableColumnFilterModes
                            enableColumnOrdering
                            enableGrouping
                            enablePinning
                            enableRowSelection={false}
                            enableSelectAll={false}
                            initialState={{ showColumnFilters: true, density: 'compact', columnVisibility: { Select: false } }}
                            positionToolbarAlertBanner='bottom'
                            renderRowActions={({ row, table }) => (
                                <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <ActionButton row={row.original} />
                                </Box>
                            )}
                        />
                    </div>
                </Panel>
            </Collapse>
        </div >

    );
};

const Content2 = () => {
    return (
        <div>
            <h2>Tab 2 Content</h2>
            <p>This is the content of Tab 2.</p>
        </div>);
};

const Content3 = () => {
    return (<div>
        <h2>Tab 3 Content</h2>
        <p>This is the content of Tab 3.</p>
    </div>);
};

const ActionButton = (props) => {
    const navigate = useNavigate();

    const onPreAppViewClick = (row) => {
        navigate(`/preAppView/mgmtDash/${props.row.appId}`, { state: props.row });
    };

    const onAppViewClick = (row) => {
        navigate(`/appView/mgmtDash/${props.row.appId}`, { state: props.row });
    };

    const onLoaAppViewClick = (row) => {
        navigate(`/loaView/mgmtDash/${props.row.appId}`, { state: props.row });
    };

    if (props.row.appStatus === 'OIC Approved' || props.row.appStatus === 'Mgmt Approved') {
        return (<Tooltip arrow placement='left' title='Approval'>
            <IconButton onClick={() => onAppViewClick(props.row)}>
                <ApprovalIcon />
            </IconButton>
        </Tooltip>
        );
    } else if (props.row.appStatus === 'LOA Generated' || props.row.appStatus === 'LOA Released' || props.row.appStatus === 'LOA Approved' || props.row.appStatus === 'LOA Ack') {
        return (<Tooltip arrow placement='left' title='LOA'>
            <IconButton onClick={() => onLoaAppViewClick(props.row)}>
                <AssignmentIcon />
            </IconButton>
        </Tooltip>
        );
    } else {
        return (<Tooltip arrow placement='left' title='Action'>
            <IconButton onClick={() => onPreAppViewClick(props.row)}>
                <RemoveRedEye />
            </IconButton>
        </Tooltip>);
    }
};

export default MGMTDash;