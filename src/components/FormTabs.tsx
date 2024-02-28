import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
type TabsContent = {
  label: string;
  content: React.ReactNode;
};
interface Props {
  tabs: TabsContent[];
}

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{ padding: 3, width: "100% !important", marginTop: "20px" }}
    >
      {value === index && (
        <div style={{ padding: 3, width: "100% !important", marginInline: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const FormTabs = ({ tabs }: Props) => {
  const [value, setValue] = useState(0);
  const [userDetails, setUserDetails] = useState({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        sx={{
          minHeight: "auto !important",
          borderRadius: "45px !important",
          border: "20px !important",
          background: "#FFEEDE !important",
          color: "#000",
          justifyContent: "space-between",

          ".MuiTabs-indicator": {
            height: "100% !important",
            zIndex: 0,
            background: "#FF9600 !important",
            borderRadius: "45px",
            color: "#fff",
          },
          ".MuiTabs-scrollButtons": {
            width: "20px",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            sx={{
              zIndex: 1,
              height: "30px",
              fontSize: "1rem !important",
              fontWeight: 500,
              padding: "2px 2px!important",
              color: "#000",
              textTransform: "none",
              px: "50px !important",

              "&.Mui-selected": {
                color: "#fff",
                fontWeight: `${500} !important`,
                px: "50px !important",
              },
            }}
            key={index}
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

FormTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default FormTabs;
