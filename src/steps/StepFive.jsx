import React, { useEffect, useState } from "react";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import TextField from "@material-ui/core/TextField";
import StepLabel from "@material-ui/core/StepLabel";
import ReactJson from "react-json-view";
import jwt_decode from "jwt-decode";

export default (props) => {
  const {
    classes,
    tokenData,
    disableBack,
    handleBack,
    handleNext,
    getToken
  } = props;
  return (
    <Step {...props} key={"gen-tkn"}>
      <StepLabel>Oauth token</StepLabel>
      <StepContent {...props}>
        <Grid container spacing={3}>
          <Grid item md={12} sm={12}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={getToken}
            >
              Generate
            </Button>
          </Grid>
          <Grid item md={12} sm={12}>
            {tokenData && (
              <>
                <h3>Token Data</h3>
                <ReactJson
                  collapseStringsAfterLength={50}
                  displayDataTypes={false}
                  src={tokenData}
                />
              </>
            )}
          </Grid>
          <Grid item md={12} sm={12}>
            {tokenData && (
              <>
                <h3>ID Token</h3>
                <ReactJson
                  collapseStringsAfterLength={50}
                  displayDataTypes={false}
                  src={jwt_decode(tokenData.id_token)}
                />
              </>
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
              Finish
            </Button>
          </Grid>
        </Grid>
      </StepContent>
    </Step>
  );
};
