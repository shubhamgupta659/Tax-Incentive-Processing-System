import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import axios from 'axios';
import { Select, Modal, Form, Input, Upload, Button, Tooltip } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AuthContext } from '../../../AuthContext';
import AppFormStatusPane from '../../AppFormStatusPane';
import GetAppStatusId from '../../../Components/CommonFunction/appstatus';
import GetIncentiveTypeLabel from '../../../Components/CommonFunction/incentivetype';
import GetStructFundLabel from '../../../Components/CommonFunction/structoffund';
import BgColorForAppStatus from '../../../Components/CommonFunction/bgcolor';

const { TextArea } = Input;


function PreAppViewAction() {
    const { accessToken } = useContext(AuthContext);
    const [size] = useState('small');
    const navigate = useNavigate();
    const { state } = useLocation();
    const params = useParams();
    const [postResult, setPostResult] = useState(null);
    async function fetchCommentsData() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "comments",
            "filter": { "appId": params.id },
            "sort": { "commentId": -1 },
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
        fetchCommentsData();
    }, []);

    const backButtonHandler = () => {
        navigate(`/${params.stage}`);
    };
    return (
        <div className='view-main-container'>
            <div className='view-status-pane'><AppFormStatusPane parentData={postResult} stage={params.stage} /></div>
            <div>
                <Row>
                    <Col span={12}>
                        <div className='view-form-container'>
                            <div className='view-form-header'>
                                <h2>Pre-Application Details</h2>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>

                            <div className='view-form-content'>
                                <table className="striped">
                                    <tbody>
                                        <tr>
                                            <td className='case-label'>Application Id</td>
                                            <td>{state.appId}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Incentive Type</td>
                                            <td>{GetIncentiveTypeLabel(state.preAppData.incentiveType)}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Structure of Fund</td>
                                            <td>{GetStructFundLabel(state.preAppData.structureOfFund)}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Institution Name</td>
                                            <td>{state.preAppData.institutionName}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Institution Code</td>
                                            <td>{state.preAppData.institutionCode}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Registration Number</td>
                                            <td>{state.preAppData.registrationNumber}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Address</td>
                                            <td>{state.preAppData.address}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Applicant Name</td>
                                            <td>{state.preAppData.applicantName}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Applicant Designation</td>
                                            <td>{state.preAppData.applicantDesignation}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Applicant Contact</td>
                                            <td>{state.preAppData.applicantContact}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Applicant Email</td>
                                            <td>{state.preAppData.applicantEmail}</td>
                                        </tr>
                                        <tr>
                                            <td className='case-label'>Application Status</td>
                                            <td style={{
                                                backgroundColor: BgColorForAppStatus(state.appStatus),
                                                color: '#fff',
                                                display: 'table',
                                            }}>{state.appStatus}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className='view-form-container'>

                            <div className='view-form-header'>
                                <h2>Review Section</h2>
                                <div className="view-back-button-container"><Tooltip title="Back"><Button shape="round" onClick={backButtonHandler} icon={<RollbackOutlined />} size={size} /></Tooltip></div>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>
                            <ActionCont stage={params.stage} casedata={state} accessToken={accessToken} noofcomments={postResult === null ? 0 : postResult.length} />

                            <div className='view-form-comments-container'>
                                <table className="striped">
                                    <thead>
                                        <tr>
                                            <th className='comment-column-style'>Assigned By</th>
                                            <th className='comment-column-style'>Date</th>
                                            <th className='comment-column-style'>Comment</th>
                                        </tr>
                                    </thead>
                                    <tbody className='comment-body-style'>
                                        {postResult === null ? [].map((c, index) => (
                                            <tr>
                                                <td>{c.assignedBy}</td>
                                                <td>{c.commentDate}</td>
                                                <td>{c.commentMsg}</td>
                                            </tr>
                                        )) : postResult.map((c, index) => (
                                            <tr>
                                                <td>{c.assignedBy}</td>
                                                <td>{c.commentDate}</td>
                                                <td>{c.commentMsg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

const ActionCont = (props) => {
    if ((props.stage === 'fiDash' && (props.casedata.appStatus === 'FI Clarify'))
        || (props.stage === 'oicDash' && (props.casedata.appStatus === 'Submitted' || props.casedata.appStatus === 'FI Clarified'))) {
        return (
            <div className='view-select-action-container'>
                <Form>
                    <Form.Item
                        key={1} // Add a unique key for each Form.Item component
                        label="Action"
                        name={`action`} // Use a unique name for each Form.Item component
                        rules={[
                            {
                                required: true,
                                message: 'Please select the action',
                            },
                        ]}
                    >
                        <SelectDrop stage={props.stage} casedata={props.casedata} noofcomments={props.noofcomments} />
                    </Form.Item>
                </Form>
            </div>
        );
    }
};

const SelectDrop = (props) => {
    const navigate = useNavigate();
    const formItems = [];
    const [open, setOpen] = useState(false);
    const [selectedDropValue, setSelectedDropValue] = useState();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const formRef = useRef();

    const [formData, setFormData] = useState({
        appId: null,
        commentId: null,
        appStatus: null,
        commentMsg: null,
        assignedTo: null,
        assignedBy: null,
        commentDate: null,
        attachment: null
    });

    async function insertComments(data) {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "comments",
            "document": data
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/insertOne',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                updateCase(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    async function updateCase(data) {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
            "filter": { "_id": { "$oid": props.casedata._id } },
            "update": {
                "$set": {
                    "appStatusId": GetAppStatusId(data.appStatus),
                    "appStatus": data.appStatus,
                    "comment": data.commentMsg,
                    "assignee": data.assignedBy,
                }
            }
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/updateOne',
            headers: {
                'Authorization': 'Bearer ' + props.accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        await axios.request(config)
            .then((response) => {
                navigate(`/${props.stage}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (formData.commentMsg != null) {
            insertComments(formData);
        }
    }, [formData]);

    const s1ActionOptions = [
        { value: 'FI Clarified', label: 'Clarify' },
    ];

    const s2ActionOptions = [
        { value: 'OIC Released', label: 'Release Application Form' },
        { value: 'FI Clarify', label: 'Need Clarification' },
    ];

    const handleSubmit = () => {
        formRef.current.validateFields().then((values) => {
            setFormData({
                "appId": props.casedata.appId,
                "commentId": props.noofcomments + 1,
                "appStatus": values.appStatus,
                "commentMsg": values.commentMsg,
                "attachment": values.attachment,
                "assignedBy": props.stage === 'fiDash' ? 'FI' : props.stage === 'oicDash' ? 'OIC' : 'MGMT',
                "commentDate": moment(),
            });
        });
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 5000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleChange = (value) => {
        setSelectedDropValue(value);
        setOpen(true);
    };

    if (props.stage === 'fiDash') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s1ActionOptions}
        />);
    } else if (props.stage === 'oicDash') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s2ActionOptions}
        />);
    }
    formItems.push(
        <Modal
            title="Enter Comment"
            open={open}
            onOk={handleSubmit}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form ref={formRef}>
                <Form.Item
                    key={1} // Add a unique key for each Form.Item component
                    label="App Status"
                    name={`appStatus`} // Use a unique name for each Form.Item component
                    initialValue={selectedDropValue}
                    rules={[
                        {
                            required: true,
                            message: 'Please select the action',
                        },
                    ]}

                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    key={2} // Add a unique key for each Form.Item component
                    label="Comment"
                    name={`commentMsg`} // Use a unique name for each Form.Item component
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the comment',
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    key={3}
                    label="Attachment"
                    name="attachment"
                >
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>);
    return formItems;
};

export default PreAppViewAction;