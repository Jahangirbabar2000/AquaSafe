import React, { useState } from "react";
import { Typography, Grid, Paper } from "@mui/material";

const Parameter = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <Grid item xs={12} sm={6}>
            <Paper
                elevation={isHovered ? 7 : 3}
                sx={{ p: 2, m: 1 }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {props.title}
                </Typography>
                <Typography variant="body1">{props.description}</Typography>
            </Paper>
        </Grid>
    );
};

export default Parameter;
