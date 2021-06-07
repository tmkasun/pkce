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
    genCodeChallenge,
    code_challenge
  } = props;
  return (
    <Step {...props} key={"gen-cv"}>
      <StepLabel>Code Challenge</StepLabel>
      <StepContent {...props}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={genCodeChallenge}
            >
              Generate
            </Button>
          </Grid>
          <Grid item md={12} sm={12}>
            {code_challenge && (
              <TextField
                fullWidth
                value={code_challenge.toString()}
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
            <Button
              disabled={!code_challenge}
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
