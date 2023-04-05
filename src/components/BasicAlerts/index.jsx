import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts({showError,errorMessage}) {
  return showError ? <Stack sx={{ width: '100%' }} spacing={2}> <Alert severity="error">{errorMessage}</Alert></Stack> : null
  
}