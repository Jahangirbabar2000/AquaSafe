import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Box } from "@mui/material";
import { MapContainer, TileLayer } from 'react-leaflet';

const ProjectCard = ({ project, onCardClick }) => {
    const { Name, Location, Country, Longitude, Latitude, Description } = project;
    
    // Default coordinates if not provided (center of world map)
    const defaultLat = 20.0;
    const defaultLng = 0.0;
    const lat = Latitude != null ? Latitude : defaultLat;
    const lng = Longitude != null ? Longitude : defaultLng;
    
    return (
        <Card 
            sx={{ 
                maxWidth: '100%', 
                margin: { xs: '0.5rem 0', sm: '0.5rem' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                }
            }}
        >
            <CardActionArea 
                onClick={() => onCardClick(project)}
                sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.5, sm: 2 } }}>
                    <Typography 
                        gutterBottom 
                        variant="h5" 
                        component="h2"
                        sx={{ 
                            fontSize: { xs: '1.25rem', sm: '1.5rem' },
                            fontWeight: 600,
                            mb: 1
                        }}
                    >
                        {Name}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        component="p"
                        sx={{ mb: 0.5, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                    >
                        <strong>Location:</strong> {Location}, {Country}
                    </Typography>
                    {Description && (
                        <Typography 
                            variant="body2" 
                            color="textSecondary" 
                            component="p"
                            sx={{ 
                                mb: 1.5,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {Description}
                        </Typography>
                    )}
                    <Box 
                        sx={{ 
                            height: { xs: '120px', sm: '150px' }, 
                            width: '100%', 
                            marginTop: 'auto',
                            borderRadius: 1,
                            overflow: 'hidden'
                        }}
                    >
                        <MapContainer
                            center={[lat, lng]}
                            zoom={lat === defaultLat && lng === defaultLng ? 2 : 12}
                            scrollWheelZoom={false}
                            zoomControl={false}
                            dragging={false}
                            doubleClickZoom={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProjectCard;
