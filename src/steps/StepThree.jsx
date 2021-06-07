import React, { useEffect, useState } from "react";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
import StepLabel from "@material-ui/core/StepLabel";

export default (props) => {
  const {
    classes,
    disableBack,
    handleBack,
    handleNext,
    isActive,
    oauth_code,
    openAuth,
    isRedirecting
  } = props;
  return (
    <Step {...props} key={"auth"}>
      <StepLabel>Authenticate</StepLabel>
      <StepContent {...props}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={openAuth}
            >
              Redirect
            </Button>
          </Grid>
          <Grid item md={12} sm={12}>
            <div className="cv">{isRedirecting && "Redirecting . . ."}</div>
          </Grid>
          <Grid item md={12} sm={12}>
            {oauth_code && (
              <TextField
                fullWidth
                value={oauth_code}
                label="Code Challenge"
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
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  );
};
