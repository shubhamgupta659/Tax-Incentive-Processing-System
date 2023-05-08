import React, { useEffect } from "react";
import { Checkbox, Form } from 'antd';
const FormStep5 = ({ formData, setFormData, formRef }) => {
    const { step5Data } = formData;
    const [form] = Form.useForm();
    const checkboxValidator = (_, value) => {
        if (!value) {
            return Promise.reject(new Error('Please agree to terms and conditions !!'));
        }
        return Promise.resolve();
    };
    const onChange = (e) => {
        //setFormData({ ...formData, [`step5Data.acknowledged`]: e.target.checked})
    };
    useEffect(() => {
        // Load data from local storage on component mount
        const storedData = JSON.parse(localStorage.getItem('formStep5Data'));
        if (storedData) {
            formRef.current.setFieldsValue(storedData);
        }
    }, [formRef]); // Add formRef to the dependency array

    return (
        <>
            <Form ref={formRef} form={form} layout="vertical">
                <Form.Item
                    key={1} // Add a unique key for each Form.Item component
                    name={`acknowledged`} // Use a unique name for each Form.Item component
                    valuePropName="checked"
                    initialValue={step5Data.acknowledged}
                    rules={[{
                        validator: checkboxValidator,
                    }]}
                >
                    <Checkbox onChange={onChange} name="acknowledged" >I hereby acknowledge that the information provided in this form is correct and true to the best of my knowledge and in accordance with the standards set forth by MAS.</Checkbox>
                </Form.Item>
            </Form></>
    );
};

export default FormStep5;
