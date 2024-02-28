import React, { useEffect, useState } from "react";
import { Stepper, Step, StepLabel, Container } from "@mui/material";
import FormComponent from "./Form";
import axios from "axios";
import { useStateContext } from "../StateContext";
import { useNavigate, useParams } from "react-router-dom";

interface Detail {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface DetailsObject {
  [key: string]: Detail[];
}

interface MappedObject {
  [key: string]: {
    [key: string]: any;
  };
}

const StepperForm: React.FC = () => {
  const { state } = useStateContext();
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [dataToCheck, setDataToCheck] = useState<any>({});
  const { dispatch } = useStateContext();
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormData({});
    navigate("/");
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepsContent = (step: number) => {
    const responseData = state?.responseData;
    // Get the keys of the response data
    const responseKeys = Object.keys(responseData);
    // Check if the step is within the range of available keys
    if (step >= 0 && step < responseKeys?.length) {
      const currentKey = responseKeys[step];
      return responseData[currentKey];
    }

    return null;
  };

  const fetchFormData = () => {
    const token = localStorage.getItem("auth_token");
    axios
      .get(`http://localhost:3000/api/fetch-request/${params.formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({ type: "SET_DRAFT_DATA", payload: res.data });
      });
  };

  useEffect(() => {
    if (params?.formId?.length) {
      fetchFormData();
    }
  }, [params?.formId]);

  const handleSubmit = () => {};

  const saveDraft = (data: any) => {
    let newData = {
      ...data,
    };
    let dataToAppend: any = {
      data: newData,
      type: "creation",
    };
    const token = localStorage.getItem("auth_token");
    axios
      .post("http://localhost:3000/api/create-request", dataToAppend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => {
        alert("Draft saved successfully");
      })
      .catch((error: any) => {});
  };

  const updateFormData = (data: any) => {
    let newData = {
      ...formData,
      ...data,
    };
    let token = localStorage.getItem("auth_token");
    axios
      .put(
        `http:://localhost:3000/api/update-request/${params?.formId}`,
        newData,
        {
          headers: {
            Authorization: `Bearer +${token}`,
          },
        }
      )
      .then((data) => {
        // Update state or perform any other actions based on response
      })
      .catch((error) => {
        console.error("Error making PUT request", error);
        // Handle error, if needed
      });
  };

  const renderStepContent = (step: number) => {
    return (
      <div>
        <FormComponent
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          steps={state?.responseData?.steps}
          formConfig={getStepsContent(activeStep)}
          updateFormData={updateFormData}
          handleSaveDraft={saveDraft}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
        />
      </div>
    );
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {state?.responseData?.steps?.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{renderStepContent(activeStep)}</div>
    </Container>
  );
};

export default StepperForm;
