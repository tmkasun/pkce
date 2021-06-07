import React, { useEffect, useState } from "react";
import CUtils from "./utils/crypto";
import useStyles from "./utils/styles";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import StepFour from "./steps/StepFour";
import StepFive from "./steps/StepFive";
import "./styles.css";

import Stepper from "@material-ui/core/Stepper";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const REDIRECT_URI = "https://pkce.knnect.com/";
const CLIENT_ID = "Y_yVGvePd_gJIiQv9yVlHJSgLTwa";
export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [code_verifier, setCode_verifier] = useState();
  const [code_challenge, setCode_challenge] = useState();
  const [oauth_code, setOauth_code] = useState();
  const [tokenData, setTokenData] = useState();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [name, setName] = useState("no name");
  useEffect(() => {
    let params = new URL(document.location).searchParams;
    const hasCode = params.has("code");
    if (hasCode) {
      setOauth_code(params.get("code"));
      setActiveStep(3);
    }
    const codeVerifier = sessionStorage.getItem("codeVerifier");
    if (codeVerifier) {
      setCode_verifier(codeVerifier);
    }
    // Service worker test
    fetch("/static/sample.json")
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
      });
  }, []);
  const genCodeChallenge = () => {
    CUtils.generateHash(code_verifier).then(setCode_challenge);
  };
  const openAuth = () => {
    setIsRedirecting(true);

    const params = {
      response_type: "code",
      client_id: "Y_yVGvePd_gJIiQv9yVlHJSgLTwa",
      scope:
        "apim:api_create apim:api_delete apim:api_import_export apim:api_product_import_export apim:api_publish apim:api_view apim:app_import_export apim:client_certificates_add apim:client_certificates_update apim:client_certificates_view apim:document_create apim:document_manage apim:ep_certificates_add apim:ep_certificates_update apim:ep_certificates_view apim:external_services_discover apim:mediation_policy_create apim:mediation_policy_manage apim:mediation_policy_view apim:pub_alert_manage apim:publisher_settings apim:shared_scope_manage apim:subscription_block apim:subscription_view apim:threat_protection_policy_create apim:threat_protection_policy_manage openid",
      redirect_uri: REDIRECT_URI,
      state: "/apis",
      code_challenge: code_challenge,
      code_challenge_method: "S256"
      // response_mode: "form_post"
    };
    let authURL = new URL("https://apim.knnect.com/oauth2/authorize");
    for (const [key, value] of Object.entries(params)) {
      authURL.searchParams.set(key, value);
    }
    window.open(authURL, "_self");
  };

  const getToken = () => {
    const opts = new URLSearchParams({
      grant_type: "authorization_code",
      code: oauth_code,
      redirect_uri: REDIRECT_URI,
      code_verifier: code_verifier,
      client_id: CLIENT_ID
    });
    fetch("https://apim.knnect.com/oauth2/token", {
      method: "post",
      body: opts,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8", // https://tools.ietf.org/html/rfc6749 | 4.1.3.  Access Token Request
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then(setTokenData)
      .catch((error) => {
        console.error(error);
        debugger;
      });
  };

  return (
    <div className={classes.root}>
      <a href="https://datatracker.ietf.org/doc/html/rfc7636">RFC7636</a>
      <Stepper activeStep={activeStep} orientation="vertical">
        <StepOne
          setCode_verifier={setCode_verifier}
          handleNext={handleNext}
          handleBack={handleBack}
          classes={classes}
          code_verifier={code_verifier}
        />
        <StepTwo
          code_challenge={code_challenge}
          handleNext={handleNext}
          handleBack={handleBack}
          classes={classes}
          genCodeChallenge={genCodeChallenge}
        />
        <StepThree
          handleNext={handleNext}
          handleBack={handleBack}
          classes={classes}
          openAuth={openAuth}
          isRedirecting={isRedirecting}
        />
        <StepFour
          handleNext={handleNext}
          handleBack={handleBack}
          classes={classes}
          oauth_code={oauth_code}
        />
        <StepFive
          handleNext={handleNext}
          handleBack={handleBack}
          classes={classes}
          getToken={getToken}
          tokenData={tokenData}
        />
      </Stepper>
      {false && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}

{
  /* <div className="App">
      <h1>PKCE demo</h1>
      <h2>{name}</h2>
      <button
        onClick={() => {
          const codeVerifier = CUtils.generateCodeVerifier();
          sessionStorage.setItem("codeVerifier", codeVerifier);
          setCode_verifier(codeVerifier);
        }}
      >
        Generate code verifier
      </button>
      <div className="cv">
        {code_verifier && <code>{code_verifier.toString()}</code>}
      </div>
      <hr />
      
      <button onClick={genCodeChallenge}>Generate code challenge</button>
      <div className="cv">
        {code_challenge && <code>{code_challenge.toString()}</code>}
      </div>
      
      <hr />
      <button onClick={openAuth}>Direct to auth server</button>
      <div className="cv">{isRedirecting && "Redirecting . . ."}</div>
      <div className="cv">{oauth_code && <code>{oauth_code}</code>}</div>

      <hr />
      <button onClick={getToken}>Generate Token</button>
      
      <hr />
      
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
      <hr />
      <div>
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
      </div>
    </div> */
}
