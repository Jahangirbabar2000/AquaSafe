import { React } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


function Parameters(props) {
  return (
    <Card variant="outlined" sx={{
      ':hover': {
        boxShadow: 20,
      },
      borderRadius: '8px',
      backgroundColor: props.color,
      color: "white",
      boxShadow: 5,
    }}>
      <CardContent style={{ padding: 12 }}>
        <Typography variant='h5' component="div">
          {props.parameterName}
        </Typography>
        <Typography variant='h6'>
          {props.value}
        </Typography>
      </CardContent>
    </Card >
  )
}

export default Parameters