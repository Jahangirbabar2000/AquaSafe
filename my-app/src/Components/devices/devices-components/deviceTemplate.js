import React from 'react';
import Sidebar2 from "../../sidebar/Sidebar2";
import Navbar from "../../navbar/navbar";
import { Grid, Card, CardContent, Typography, IconButton, CardActions } from '@mui/material';
import ForwardIcon from '@mui/icons-material/Forward';
import axios from "axios";
import { Link } from "react-router-dom";

const DeviceTemplateCard = ({ Model, Name, CommTech, Sensors }) => {
    return (
        <div style={{ position: 'relative' }}>
            <Card sx={{ maxWidth: 345, mb: 4, boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.3s ease-in-out', '&:hover': { boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.5)' } }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {Name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Model: {Model}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        CommTech: {CommTech}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sensors: {Object.values(Sensors).join(', ')}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <div style={{ position: 'absolute', bottom: 5, right: 25 }}>
                        <Link to="/deviceDeployment" style={{ textDecoration: 'none' }}>
                            <IconButton>
                                <ForwardIcon />
                            </IconButton>
                        </Link>
                    </div>
                </CardActions>
            </Card>
        </div>

    );
};


const DeviceTemplates = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:8080/deviceTemplates`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.log(error));
    }, []);
    console.log(...data)
    return (
        <div >
            <Navbar />
            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <Sidebar2 name="Devices" />
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h4" sx={{ ml: 5, mt: 5, textAlign: 'center' }}>
                        Select a Device Template
                    </Typography>
                    <Grid container spacing={3} sx={{ ml: 5, mt: 3 }}>
                        {data.map((template) => (
                            <Grid key={template.id} item xs={12} md={6} lg={4}>
                                <DeviceTemplateCard {...template} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );

};

export default DeviceTemplates;
