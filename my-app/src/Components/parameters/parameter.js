import React, { useState } from "react";
import { Typography, Grid, Paper, Chip } from "@mui/material";

const Parameter = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Paper
                elevation={isHovered ? 7 : 3}
                sx={{
                    p: 2,
                    m: 1,
                    height: "100%",
                    backgroundColor: isHovered ? "rgba(0, 0, 0, 0.03)" : "inherit",
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", paddingBottom: "10px" }}
                >
                    {props.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, paddingBottom: "10px" }}>
                    {props.description}
                </Typography>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "600", mb: 1, paddingBottom: "5px" }}
                >
                    Units:
                </Typography>
                <div>
                    {props.units.map((unit) => (
                        <Chip
                            key={unit}
                            label={unit}
                            size="small"
                            color="primary"
                            sx={{ mr: 1, mb: 1 }}
                        />
                    ))}
                </div>
            </Paper>
        </Grid>
    );
};

export default Parameter;
