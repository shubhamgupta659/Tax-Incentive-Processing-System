import React, { useEffect, useState } from "react";
import { Form, Checkbox, Input, Select, DatePicker, InputNumber } from 'antd';
import moment from "moment";
const { TextArea } = Input;

const FormStep4 = ({ formData, setFormData, formRef }) => {
    const { step4Data } = formData;
    const options = [
        { label: <div>Company / Variable Capital Company (VCC)</div>, value: 'cvcc' },
        { label: <div>Limited Partnership<div className="small-label">[Please fill up details on the General Partner in Part B]</div></div>, value: 'lp' },
        { label: <div>Trust<div className="small-label">[Please fill up details on the Trustee in Part C]</div></div>, value: 't' },
        { label: <div>Managed Account<div className="small-label">[Please fill up details on the Managed Account in Part E]</div></div>, value: 'ma' },
        { label: <div>Other vehicles</div>, value: 'ov' },
    ];

    const yesNoOptions = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
    ];

    const countryOptions = [
        { value: 'Singapore', label: 'SG' },
        { value: 'India', label: 'IN' },
        { value: 'United States ofAmerica', label: 'USA' },
    ];

    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = JSON.parse(localStorage.getItem('formStep4Data'));
        if (storedData) {
            formRef.current.setFieldsValue(storedData);
        }
    }, [formRef]); // Add formRef to the dependency array

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const dateOnChange = (date, dateString) => {
        console.log(date, dateString);
    };


    const [activeIndex, setActiveIndex] = useState(1);

    const handleItemClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <Form ref={formRef} layout="vertical">
            <div key={1} className='collapsable-container'>
                <div
                    className='collapsable-header'
                    onClick={() => handleItemClick(1)}
                    style={{ cursor: "pointer" }}
                >
                    <span class="arrow"></span>
                    <h4>Part A</h4>
                </div>

                <div className='collapsable-content' style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
                    <Form.Item
                        key={101}
                        label="Please indicate the structure / vehicle which the fund or master fund is organised as"
                        name="typeOfStructure"
                        initialValue={step4Data.typeOfStructure}
                        rules={[{ required: true, message: 'Select atleast one type of structure' }]}
                    >
                        <Checkbox.Group options={options} onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        key={102} // Add a unique key for each Form.Item component
                        label="Name of the fund vehicle"
                        name={`fundVehicleName`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.fundVehicleName}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the name of fund Vehicle',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={103} // Add a unique key for each Form.Item component
                        label="Registration number of the fund vehicle"
                        name={`registrationNumberOfFundVehicle`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.registrationNumberOfFundVehicle}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the registration number of fund Vehicle',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={104} // Add a unique key for each Form.Item component
                        label="Address of the fund vehicle"
                        name={`addressOfFundVehicle`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.addressOfFundVehicle}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the address of fund Vehicle',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        key={105} // Add a unique key for each Form.Item component
                        label="Country of incorporation / registration / constitution"
                        name={`countryOfIncorp`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.countryOfIncorp}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the country',
                            },
                        ]}
                    >
                        <Select
                            onChange={handleChange}
                            options={countryOptions}
                        />
                    </Form.Item>
                    <Form.Item
                        key={106} // Add a unique key for each Form.Item component
                        label="Date of incorporation / registration / constitution"
                        name={`dateOfIncorp`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.dateOfIncorp != null ? moment(step4Data.dateOfIncorp) : null}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the date',
                            },
                        ]}
                    >
                        <DatePicker onChange={dateOnChange} />
                    </Form.Item>
                </div>
            </div>
            <div key={2} className='collapsable-container'>
                <div
                    className='collapsable-header'
                    onClick={() => handleItemClick(2)}
                    style={{ cursor: "pointer" }}
                >
                    <span class="arrow"></span>
                    <h4>Part B</h4>
                </div>
                <div className='collapsable-content' style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
                    <p>If the fund or master fund is organised / structured as a Limited Partnership, please
                        provide details on the General Partner of the Limited Partnership</p>
                    <Form.Item
                        key={201} // Add a unique key for each Form.Item component
                        label="General Partner name"
                        name={`generalPartnerName`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.generalPartnerName}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the General Partner name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={202} // Add a unique key for each Form.Item component
                        label="General Partner incorporation / registration number"
                        name={`registrationNumberOfGeneralPartner`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.registrationNumberOfGeneralPartner}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the registration number of general Partner',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={203} // Add a unique key for each Form.Item component
                        label="General Partner address"
                        name={`addressOfGeneralPartner`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.addressOfGeneralPartner}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the address of fund Vehicle',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        key={204} // Add a unique key for each Form.Item component
                        label="General Partner country of incorporation / registration"
                        name={`gpcountryOfIncorp`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.gpcountryOfIncorp}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the country',
                            },
                        ]}
                    >
                        <Select
                            onChange={handleChange}
                            options={countryOptions}
                        />
                    </Form.Item>
                </div>
            </div>
            <div key={3} className='collapsable-container'>
                <div
                    className='collapsable-header'
                    onClick={() => handleItemClick(3)}
                    style={{ cursor: "pointer" }}
                >
                    <span class="arrow"></span>
                    <h4>Part C</h4>
                </div>
                <div className='collapsable-content' style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
                    <p>For the fund or master fund is organised / structured as a Trust, please provide details on the
                        Trustee of the Trust</p>
                    <Form.Item
                        key={301} // Add a unique key for each Form.Item component
                        label="Trustee name"
                        name={`trusteeName`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.trusteeName}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the trustee name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={302} // Add a unique key for each Form.Item component
                        label="Trustee address"
                        name={`trusteeAddress`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.trusteeAddress}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the address of trustee',
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Form.Item
                        key={303} // Add a unique key for each Form.Item component
                        label="Trustee country of incorporation / registration"
                        name={`trusteecountryOfIncorp`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.trusteecountryOfIncorp}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the country',
                            },
                        ]}
                    >
                        <Select
                            onChange={handleChange}
                            options={countryOptions}
                        />
                    </Form.Item>
                </div>
            </div>
            <div key={4} className='collapsable-container'>
                <div
                    className='collapsable-header'
                    onClick={() => handleItemClick(4)}
                    style={{ cursor: "pointer" }}
                >
                    <span class="arrow"></span>
                    <h4>Part D</h4>
                </div>
                <div className='collapsable-content' style={{ display: activeIndex === 4 ? 'block' : 'none' }}>
                    <p>If the applicant is master-feeder, master-SPV or master-feeder-SPV, please provide details on the feeder funds /
                        SPVs, where applicable.</p>
                    <Form.Item
                        key={401}
                        label="Please confirm that _"
                        name="pleaseConf"
                        initialValue={step4Data.pleaseConf}
                        rules={[{ required: true, message: 'Select atleast one option' }]}
                    >
                        <Checkbox.Group options={yesNoOptions} onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        key={402}
                        label="Please specify the number of feeder funds that trade"
                        name="numberOfFeederFund"
                        initialValue={step4Data.numberOfFeederFund}
                        rules={[{ required: true, message: 'Select fill number of feeder fund' }]}
                    >
                        <InputNumber onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        key={403}
                        label="Please specify the number of SPVs"
                        name="numberOfSpv"
                        initialValue={step4Data.numberOfSpv}
                        rules={[{ required: true, message: 'Please specify number of SPV' }]}
                    >
                        <InputNumber onChange={onChange} />
                    </Form.Item>
                </div>
            </div>
            <div key={5} className='collapsable-container'>
                <div
                    className='collapsable-header'
                    onClick={() => handleItemClick(5)}
                    style={{ cursor: "pointer" }}
                >
                    <span class="arrow"></span>
                    <h4>Part E</h4>
                </div>
                <div className='collapsable-content' style={{ display: activeIndex === 5 ? 'block' : 'none' }}>
                    <p>If the fund is organised / structured as a Managed Account, please provide details of the Managed Account</p>
                    <Form.Item
                        key={501} // Add a unique key for each Form.Item component
                        label="Name of custodian entity"
                        name={`custodianEntityName`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.custodianEntityName}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the custodian entity name',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={502} // Add a unique key for each Form.Item component
                        label="Investment time horizon"
                        name={`investmentTimeHorizon`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.investmentTimeHorizon}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the investment time horizon',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        key={503} // Add a unique key for each Form.Item component
                        label="Date of Investment Management Agreement (please provide the Investment
                            Management Agreement together with this application form)"
                        name={`dateOfInvetment`} // Use a unique name for each Form.Item component
                        initialValue={step4Data.dateOfInvetment != null ? moment(step4Data.dateOfInvetment) : null}
                        rules={[
                            {
                                required: true,
                                message: 'Please select the date',
                            },
                        ]}
                    >
                        <DatePicker onChange={dateOnChange} />
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default FormStep4;
