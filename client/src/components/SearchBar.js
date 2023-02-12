import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: 1,
    borderRadius: theme.shape.borderRadius,
    borderColor: 'secondary.main',
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginBottom: 10,
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        // paddingRight: theme.spacing(61),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function SearchBar({chooseFilterCallback, searchWithFilters}) {
    const [value, setValue] = React.useState('');
    // const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log(event.target.value);
            // navigate("/signin");
        }
    }

    const handleChange = (event) => {
        //console.log(event.target.value);
        chooseFilterCallback(event.target.value);
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );
}

export default SearchBar;