import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Vazio from '../Vazio/index.tsx'

export default function Alerta({errorMessage, showError} :{errorMessage : string | any, showError: boolean | any} ) {
  return showError ? <Stack sx={{ width: '100%' }} spacing={2}> <Alert severity="error">{errorMessage}</Alert></Stack> : <Vazio></Vazio>
  
}