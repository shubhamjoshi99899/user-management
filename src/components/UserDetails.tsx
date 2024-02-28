import React, { useEffect, useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  styled,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface UserDetailsProps {
  data: {
    personal_details: {
      first_name: string;
      last_name: string;
      date_of_birth: string;
      age: number;
      gender: string;
    };
    contact_details: {
      primary_contact_number: string;
      work_email: string;
    };
    address_details: {
      type: string;
      line: string;
      area: string;
      landmark: string;
      town: string;
      city: string;
      district: string;
      pincode: string;
      state: string;
    };
    business_details: {
      service_provider_name: string;
      division_name: string;
      role_name: string;
      territory_name: string;
      doj: string;
    };
    onboarding_document_details: {
      aadhar_card: string;
      aadhar_card_file: string;
      pan_card: string;
      pan_card_file: string;
      "10th_certificate": string;
      "12th_certificate": string;
      graduation_certificate: string;
      canceled_cheque: string;
      signed_ao: string;
      uan: string;
    };
    steps: {
      [key: string]: boolean | undefined;
    };
  };
}

const WhiteTextTab = styled(Tab)({
  "&.Mui-selected": {
    color: "#fff",
  },
});

const WhiteBackgroundAppBar = styled(AppBar)({
  backgroundColor: "#2196f3", // Change to desired background color
});

function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function UserDetails({ data }: UserDetailsProps) {
  const [value, setValue] = React.useState(0);
  const [reasonDialogOpen, setReasonDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectedStage, setRejectedStage] = useState("");
  let params = useParams();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleApprove = (stage: string) => {
    const stageIndex = Object.keys(data).indexOf(stage);
    const nextStage = Object.keys(data)[stageIndex + 1];
    if (nextStage) {
      setValue(stageIndex + 1);
    }
  };

  const handleReject = (stage: string) => {
    setRejectedStage(stage);
    setReasonDialogOpen(true);
  };

  const handleCloseReasonDialog = () => {
    setRejectionReason("");
    setReasonDialogOpen(false);
  };

  const handleSubmitReason = () => {
    if (rejectionReason) {
      const stageIndex = Object.keys(data).indexOf(rejectedStage);
      const nextStage = Object.keys(data)[stageIndex + 1];
      if (nextStage) {
        setValue(stageIndex + 1);
      }
      // Here you would handle storing the rejection reason and comment
      setRejectionReason("");
      setReasonDialogOpen(false);
    }
  };

  const handleApprovalAndRejection = () => {
    if (rejectionReason) {
      let data = {
        rejection_reason: rejectionReason,
        stage: rejectedStage,
      };

      let token = localStorage.getItem("auth_token");

      axios
        .put(
          `http://localhost:3000/api/approve-reject-request/${params?.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          navigate("/requests");
        });
    } else {
      let token = localStorage.getItem("auth_token");

      axios
        .put(`http://localhost:3000/api/approve-request/${params?.id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/requests");
        });
    }
  };

  useEffect(() => {
    if (rejectionReason?.length > 0 || value === 5)
      handleApprovalAndRejection();
  }, [rejectionReason, value]);

  return (
    <Container>
      <WhiteBackgroundAppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="user details tabs"
          indicatorColor="primary"
        >
          {Object.keys(data).map((key, index) => (
            <WhiteTextTab
              key={index}
              label={key.replace(/_/g, " ")}
              id={`tab-${index}`}
            />
          ))}
        </Tabs>
      </WhiteBackgroundAppBar>
      {Object.keys(data).map((key, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Typography variant="h6">{key.replace(/_/g, " ")}</Typography>
          <Grid container spacing={3}>
            {Object.entries(data[key as keyof typeof data]).map(
              ([field, value], index) => (
                <Grid item xs={6} key={index}>
                  <Paper elevation={3} style={{ padding: "10px" }}>
                    <Typography>
                      <strong>{field.replace(/_/g, " ")}:</strong> {value}
                    </Typography>
                  </Paper>
                </Grid>
              )
            )}
          </Grid>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApprove(key)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleReject(key)}
              style={{ marginLeft: "10px" }}
            >
              Reject
            </Button>
          </Box>
        </TabPanel>
      ))}
      <Dialog open={reasonDialogOpen} onClose={handleCloseReasonDialog}>
        <DialogTitle>Provide Reason for Rejection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="rejection-reason"
            label="Reason"
            type="text"
            fullWidth
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReasonDialog}>Cancel</Button>
          <Button
            onClick={handleSubmitReason}
            color="primary"
            disabled={!rejectionReason}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
