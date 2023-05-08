import React, { useEffect } from 'react';
import { Form, Button, Input } from 'antd';

const FormStep2 = ({ formData, setFormData, formRef }) => {
  const { step2Data } = formData;

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('formStep2Data'));
    if (storedData) {
      formRef.current.setFieldsValue(storedData);
    }
  }, [formRef]); // Add formRef to the dependency array

  return (
    <Form ref={formRef} layout="vertical">
      <div className='buttons-container'>
        <div className='form-button-with-text'><Button style={{ width: "120px" }} type="primary">Validation</Button></div>
      </div>
      <div className='instruction-container'>
        <h4>ENHANCED-TIER FUND TAX INCENTIVE SCHEME</h4>
        <h4>PLEASE READ THESE INSTRUCTIONS BEFORE COMPLETING THE FORM.</h4>
        <div>
          <ol>
            <li>All sections are compulsory and all fields are to be completed. Please indicate where information is
              not applicable. Applications that are not fully completed will not be considered.</li>
            <li>The applicant is expected to fulfil the conditions stated if the application is approved. Any material
              changes must be communicated to the Financial Centre Development Department / Financial
              Markets Development Department as soon as possible.</li>
          </ol>
        </div>
      </div>
      <Form.Item
        key={1} // Add a unique key for each Form.Item component
        label="Attn"
        name={`attn`} // Use a unique name for each Form.Item component
        initialValue={step2Data.attn}
        rules={[
          {
            required: true,
            message: 'Please enter the attn',
          },
        ]}
      ><Input />
      </Form.Item>
      <Form.Item
        key={2} // Add a unique key for each Form.Item component
        label="OIC Email"
        name={`oicEmail`} // Use a unique name for each Form.Item component
        initialValue={step2Data.oicEmail}
        rules={[
          { required: true, message: 'Please enter oic email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      ><Input />
      </Form.Item>
      <Form.Item
        key={3} // Add a unique key for each Form.Item component
        label="Covering Officer Email"
        name={`covOfficerEmail`} // Use a unique name for each Form.Item component
        initialValue={step2Data.covOfficerEmail}
        rules={[
          { required: true, message: 'Please enter covering officer email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      ><Input />
      </Form.Item>
    </Form>
  );
};

export default FormStep2;
