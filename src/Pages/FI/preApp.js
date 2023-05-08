import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Form, Input, Select, Button, Tooltip } from 'antd';
import axios from 'axios';
import moment from "moment";
import { RollbackOutlined } from '@ant-design/icons';
import { AuthContext } from "../../AuthContext";
const { TextArea } = Input;

const PreAppForm = () => {
    const { accessToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const formRef = useRef();
    const [size] = useState('small');
    const [formData, setFormData] = useState({
        appId: params.id,
        preAppData: {
            incentiveType: null,
            structureOfFund: null,
            institutionName: null,
            institutionCode: null,
            registrationNumber: null,
            address: null,
            country: null,
            nameOfApplicant: null,
            designationOfApplicant: null,
            applicantContact: null,
            applicantEmail: null,
            preFormDate: null,
        },
        appStatusId: null,
        appStatus: null,
        assignee: 'Requestor',
        comment: null
    });

    const incentiveTypeOptions = [
        { label: 'Non-Master Feeder', value: 'nmf' },
        { label: 'Managed Account', value: 'ma' },
        { label: 'Master Feeder', value: 'mf' },
        { label: 'Master - Special Purpose Vehicle', value: 'mspv' },
        { label: 'Master Feeder - SPV', value: 'mfspv' },
    ];

    const structFundOptions = [
        { value: 'cvcc', label: 'Company / Variable Capital Company' },
        { value: 'lp', label: 'Limited Partnership' },
        { value: 't', label: 'Trust' },
        { value: 'ma', label: 'Managed Account' },
        { value: 'ov', label: 'Other Vehicles' },
    ];

    const handleChange = (value) => {
        console.log(value);
    };

    const handleFormSubmit = () => {
        formRef.current.validateFields().then((values) => {
            console.log(values);
            setFormData({
                appId: params.id,
                preAppData: {
                    incentiveType: values.incentiveType,
                    structureOfFund: values.structureOfFund,
                    institutionName: values.institutionName,
                    institutionCode: values.institutionCode,
                    registrationNumber: values.registrationNumber,
                    address: values.address,
                    applicantName: values.applicantName,
                    applicantDesignation: values.applicantDesignation,
                    applicantContact: values.applicantContact,
                    applicantEmail: values.applicantEmail,
                    preFormDate: moment(),
                },
                appStatusId: 1,
                appStatus: 'Submitted',
                assignee: 'FI',
                comment: ''
            })
        });

    };

    const insertPreApp = (data) => {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "tipsWorkflow",
            "collection": "applications",
            "document": data
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/insertOne',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            data: msg
        };

        axios.request(config)
            .then((response) => {
                navigate(`/fiDash`);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        if (formData.appStatus != null)
            insertPreApp(formData);
    }, [formData]);

    const backButtonHandler = () => {
        navigate(`/fiDash`);
    };

    return (
        <div className="app-main-container">
            <div className="back-button-container"><Tooltip title="Back"><Button shape="round" onClick={backButtonHandler} icon={<RollbackOutlined />} size={size} /></Tooltip></div>
            <div className="app-header-container"><h4>Pre Application Form</h4></div>
            <div className="app-form-container">
                <Form ref={formRef}>
                    <Form.Item
                        key={1} // Add a unique key for each Form.Item component
                        label="Incentive Type"
                        name={`incentiveType`} // Use a unique name for each Form.Item component
                        initialValue={formData.preAppData.incentiveType}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the incentive Type',
                            },
                        ]}

                    ><Select
                            name="incentiveType"
                            onChange={handleChange}
                            options={incentiveTypeOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        key={2} // Add a unique key for each Form.Item component
                        label="Structure Of Fund"
                        name={`structureOfFund`} // Use a unique name for each Form.Item component
                        initialValue={formData.preAppData.structureOfFund}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the structure of fund',
                            },
                        ]}

                    ><Select
                            name="structureOfFund"
                            onChange={handleChange}
                            options={structFundOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        key={3} // Add a unique key for each Form.Item component
                        label="Institution Name"
                        name={`institutionName`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the name of institution' },
                        ]}
                        initialValue={formData.preAppData.institutionName}
                    ><Input name="institutionName" />
                    </Form.Item>
                    <Form.Item
                        key={4} // Add a unique key for each Form.Item component
                        label="Institution Code"
                        name={`institutionCode`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the name of institution' },
                        ]}
                        initialValue={formData.preAppData.institutionCode}
                    ><Input name="institutionCode" />
                    </Form.Item>
                    <Form.Item
                        key={5} // Add a unique key for each Form.Item component
                        label="Registration Number"
                        name={`registrationNumber`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the registration number' },
                        ]}
                        initialValue={formData.preAppData.registrationNumber}
                    ><Input name="registrationNumber" />
                    </Form.Item>
                    <Form.Item
                        key={6} // Add a unique key for each Form.Item component
                        label="Address"
                        name={`address`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the address' },
                        ]}
                        initialValue={formData.preAppData.address}
                    ><TextArea rows={4} name="address" />
                    </Form.Item>
                    <Form.Item
                        key={7} // Add a unique key for each Form.Item component
                        label="Applicant Name"
                        name={`applicantName`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the applicant name' },
                        ]}
                        initialValue={formData.preAppData.applicantName}
                    ><Input name="applicantName" />
                    </Form.Item>
                    <Form.Item
                        key={8} // Add a unique key for each Form.Item component
                        label="Applicant Designation"
                        name={`applicantDesignation`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the applicant designation' },
                        ]}
                        initialValue={formData.preAppData.applicantDesignation}
                    ><Input name="applicantDesignation" />
                    </Form.Item>
                    <Form.Item
                        key={9} // Add a unique key for each Form.Item component
                        label="Applicant Contact"
                        name={`applicantContact`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the applicant contact' },
                        ]}
                        initialValue={formData.preAppData.applicantContact}
                    ><Input name="applicantContact" />
                    </Form.Item>
                    <Form.Item
                        key={10} // Add a unique key for each Form.Item component
                        label="Applicant Email"
                        name={`applicantEmail`} // Use a unique name for each Form.Item component
                        rules={[
                            { required: true, message: 'Please enter the applicant email' },
                        ]}
                        initialValue={formData.preAppData.applicantEmail}
                    ><Input name="applicantEmail" />
                    </Form.Item>
                </Form>
            </div>
            <div className="pre-app-button-container">
                <Button type="primary" onClick={handleFormSubmit}>
                    Submit
                </Button>
            </div>
        </div>


    );
}

export default PreAppForm;