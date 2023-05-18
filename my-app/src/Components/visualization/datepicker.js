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
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    // Some CSS
                    fontSize: '1.1rem',
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    // Some CSS
                    maxWidth: '29vh',
                },
            },
        },
    },
});

export default function Datepicker({ startDate, setStartDate, endDate, setEndDate, minDate, maxDate }) {

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
                        <Typography variant="h6">
                            From
                        </Typography>
                    }
                    inputFormat="DD/MM/YYYY"
                    value={startDate}
                    onChange={handleChange1}
                    minDate={minDate}
                    maxDate={endDate}
                    TextFieldComponent={TextField}
                />
                <span> ___ </span>
                <DesktopDatePicker
                    label={
                        <Typography variant="h6">
                            To
                        </Typography>
                    }
                    inputFormat="DD/MM/YYYY"
                    value={endDate}
                    onChange={handleChange2}
                    minDate={startDate}
                    maxDate={maxDate}
                    TextFieldComponent={TextField}
                />
            </LocalizationProvider>
        </ThemeProvider>
    );
}