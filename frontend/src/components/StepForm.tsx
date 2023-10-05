"use client";
import { Box, Button, FormControl, FormLabel, Grid, RadioGroup, Stepper, TextField, Typography } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import React from "react";
import { AppContext } from "@/app/Context";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const labels = ["Address", 'Attributes', 'Confirm']
const attributes = [
    {attr: 'dogsAllowed', label: 'Dogs Allowed?'},
    {attr: 'catsAllowed', label: 'Cats Allowed?'},
    {attr: 'pool', label: 'Pool?'},
    {attr: 'gym', label: 'Gym?'},
    {attr: 'trashValet', label: 'Door-to-Door Trash Pickup?'},
    {attr: 'evCharging', label: 'EV Charging Stations?'},
    {attr: 'maintenance', label: '24hr Maintenance?'},
    {attr: 'washerDryer', label: 'Washer/Dryer in Unit?'},
    {attr: 'stainlessSteel', label: 'Stainless Steel Appliances?'}
]

const handleSteps = (step: number) => {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <AttributesForm />;
        default:
            return <AddressForm />;
    }
};

const AddressForm = () => {
    const { formValues, activeStep, handleChange, handleNext, handleBack } = React.useContext(AppContext);
    const showBack = activeStep > 0;
    const showNext = activeStep < labels.length - 1;
    const showSubmit = activeStep === labels.length - 1;
    return (
        <>
            <Box sx={{my: 5}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="address"
                            label="Address"
                            name="address"
                            value={formValues.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id="bedrooms"
                            label="Bedrooms"
                            name="bedrooms"
                            value={formValues.bedrooms}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id="bathrooms"
                            label="Bathrooms"
                            name="bathrooms"
                            value={formValues.bathrooms}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id="sqft"
                            label="Square Feet"
                            name="sqft"
                            value={formValues.sqft}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            id="price"
                            label="Monthly Rent"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display:'flex', justifyContent:"flex-end"}}>
                {showBack && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary" onClick={handleBack}>Back</Button>}
                {showNext && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary" onClick={handleNext}>Next</Button>}
                {showSubmit && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary">Submit</Button>}
            </Box>
        </>
    )
}

const AttributesForm = () => {
    const { formValues, activeStep, handleChange, handleNext, handleBack } = React.useContext(AppContext);
    const showBack = activeStep > 0;
    const showNext = activeStep < labels.length - 1;
    const showSubmit = activeStep === labels.length - 1;
    return (
        <>
            <Box sx={{my: 5}}>
                <Grid container spacing={2}>
                    {attributes.map(({attr, label}) => (
                        <Grid item xs={6}>
                            <FormControl sx={{px:3}}>
                                <FormLabel>{label}</FormLabel>
                                <RadioGroup
                                    row
                                    name = {attr}
                                    value={formValues[attr as keyof typeof formValues]}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                    <FormControlLabel value={0} control={<Radio />} label="No" />
                                    <FormControlLabel value={0.5} control={<Radio />} label="Not Sure" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{display:'flex', justifyContent:"flex-end"}}>
                {showBack && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary" onClick={handleBack}>Back</Button>}
                {showNext && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary" onClick={handleNext}>Next</Button>}
                {showSubmit && <Button sx={{mx:1, minWidth:100}} variant="contained" color="primary">Submit</Button>}
            </Box>
        </>
    )
};

export default function StepForm() {
    const { activeStep } = React.useContext(AppContext);
  return (
    <>
        <Box sx={{my: 5}}>
            <Typography variant="h3" align='center'>Is it worth it, Austin?</Typography>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel>
            {labels.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {handleSteps(activeStep)}
    </>
  );
}

