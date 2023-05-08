import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import axios from 'axios';
import { Select, Modal, Form, Input, Upload, Button, Tooltip } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import moment from 'moment';
import { AuthContext } from '../../../AuthContext';
import AppFormStatusPane from '../../AppFormStatusPane';
import GetAppStatusId from '../../../Components/CommonFunction/appstatus';

const { TextArea } = Input;


function LOAViewAction() {
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
                                <h2>LOA Details</h2>
                                <div className="view-back-button-container"><Tooltip title="Download LOA"><Button shape="round" icon={<DownloadOutlinedIcon />} size={size} /></Tooltip></div>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>

                            <div className='view-form-content'>
                                <p>Dear &nbsp;<b>{state.preAppData.applicantName}</b></p>
                                <p></p>
                                <p>APPLICATION FOR ENHANCED-TIER FUND TAX INCENTIVE SCHEME</p>
                                <p></p>
                                <p>Please refer to your application dated for the Enhanced-Tier Fund Tax Incentive Scheme (“the Scheme”) under Section 13X of the Income Tax Act (Cap. 134) (“the Act”).</p>
                                <p></p>
                                <p>We are pleased to inform you that 4 (together with the fund vehicles set out in the Annex, if applicable, hereinafter referred to as the Fund</p>
                                <table className="striped">
                                    <tbody>
                                        <tr>
                                            <td className='loa-case-th'>Award</td>
                                            <td className='loa-case-th'>Commencement Date</td>
                                        </tr>
                                        <tr>
                                            <td className='loa-case-td'>Enhanced-Tier Fund Tax Incentive Scheme</td>
                                            <td className='loa-case-td'>05/05/2023</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p></p>
                                <p>The tax exemption status will be for the life of the Fund Structure, provided the Fund Structure
                                    continues to meet all conditions and terms set out in MAS circular FDD Cir09/2019, and the
                                    relevant Income Tax legislation</p>
                                <p></p>
                                <p>Please confirm your acceptance of the award on the above terms and conditions within 1 month from the
                                    date of this letter. We reserve the right to revoke the offer if the letter of acceptance is not received within 1
                                    month from the date of this letter.</p>
                                <p>Yours faithfully</p>
                                <p></p>
                                <p>Cc: </p>
                                <p>PS(Finance)</p>
                                <p>Attn: Tax Policy Directorate (Corporate Income Tax 2)</p>
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
    if ((props.stage === 'fiDash' && (props.casedata.appStatus === 'LOA Released'))
        || (props.stage === 'oicDash' && (props.casedata.appStatus === 'Mgmt Approved' || props.casedata.appStatus === 'LOA Approved'))
        || (props.stage === 'mgmtDash' && (props.casedata.appStatus === 'LOA Generated'))) {
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
        { value: 'LOA Ack', label: 'Acknowledge LOA' },
    ];

    const s2ActionOptions = [
        { value: 'LOA Generated', label: 'Generate LOA' },
        { value: 'LOA Released', label: 'Release LOA' },
    ];

    const s3ActionOptions = [
        { value: 'LOA Approved', label: 'Approve LOA' },
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
    } else if (props.stage === 'mgmtDash') {
        formItems.push(<Select
            defaultValue=""
            onChange={handleChange}
            options={s3ActionOptions}
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

export default LOAViewAction;