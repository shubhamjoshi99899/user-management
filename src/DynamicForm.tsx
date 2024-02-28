import React, { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import FormSectionMapper from "./FormSectionMapper";
import FormTabs from "./components/FormTabs";
import { useStateContext } from "./StateContext";

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

const DynamicFormParent: React.FC = () => {
  const { state } = useStateContext();
  const [activeStep, setActiveStep] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleUserDetails = (data: any) => {
    console.log(data);
    setUserDetails({ ...userDetails, ...data });
  };

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <Container maxWidth="lg">
      <FormTabs
        tabs={[
          {
            label: "Personal Details",
            content: (
              <FormSectionMapper
                sections={state?.responseData?.filter(
                  (section: any) => section.label === "Personal Details"
                )}
                setUserData={(data) => handleUserDetails(data)}
              />
            ),
          },
          {
            label: "Address Details",
            content: (
              <FormSectionMapper
                sections={state?.responseData?.filter(
                  (section: any) => section.label === "Address Details"
                )}
                setUserData={(data) => handleUserDetails(data)}
              />
            ),
          },
          {
            label: "Contact Details",
            content: (
              <FormSectionMapper
                sections={state?.responseData?.filter(
                  (section: any) => section.label === "Contact Details"
                )}
                setUserData={(data) => handleUserDetails(data)}
              />
            ),
          },
          {
            label: "Business Details",
            content: (
              <FormSectionMapper
                sections={state?.responseData?.filter(
                  (section: any) => section.label === "Business Details"
                )}
                setUserData={(data) => handleUserDetails(data)}
              />
            ),
          },
          {
            label: "Document Details",
            content: (
              <FormSectionMapper
                sections={state?.responseData?.filter(
                  (section: any) => section.label === "Document Details"
                )}
                setUserData={(data) => handleUserDetails(data)}
              />
            ),
          },
        ]}
      />
    </Container>
  );
};

export default DynamicFormParent;
