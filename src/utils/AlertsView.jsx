import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
const MyAlert = ({
  severity,
  message,
  setShowAlert,
  showAlert,
  clearAlerts,
  ...rest
}) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
      clearAlerts();
      // Disable alert after 5 seconds
    }, 5000);

    return () => {
      // Clears timer in case you close your alert somewhere else.
      clearTimeout(timeout);
    };
  }, [setShowAlert, clearAlerts]);
  return <Alert severity={severity}>{message}</Alert>;
};

const AlertsView = ({
  successMessages,
  errorMessages,
  handleDismissSuccessMessage,
  handleDismissErrorMessage,
  showAlert,
  setShowAlert,
  clearAlerts,
  ...rest
}) => {
  console.log({ successMessages, errorMessages });
  return (
    <>
      {showAlert && (
        <Stack>
          {successMessages.map((success, index) => (
            <MyAlert
              key={index}
              severity="success"
              message={success.msg}
              setShowAlert={setShowAlert}
              showAlert={showAlert}
              clearAlerts={clearAlerts}
              onClose={() => {
                handleDismissSuccessMessage(index);
              }}
            />
          ))}
          {errorMessages.map((error, index) => (
            <MyAlert
              key={index}
              severity="warning"
              clearAlerts={clearAlerts}
              setShowAlert={setShowAlert}
              message={error.msg}
              onClose={() => {
                handleDismissErrorMessage(index);
              }}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default AlertsView;
