import React from "react";
import {FormControl, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";


function DropDownSelect({ items, label, chooseFilterCallback }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target);
        console.log(chooseFilterCallback);
        chooseFilterCallback(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 200, my: 1}}>
            <InputLabel id={label + "-select-label"}>{label}</InputLabel>
            <Select
                id={label + "-select"}
                labelId={label + "-select-label"}
                value={value}
                onChange={handleChange}
                label={label}
            >
                {items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.text}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default DropDownSelect;