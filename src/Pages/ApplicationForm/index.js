
import React, { useState, useRef, useEffect, useContext } from 'react';
import { Steps, Button, Card, Tooltip } from 'antd';
import FormStep1 from './Step1';
import FormStep2 from './Step2';
import FormStep3 from './Step3';
import FormStep4 from './Step4';
import FormStep5 from './Step5';
import axios from 'axios';
import { RollbackOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const { Step } = Steps;

const ApplicationForm = () => {
  const { accessToken } = useContext(AuthContext);
  const [size] = useState('small');
  const navigate = useNavigate();
  const { state } = useLocation();
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef();
  const [formData, setFormData] = useState({
    appId: state ? state.appId : params.id,
    preAppData: state ? state.preAppData : {},
    step1Data: state ? state.step1Data ? state.step1Data : {
      institutionCode: state.preAppData.institutionCode,
      institutionName: state.preAppData.institutionName,
      reportingCycle: null
    } : {},
    step2Data: state ? state.step2Data ? state.step2Data : {} : {},
    step3Data: state ? state.step3Data ? state.step3Data : {
      typeOfIncentive: [state.preAppData.incentiveType],
      fundStructure: null
    } : {},
    step4Data: state ? state.step4Data ? state.step4Data : {
      typeOfStructure: [state.preAppData.structureOfFund]
    } : {},
    step5Data: state ? state.step5Data ? state.step5Data : {} : {},
    assignee: 'FI',
    appStatus: null,
    appStatusId: null,
    comment: state ? state.comment : null
  });


  const handleSaveDraft = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values, [`appStatus`]: 'Draft', [`appStatusId`]: 2 });
    });
  };

  const handleNext = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values, [`appStatus`]: null });
      setCurrentStep(currentStep + 1);
    });

  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = () => {
    formRef.current.validateFields().then((values) => {
      setFormData({ ...formData, [`step${currentStep + 1}Data`]: values, [`appStatus`]: 'Pending', [`appStatusId`]: 3 })
    });

  };

  useEffect(() => {
    if (formData.appStatus === 'Draft' || formData.appStatus === 'Pending') {
      postAppData();
    }
  }, [formData]);

  async function postAppData() {
    let msg = JSON.stringify({
      "dataSource": "Singapore-free-cluster",
      "database": "tipsWorkflow",
      "collection": "applications",
      "filter": { "_id": { "$oid": state._id } },
      "update": {
        "$set": {
          step1Data: formData.step1Data,
          step2Data: formData.step2Data,
          step3Data: formData.step3Data,
          step4Data: formData.step4Data,
          step5Data: formData.step5Data,
          assignee: formData.assignee,
          appStatus: formData.appStatus,
          appStatusId: formData.appStatusId,
          comment: formData.comment
        }
      }
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/updateOne',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      data: msg
    };

    await axios.request(config)
      .then((response) => {
        navigate(`/${params.stage}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const backButtonHandler = () => {
    navigate(`/fiDash`);
  };

  return (
    <div className='form-main-container'>
      <div className="app-back-button-container"><Tooltip title="Back"><Button shape="round" onClick={backButtonHandler} icon={<RollbackOutlined />} size={size} /></Tooltip></div>
      <div className="ti-title">
        <h4>{params.action === 'add' ? 'Apply New Tax Incentive' : 'EDIT Tax Incentive'}</h4>
      </div>
      <div className="multi-step-form">
        <Steps current={currentStep} style={{ marginBottom: 16 }}>
          <Step title="Institutional Info" />
          <Step title="Validation" />
          <Step title="Section I" />
          <Step title="Section II" />
          <Step title="Section III" />
        </Steps>
        <Card>
          {currentStep === 0 && (
            <FormStep1 formData={formData} setFormData={setFormData} formRef={formRef} />
          )}
          {currentStep === 1 && (
            <FormStep2 formData={formData} setFormData={setFormData} formRef={formRef} />
          )}
          {currentStep === 2 && (
            <FormStep3 formData={formData} setFormData={setFormData} formRef={formRef} />
          )}
          {currentStep === 3 && (
            <FormStep4 formData={formData} setFormData={setFormData} formRef={formRef} />
          )}
          {currentStep === 4 && (
            <FormStep5 formData={formData} setFormData={setFormData} formRef={formRef} />
          )}
          <div style={{
            display: 'flex',
            marginTop: '24px',
            justifyContent: 'space-between'
          }}>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            <Button style={{ marginRight: 8 }} onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            {currentStep < 4 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === 4 && (
              <Button type="primary" onClick={handleFormSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;

