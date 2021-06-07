import React, { useEffect, useState } from "react";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
import StepLabel from "@material-ui/core/StepLabel";

import CUtils from "../utils/crypto";

export default (props) => {
  const {
    classes,
    disableBack,
    handleBack,
    handleNext,
    isActive,
    code_verifier,
    setCode_verifier
  } = props;
  return (
    <Step {...props} key={"gen-cc"}>
      <StepLabel>Code Verifier</StepLabel>
      <StepContent {...props}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => {
                const codeVerifier = CUtils.generateCodeVerifier();
                sessionStorage.setItem("codeVerifier", codeVerifier);
                setCode_verifier(codeVerifier);
              }}
            >
              Generate
            </Button>
          </Grid>
          <Grid item md={12} sm={12}>
            {code_verifier && (
              <TextField
                fullWidth
                value={code_verifier.toString()}
                label="Code Verifier"
                variant="outlined"
              />
            )}
          </Grid>
          <Grid item md={12} sm={12}>
            <Button
              disabled={disableBack}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  );
};
