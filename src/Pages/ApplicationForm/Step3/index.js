import React, { useEffect } from 'react';
import { Form, Upload, Checkbox, Button, message  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const FormStep3 = ({ formData, setFormData, formRef }) => {
  const { step3Data } = formData;
  const options = [
    { label: <div>Non Master Feeder<div className="small-label">[Please fill up Section II (a) and III, IV, V]</div></div>, value: 'nmf' },
    { label: <div>Managed Account<div className="small-label">[Please fill up Section II (a) and III, IV, V]</div></div>, value: 'ma' },
    { label: <div>Master Feeder<div className="small-label">[Please fill up Section II (a),(b) and III, IV, V]</div></div>, value: 'mf' },
    { label: <div>Master-Special Purpose Vehicle (SPV)<div className="small-label">[Please fill up Section II (a),(c) and III, IV, V]</div></div>, value: 'mspv' },
    { label: <div>Master-Feeder -SPV<div className="small-label">[Please fill up Section II (a),(b),(c) and III, IV, V]</div></div>, value: 'mfspv' },
  ];


  useEffect(() => {
    // Load data from local storage on component mount
    const storedData = JSON.parse(localStorage.getItem('formStep3Data'));
    if (storedData) {
      formRef.current.setFieldsValue(storedData);
    }
  }, [formRef]); // Add formRef to the dependency array

  const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  };

  return (
    <Form ref={formRef} layout="vertical">
      <div>
        <Form.Item
          label="Please indicate the type of incentive which the fund is applying for:"
          name="typeOfIncentive"
          initialValue={step3Data.typeOfIncentive}
          rules={[{ required: true, message: 'Select atleast one type of incentive' }]}
        >
          <Checkbox.Group options={options} onChange={onChange} />
        </Form.Item></div>

      <Form.Item
        label="Please attach a diagrammatic representation of the fund structure together with this application"
        name="fundStructure"
        initialValue={step3Data.fundStructure}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default FormStep3;