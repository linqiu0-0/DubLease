import * as React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from "@mui/material/Box";

export default function MonthPicker({ prefix, chooseFilterCallback }) {
    const [value, setValue] = React.useState(dayjs());

    const handleChange = (event) => {
        setValue(event);
        let month = (event.$M + 1).toString();
        month = month.length == 1 ? ("0" + month) : month;
        chooseFilterCallback(event.$y + "-" + month);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={['year', 'month']}
                label={prefix + " Year And Month"}
                minDate={dayjs('2023-01-01')}
                maxDate={dayjs('2029-12-31')}
                value={value}
                onChange={handleChange}
                renderInput={(params) =>
                    <TextField sx={{m:1, width:200}} {...params} helperText={null} />
            }
            />
        </LocalizationProvider>
    );
}