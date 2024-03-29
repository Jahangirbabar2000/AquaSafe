import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { MapContainer, TileLayer } from 'react-leaflet';

const ProjectCard = ({ project, onCardClick }) => {
    const { Name, Location, Country, Longitude, Latitude, Description } = project;
    return (
        <Card sx={{ maxWidth: '100%', margin: '0.5rem' }}>
            <CardActionArea onClick={() => onCardClick(project)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {Name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Location: {Location}, {Country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Description: {Description}
                    </Typography>
                    <div style={{ height: '150px', width: '100%', marginTop: '10px' }}>
                        <MapContainer
                            center={[Latitude, Longitude]}
                            zoom={12}
                            scrollWheelZoom={false}
                            zoomControl={false}
                            dragging={false}
                            doubleClickZoom={false}
                            style={{ height: '100%', width: '100%', marginLeft: '0vh' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
