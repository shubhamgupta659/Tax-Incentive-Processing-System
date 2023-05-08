import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import moment from 'moment';

const FormStep1 = ({ formData, setFormData, formRef }) => {
  const { step1Data } = formData;
  const [form] = Form.useForm();

  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('formStep1Data'));
    if (storedData) {
      formRef.current.setFieldsValue(storedData);
    }
  }, [formRef]); // Add formRef to the dependency array



  return (
    <Form ref={formRef} form={form} layout="vertical">
      <Loop step1Data={step1Data} />
      <div className='buttons-container'>
        <div className='form-button-with-text'><Button style={{ width: "120px" }} type="primary">Reset Form</Button><label>Reset all figures in this return to zero</label></div>
        <div className='form-button-with-text'><Button style={{ width: "120px" }} type="primary">Import Form</Button><label>Import from xfdf file</label></div>
        <div className='form-button-with-text'><Button style={{ width: "120px" }} type="primary">Export Form</Button><div className='stacked-labels'><label>Export to xfdf file for submission to MAS</label><label className='small-label'>(Please make sure you entered all forms required for your company before export)</label></div></div>
      </div>
    </Form>
  );
};

const Loop = (props) => {
  const formItems = []; // Create an array to store the Form.Item components
  const monthFormat = 'YYYY/MM';

  formItems.push(
    <Form.Item
      key={1} // Add a unique key for each Form.Item component
      label="Institution Code"
      name={`institutionCode`} // Use a unique name for each Form.Item component
      initialValue={props.step1Data.institutionCode}
      rules={[
        {
          required: true,
          message: 'Please enter the institution code',
        },
      ]}
    >
      <Input disabled />
    </Form.Item>);
  formItems.push(
    <Form.Item
      key={2} // Add a unique key for each Form.Item component
      label="Institution Name"
      name={`institutionName`} // Use a unique name for each Form.Item component
      initialValue={props.step1Data.institutionName}
      rules={[
        {
          required: true,
          message: 'Please enter the institution name',
        },
      ]}
    >
      <Input disabled />
    </Form.Item>);
  formItems.push(
    <Form.Item
      key={3} // Add a unique key for each Form.Item component
      label="Reporting Cycle"
      name={`reportingCycle`} // Use a unique name for each Form.Item component
      initialValue={props.step1Data.reportingCycle != null ? moment(props.step1Data.reportingCycle) : null}
      rules={[
        {
          required: true,
          message: 'Please select reporting cycle',
        },
      ]}
    ><DatePicker format={monthFormat} picker="month" /></Form.Item>);

  return <div>{formItems}</div>; // Render the Form with the array of Form.Item components
};


export default FormStep1;

