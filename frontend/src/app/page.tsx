import React from "react";
import { CssBaseline, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import StepForm from "@/components/StepForm";

import { StepFormProvider } from './Context';

const HomePage = () => {

  return (
    <Container component="main" maxWidth='md'>
      <CssBaseline />
      <StepFormProvider>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <StepForm/>
        </Paper>
      </StepFormProvider>
    </Container>
  );
};

export default HomePage;
