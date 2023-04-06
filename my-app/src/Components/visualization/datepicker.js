import * as React from 'react';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import moment from 'moment';

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {     
                        fontSize: '15px', // set the font size to be larger than the "large" size
                        padding: '12px', // set the padding to be larger than the "large" size
                    },
                },
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    // Some CSS
                    fontSize: '1.5rem',
                },
            },
        },
        PrivatePickersYear: {
            styleOverrides: {
                button: {
                    // Some CSS
                    fontSize: '1.5rem',
                },
            },
        },
        MuiPickersCalendarHeader: {
            styleOverrides: {
                label: {
                    // Some CSS
                    fontSize: '1.4rem',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    // Some CSS
                    fontSize: '1.2rem',
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    // Some CSS
                    fontSize: '2rem',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
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
                    value={moment(startDate)}
                    onChange={handleChange1}
                    minDate={moment('2013-01-03 00:00:00')}
                    maxDate={moment('2018-12-17 00:00:00')}
                    renderInput={(params) => <TextField {...params} />}
                />
                <span> ___ </span>
                <DesktopDatePicker
                    label={
                        <Typography variant="h6" style={{ fontSize: '1.6rem' }}>
                            To
                        </Typography>
                    }
                    inputFormat="DD/MM/YYYY"
                    value={moment(endDate)}
                    onChange={handleChange2}
                    minDate={moment(startDate)}
                    maxDate={moment('2018-12-17 00:00:00')}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}