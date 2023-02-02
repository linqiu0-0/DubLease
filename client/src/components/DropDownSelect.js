import React from "react";
import {FormControl, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";


function DropDownSelect() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value="">
                    Any Price
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    );
}

export default DropDownSelect;