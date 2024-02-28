import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import FormGenerator from "./FormGenerator";

interface FormSection {
  label: string;
  allow_multiple: boolean;
  fields: FormField[];
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface FormSectionMapperProps {
  sections: FormSection[];
  setUserData: (data: any) => void;
}

const FormSectionMapper: React.FC<FormSectionMapperProps> = ({
  sections,
  setUserData,
}) => {
  const [formList, setFormList] = useState<Record<string, string>[]>([{}]);

  const handleAddForm = () => {
    setFormList((prevList) => [...prevList, {}]);
  };

  const handleSubmit = () => {
    console.log(formList);
    setUserData(formList);
    // Send formList to backend or perform other actions
  };

  return (
    <Container>
      {sections.map((section) => (
        <Box sx={{}}>
          <Box sx={{ borderBottom: "1px solid #f0f0f0", mb: 5 }}>
            <FormGenerator
              section={section}
              formList={formList}
              setFormList={setFormList}
            />
          </Box>
          {section?.label === "Address Details" ||
          section?.label === "Contact Details" ? (
            <Button onClick={handleAddForm} variant="contained" color="primary">
              Add {section.label}
            </Button>
          ) : null}
        </Box>
      ))}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit {sections[0].label}
      </Button>
    </Container>
  );
};

export default FormSectionMapper;
