import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Alerta({errorMessage,showError} : {errorMessage: string | undefined, showError: boolean | undefined}) {
  return (
    <>
     { showError? <Stack sx={{ width: '100%' }} spacing={2}> <Alert severity="error">{errorMessage}</Alert></Stack> : ""} 
    </>
  )
  
}