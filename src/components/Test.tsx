import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface FormData {
  [key: string]: string;
}

const DynamicForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [fields, setFields] = useState<string[]>([""]);

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const handleFieldChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  };

  const handleAddField = () => {
    setFields((prevFields) => [...prevFields, ""]);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    const updatedFormData = { ...formData };
    delete updatedFormData[`field${index}`];
    setFormData(updatedFormData);
  };

  const handleSubmit = () => {};

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {fields.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2}>
          <TextField
            label={`Field ${index + 1}`}
            value={formData[`field${index}`] || ""}
            onChange={(e) => {
              handleChange(`field${index}`, e.target.value);
              handleFieldChange(index, e.target.value);
            }}
            variant="outlined"
            fullWidth
          />
          <Button onClick={() => handleRemoveField(index)} variant="outlined">
            Remove
          </Button>
        </Box>
      ))}
      <Button onClick={handleAddField} variant="contained" color="primary">
        Add Field
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ ml: 2 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default DynamicForm;
