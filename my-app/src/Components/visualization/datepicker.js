import * as React from 'react';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MyTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        fontSize: '16px', // set the font size to be larger than the "large" size
        padding: '12px', // set the padding to be larger than the "large" size
    },
});

const theme = createTheme({
    components: {
        // Name of the component
        MuiPickersDay: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1.5rem',
                },
            },
        },
        PrivatePickersYear: {
            styleOverrides: {
                // Name of the slot
                button: {
                    // Some CSS
                    fontSize: '1.5rem',
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                // Name of the slot
                label: {
                    // Some CSS
                    fontSize: '1.4rem',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1.2rem',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '2rem',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    maxWidth: '30vh',
                },
            },
        },
    },
});


export default function Datepicker({ startDate, setStartDate, endDate, setEndDate }) {

    const handleChange1 = (newValue) => {
        setStartDate(newValue);
    };
    const handleChange2 = (newValue) => {
        setEndDate(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                    label={
                        <Typography variant="h6" style={{ fontSize: '1.6rem' }}>
                            From
                        </Typography>
                    }
                    inputFormat="DD/MM/YYYY"
                    value={startDate}
                    onChange={handleChange1}
                    minDate={'2013-01-03 00:00:00'}
                    maxDate={'2018-12-17 00:00:00'}
                    renderInput={(params) => <MyTextField {...params} />}
                />
                <span> ___ </span>
                <DesktopDatePicker
                    label={
                        <Typography variant="h6" style={{ fontSize: '1.6rem' }}>
                            To
                        </Typography>
                    }
                    inputFormat="DD/MM/YYYY"
                    value={endDate}
                    onChange={handleChange2}
                    minDate={startDate}
                    maxDate={'2018-12-17 00:00:00'}
                    renderInput={(params) => <MyTextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}