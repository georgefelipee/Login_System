import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function AlertSucess({sucessMessage, showSucess} : {sucessMessage: string | undefined, showSucess: Boolean}) {
    return(
    
     <>
        {showSucess ? <Stack sx={{ width: '100%' }} spacing={2}><Alert severity="success">{sucessMessage}</Alert> </Stack> : ""}
        
     </>
         
    )
}