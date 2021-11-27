import * as React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { DirectionsRenderer } from "@react-google-maps/api";
import { memo, VFC } from "react";

import "../../index.css";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Yahoo!名古屋オフィス",
    description: "13:00発",
  },
  {
    label: "名城大学名古屋ドーム前キャンパス",
    description: "",
  },
  {
    label: "名城大学天白キャンパス",
    description: "",
  },
];

const containerStyle = {
  height: "50vh",
  width: "100%",
};

const center = {
  lat: 35.1825363447806,
  lng: 136.90209365372115,
};

const positionAkiba = {
  lat: 35.18905187106728,
  lng: 136.943958595464,
};

const positionIwamotocho = {
  lat: 35.171148024761166,
  lng: 136.88292921265773,
};

export const MyComponent: VFC = memo(() => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className="bar">
        　
        <h1 className="time">
          Yahoo!名古屋オフィス 〜 名城大学名古屋ドーム前キャンパス
        </h1>
        <br />
        <h1 className="time">1時間45分</h1>
      </div>
      <div className="timemap">
        <div className="googlemap">
          <LoadScript googleMapsApiKey="AIzaSyD2E29hstZdVjn_ltO40KbkU_xbtwgsjmw">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
            >
              <Marker position={positionAkiba} />
              <Marker position={positionIwamotocho} />
              <DirectionsRenderer />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Button href="/" sx={{ mt: 1, mr: 1 }}>
              Finish
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
});

export default MyComponent;
