import React, { useState } from "react";

// Define the type for the form field
type FormField = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};

// Sample API data
const formData: FormField[] = [
  {
    name: "work_email",
    label: "Email Id",
    type: "email",
    required: true,
  },
  {
    name: "home_email",
    label: "Home Email",
    type: "email",
    required: false,
  },
  // Add more fields here
];

// Define type for field groups
type FieldGroups = {
  [key: string]: string[];
};

// Sample groupings
const fieldGroups: FieldGroups = {
  "Contact Details": ["work_email", "home_email"],
  // Add more groups and fields
};

// Accordion component with props defined using TypeScript
const Accordion: React.FC<{ title: string; children: any }> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {title} - {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

const AppW: React.FC = () => {
  return (
    <div>
      {Object.entries(fieldGroups).map(([groupTitle, fields]) => (
        <Accordion key={groupTitle} title={groupTitle}>
          {fields.map((fieldName) => {
            const field = formData.find((item) => item.name === fieldName);
            return field && field.required ? (
              <div key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  required={field.required}
                />
              </div>
            ) : null;
          })}
        </Accordion>
      ))}
    </div>
  );
};

export default AppW;
