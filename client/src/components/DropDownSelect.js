import React from "react";
import {FormControl, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


function DropDownSelect({ items }) {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 150 }}>
            <Select
                value={value}
                onChange={handleChange}
                displayEmpty
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