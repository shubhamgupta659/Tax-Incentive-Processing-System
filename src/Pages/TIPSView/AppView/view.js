import React, { useState, useRef, useEffect, useContext } from 'react';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import axios from 'axios';
import { Select, Modal, Form, Input, Upload, Button, Tooltip, Collapse } from 'antd';
import { UploadOutlined, RollbackOutlined } from '@ant-design/icons';
import moment from 'moment';
import { AuthContext } from '../../../AuthContext';
import AppFormStatusPane from '../../AppFormStatusPane';
import GetAppStatusId from '../../../Components/CommonFunction/appstatus';
import GetIncentiveTypeLabel from '../../../Components/CommonFunction/incentivetype';
import GetStructFundLabel from '../../../Components/CommonFunction/structoffund';
import BgColorForAppStatus from '../../../Components/CommonFunction/bgcolor';
const { Panel } = Collapse;
const { TextArea } = Input;


function AppViewAction() {
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
                                <h2>Application Details</h2>
                            </div>
                            <div className='view-form-sep'><hr></hr></div>

                            <div className='view-form-content'>
                                <Collapse defaultActiveKey={['1']} accordion>
                                    <Panel header="Pre-Application Details" key="1">
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
                                    </Panel>
                                    <Panel header="Institutional Info" key="2">
                                        <table className="striped">
                                            <tbody>
                                                <tr>
                                                    <td className='case-label'>Institutional Code</td>
                                                    <td>{state.step1Data.institutionCode}</td>
                                                </tr>
                                                <tr>
                                                    <td className='case-label'>Institutional Name</td>
                                                    <td>{state.step1Data.institutionName}</td>
                                                </tr>
                                                <tr>
                                                    <td className='case-label'>Reportting Cycle</td>
                                                    <td>{state.step1Data.reportingCycle}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Panel>
                                    <Panel header="Validation" key="3">
                                        <table className="striped">
                                            <tbody>
                                                <tr>
                                                    <td className='case-label'>Attn</td>
                                                    <td>{state.step2Data.attn}</td>
                                                </tr>
                                                <tr>
                                                    <td className='case-label'>OIC Email</td>
                                                    <td>{state.step2Data.oicEmail}</td>
                                                </tr>
                                                <tr>
                                                    <td className='case-label'>Covering Officer Email</td>
                                                    <td>{state.step2Data.covOfficerEmail}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Panel>
                                    <Panel header="Section I" key="4">
                                        <table className="striped">
                                            <tbody>
                                                <tr>
                                                    <td className='case-label'>Type of Incentive</td>
                                                    <td>{GetIncentiveTypeLabel(state.step3Data.typeOfIncentive[0])}</td>
                                                </tr>
                                                <tr>
                                                    <td className='case-label'>Fund Structure</td>
                                                    <td>{state.step3Data.fundStructure}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Panel>
                                    <Panel header="Section II" key="5">
                                        <Collapse defaultActiveKey={['1']} accordion>
                                            <Panel header="Part A" key="1">
                                                <table className="striped">
                                                    <tbody>
                                                        <tr>
                                                            <td className='case-label'>Type of Structure</td>
                                                            <td>{GetStructFundLabel(state.step4Data.typeOfStructure[0])}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Fund Vehicle Name</td>
                                                            <td>{state.step4Data.fundVehicleName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Reg No. Of Fund Vehicle</td>
                                                            <td>{state.step4Data.registrationNumberOfFundVehicle}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Address of Fund Vehicle</td>
                                                            <td>{state.step4Data.addressOfFundVehicle}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Country of Incorporation</td>
                                                            <td>{state.step4Data.countryOfIncorp}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Date of Incorporation</td>
                                                            <td>{state.step4Data.dateOfIncorp}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Panel>
                                            <Panel header="Part B" key="2">
                                                <table className="striped">
                                                    <tbody>
                                                        <tr>
                                                            <td className='case-label'>General Partner Name</td>
                                                            <td>{state.step4Data.generalPartnerName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Registration No of General Partner</td>
                                                            <td>{state.step4Data.registrationNumberOfGeneralPartner}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Address of General Partner</td>
                                                            <td>{state.step4Data.generalPartnerName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>General partner Country of Incorporation</td>
                                                            <td>{state.step4Data.gpcountryOfIncorp}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Panel>
                                            <Panel header="Part C" key="3">
                                                <table className="striped">
                                                    <tbody>
                                                        <tr>
                                                            <td className='case-label'>Trustee Name</td>
                                                            <td>{state.step4Data.trusteeName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Trustee Address</td>
                                                            <td>{state.step4Data.trusteeAddress}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Trustee Country of Incorporation</td>
                                                            <td>{state.step4Data.trusteecountryOfIncorp}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Panel>
                                            <Panel header="Part D" key="4">
                                                <table className="striped">
                                                    <tbody>
                                                        <tr>
                                                            <td className='case-label'>Please Confirm</td>
                                                            <td>{state.step4Data.pleaseConf}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>No. of Feeder Fund</td>
                                                            <td>{state.step4Data.numberOfFeederFund}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>No. of SPV</td>
                                                            <td>{state.step4Data.numberOfSpv}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Panel>
                                            <Panel header="Part E" key="5">
                                                <table className="striped">
                                                    <tbody>
                                                        <tr>
                                                            <td className='case-label'>Name of Custodian Entity</td>
                                                            <td>{state.step4Data.custodianEntityName}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Investment Time Horizon</td>
                                                            <td>{state.step4Data.investmentTimeHorizon}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='case-label'>Date Of Investment</td>
                                                            <td>{state.step4Data.dateOfInvetment}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Panel>
                                        </Collapse>
                                    </Panel>
                                    <Panel header="Section III" key="6">
                                        <table className="striped">
                                            <tbody>
                                                <tr>
                                                    <td className='case-label'>Acknowledged</td>
                                                    <td>{state.step5Data.acknowledged ? 'Yes' : 'No'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Panel>
                                </Collapse>
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
    if ((props.stage === 'oicDash' && (props.casedata.appStatus === 'Pending'))
        || (props.stage === 'mgmtDash' && (props.casedata.appStatus === 'OIC Approved'))) {
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


    const s2ActionOptions = [
        { value: 'OIC Approved', label: 'Approve' },
    ];

    const s3ActionOptions = [
        { value: 'Mgmt Approved', label: 'Approve' },
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

    if (props.stage === 'oicDash') {
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

export default AppViewAction;