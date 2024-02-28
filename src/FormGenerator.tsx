import React from "react";
import { TextField, Box, Grid, Typography, MenuItem } from "@mui/material";

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

interface FormGeneratorProps {
  section: {
    label: string;
    fields: FormField[];
    allow_multiple: boolean;
  };
  formList: Record<string, string>[];
  setFormList: React.Dispatch<React.SetStateAction<Record<string, string>[]>>;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({
  section,
  formList,
  setFormList,
}) => {
  const handleChange = (index: number, key: string, value: string) => {
    setFormList((prevList) => {
      const newList = [...prevList];
      newList[index][key] = value;
      return newList;
    });
  };

  return (
    <>
      {formList.map((formData, index) => (
        <form
          key={`${section.label}_${index}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <Typography variant="h6" sx={{ mb: 2, textAlign: "left" }}>
            {section.label + " " + (index + 1)}
          </Typography>
          <Grid
            sx={{ borderBottom: "1px solid #f0f0f0", mb: 5 }}
            container
            spacing={2}
          >
            {section.fields.map((field) => (
              <Grid item xs={12} md={6} key={field.name}>
                <Box display="flex" alignItems="center" mb={2}>
                  {field.type === "select" ? (
                    <TextField
                      select
                      label={field.label}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleChange(index, field.name, e.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    >
                      {field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      label={field.label}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        handleChange(index, field.name, e.target.value)
                      }
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </form>
      ))}
    </>
  );
};

export default FormGenerator;
