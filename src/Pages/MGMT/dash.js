import React, { useMemo, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
//MRT Imports
import MaterialReactTable from 'material-react-table';

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

const MGMTDash = () => {
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
                            <CustomBgColorBox appStatus={cell.getValue()}/>
                        ),
                    }
                ],
            }
        ],
        [],
    );


    return (
        <div>
            <div><AppFormStatusPane parentData={postResult} stage='mgmtDash' /></div>
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
        </div>

    );
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