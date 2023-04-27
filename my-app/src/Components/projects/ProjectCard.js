import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { MapContainer, TileLayer } from 'react-leaflet';

const ProjectCard = ({ project, onCardClick }) => {
    const { Name, Location, Country, Longitude, Latitude, Description } = project;
    return (
        <Card style={{ width: '300px', margin: '10px' }}>
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
                            center={[Longitude, Latitude]}
                            zoom={12}
                            scrollWheelZoom={false}
                            zoomControl={false}
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
