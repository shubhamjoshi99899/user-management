import React, { useState, ChangeEvent, useContext } from "react";
import {
  Paper,
  Grid,
  InputLabel,
  TextField,
  MenuItem,
  Typography,
  Button,
  Container,
  Select,
} from "@mui/material";
import axios from "axios";
import { StateProvider, useStateContext } from "../StateContext";
import { useParams } from "react-router-dom";

interface FormConfig {
  name: string;
  label: string;
  type: string;
  required: boolean;
  disabled?: boolean;
  options?: string[];
}

interface Props {
  formConfig: FormConfig[] | null;
  activeStep: number;
  steps: string[];
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  handleSaveDraft: any;
  updateFormData: any;
  handleSubmit: () => void;
}

const FormComponent: React.FC<Props> = ({
  formConfig,
  activeStep,
  steps,
  handleNext,
  handleBack,
  updateFormData,
  handleSaveDraft,
  handleReset,
  handleSubmit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { state } = useStateContext();
  const params = useParams();
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (params?.formId) {
      // If editing existing form, set form data from draft data
      setFormData((prevData) => ({
        ...prevData,
        [name]: state?.draftData?.data ? state.draftData.data[name] : value,
      }));
    } else {
      // If creating new form, update form data directly
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as string,
      }));
    }
  };

  const handleUpdateFormData = () => {
    updateFormData(formData);
  };

  const handleSaveUserDraft = () => {
    handleSaveDraft(formData);
    // handleReset();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h6" mb={3}>
          {/* {state?.responseData?.steps[activeStep]} */}
        </Typography>
        <form onSubmit={handleSubmit}>
          {formConfig && formConfig?.length > 0 && (
            <Grid container spacing={2} mb={4}>
              {formConfig?.map((field) => (
                <Grid item xs={6} key={field.name}>
                  <InputLabel
                    sx={{ textAlign: "left", mb: 1 }}
                    htmlFor={field.name}
                  >
                    {field.label}
                  </InputLabel>
                  {field.type === "select" ? (
                    <Select
                      id={field.name}
                      name={field.name}
                      value={
                        state?.draftData?.data
                          ? state?.draftData?.data[field.name]
                          : formData[field.name]
                      }
                      onChange={handleInputChange}
                      required={field.required}
                      fullWidth
                      disabled={field.disabled}
                    >
                      {field.options?.map((option: any) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    <TextField
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={
                        state?.draftData?.data
                          ? state?.draftData?.data[field.name]
                          : formData[field.name]
                      }
                      onChange={handleInputChange}
                      required={field.required}
                      fullWidth
                      disabled={field.disabled}
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          )}

          {activeStep === steps.length - 1 ? (
            <>
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Button onClick={handleSubmit} variant="contained">
                Finish
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={activeStep === 0 ? true : false}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={
                  params?.formId?.length
                    ? handleUpdateFormData
                    : handleSaveUserDraft
                }
                sx={{ mr: 1 }}
              >
                {params?.formId?.length ? "Update Draft" : "Save as Draft"}
              </Button>
              <Button onClick={handleNext} type="button" variant="contained">
                Next
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default FormComponent;
