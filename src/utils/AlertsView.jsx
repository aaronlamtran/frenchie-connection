
import React from "react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const AlertsView = ({
  successMessages,
  errorMessages,
  handleDismissSuccessMessage,
  handleDismissErrorMessage
}) => (
  <Stack>
    {successMessages.map((success, index) => (
      <Alert
      key={index}
      severity="success"
      onClose={() => {
          handleDismissSuccessMessage(index);
        }}
        >
        <AlertTitle>{success.msg}</AlertTitle>
      </Alert>
    ))}
    {errorMessages.map((error, index) => (
      <Alert
      key={index}
      severity="warning"
      onClose={() => {
          handleDismissErrorMessage(index);
        }}
        >
       <AlertTitle> {error.msg}</AlertTitle>
      </Alert>
    ))}
  </Stack>
);

export default AlertsView;
