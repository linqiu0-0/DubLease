import React from "react";
import Typography from "@mui/material/Typography";
import MainAppBar from "../components/AppBar";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Upload from "../components/ImageUpload/Upload";

const theme = createTheme({
    typography: {
        body1: {
            fontWeight: 300,
        }
    },
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#ab47bc",
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

const PostNewLease = () => {
    const userInfo = useLocation();
    const navigate = useNavigate();
    const [streetAddress, setStreetAddress] = React.useState("");
    const [unitNum, setUnitNum] = React.useState("");
    const [cityAddress, setCityAddress] = React.useState("");
    const [stateAddress, setStateAddress] = React.useState("");
    const [zipcode, setZipCode] = React.useState("");

    const [category, setCategory] = React.useState("");
    const [propertyName, setPropertyName] = React.useState("");
    const [area, setArea] = React.useState("");
    const [roomType, setRoomType] = React.useState("");
    const [rent, setRent] = React.useState("");
    const [deposit, setDeposit] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [dateAvailable, setDateAvailable] = React.useState("");
    const [dateEnd, setDateEnd] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [pet, setPet] = React.useState("");
    const [parking, setParking] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [validLatitude, setValidLatitude] = React.useState(true);
    const [validLongitude, setValidLongitude] = React.useState(true);
    const [images, setImages] = React.useState("");
    const formRef = React.useRef();
    const username = window.sessionStorage.getItem("username");

    const handleSubmit = () => {
        if(!validLatitude) {
            //need popup/alert
            console.log("Invalid latitude");
        } else if (!validLongitude) {
            //need popup/alert
            console.log("Invalid longitude");
        } else if (dateEnd < dateAvailable) {
            console.log("End date is before start date");
        } else if (formRef.current.reportValidity()) {
            const areaFloat = parseFloat(area);
            const rentFloat = parseFloat(rent);
            const depositInt = parseInt(deposit);
            const genderInt = parseInt(gender);
            const petInt = parseInt(pet);
            const parkingInt = parseInt(parking);
            const latitudeFloat = parseFloat(latitude);
            const longitudeFloat = parseFloat(longitude);

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "user_id": userInfo.state.userId,
                    "address": streetAddress + " " + unitNum + ", " + cityAddress + ", " + stateAddress + " " + zipcode,
                    "category": category,
                    "propertyName": propertyName,
                    "area": areaFloat,
                    "roomType": roomType,
                    "price": rentFloat,
                    "deposit": depositInt,
                    "description": description,
                    "dateAvailable": dateAvailable,
                    "dateEnd": dateEnd,
                    "gender": genderInt,
                    "pet": petInt,
                    "parking": parkingInt,
                    "latitude": latitudeFloat,
                    "longitude": longitudeFloat,
                    "images": images
                })
            };
            console.log(requestOptions.body);
            fetch(process.env.REACT_APP_SERVER_URL + "add_lease", requestOptions)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    navigate('/listings');
                })
                .catch(handleError);
        }
    }

    function checkStatus(response) {
        if (!response.ok) {
            response.text().then(txt => { alert(txt); });
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function handleError(error) {
        console.log(error);
    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <MainAppBar username={username} />
                <Button
                    sx={{ mt: 2, p: 0, px: 1, mx: 4 }}
                    size="medium"
                    color="primary"
                    variant="contained" onClick={
                        () => {
                            navigate('/home');
                        }
                    }>
                    <ArrowBackIcon />
                    <Typography variant="button" component="span" p={1}>
                        Back Home
                    </Typography>
                </Button>
                <Box marginX={30} sx={{ flexGrow: 1 }} paddingBottom="5%">
                    <Grid xs={10}>
                        <Typography variant="h3" component="h1" p={1}>
                            Add New Property
                        </Typography>
                        <Typography variant="body1" component="h1" p={1}>
                            Make sure you have filled in all the necessary fields and have uploaded all the required files.
                        </Typography>
                    </Grid>

                    <form ref={formRef}>
                        <Grid container spacing={3} mt={2} paddingBottom="5%">
                            <Grid xs={10}>
                                <Typography variant="h6" p={1}>
                                    Property Address
                                </Typography>
                            </Grid>
                            <Grid xs={6}>
                                <Typography variant="body1" p={1}>
                                    Street Address *
                                </Typography>
                                <TextField
                                    required
                                    id="streetAddress"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setStreetAddress(e.target.value)}

                                ></TextField>
                            </Grid>
                            <Grid xs={6}>
                                <Typography variant="body1" p={1}>
                                    Unit Number
                                </Typography>
                                <TextField
                                    id="unitNum"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setUnitNum(e.target.value)}

                                ></TextField>
                            </Grid>

                            <Grid xs={4}>
                                <Typography variant="body1" component="h1" p={1}>
                                    City *
                                </Typography>
                                <TextField
                                    required
                                    id="cityAddress"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setCityAddress(e.target.value)}

                                ></TextField>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant="body1" component="h1" p={1}>
                                    State *
                                </Typography>
                                <TextField
                                    required
                                    id="stateAddress"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setStateAddress(e.target.value)}

                                ></TextField>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant="body1" component="h1" p={1}>
                                    Zipcode *
                                </Typography>
                                <TextField
                                    required
                                    id="zipCode"
                                    type="number"
                                    InputProps={{
                                        inputProps: { 
                                            min: 0
                                        }
                                    }}
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setZipCode(e.target.value)}

                                ></TextField>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} mt={2}>
                            <Grid xs={10}>
                                <Typography variant="h6" p={1}>
                                    Listing Information
                                </Typography>
                            </Grid>
                            <Grid xs={12}>
                                <Typography variant="body1" p={1}>
                                    Property Category *
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="category-label">Select Category</InputLabel>
                                    <Select
                                        required
                                        labelId="category-label"
                                        id="property"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        <MenuItem value={"Apartment"}>Apartment</MenuItem>
                                        <MenuItem value={"House"}>House</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid xs={6}>
                                <Typography variant="body1" p={1}>
                                    Property Name *
                                </Typography>
                                <TextField
                                    required
                                    id="propertyName"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setPropertyName(e.target.value)}

                                ></TextField>
                            </Grid>
                            <Grid xs={6}>
                                <Typography variant="body1" component="h3" p={1}>
                                    Room Size (sqrt ft) *
                                </Typography>
                                <TextField
                                    required
                                    id="area"
                                    type="number"
                                    InputProps={{
                                        inputProps: { 
                                            min: 0
                                        }
                                    }}
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setArea(e.target.value)}

                                ></TextField>
                            </Grid>

                            <Grid xs={6}>
                                <Typography variant="body1" p={1}>
                                    Property Latitude *
                                </Typography>
                                <TextField
                                    required
                                    id="latitude"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setLatitude(e.target.value); setValidLatitude(/^[-+]?[0-9]*\.?[0-9]+$/.test(e.target.value) || e.target.value.length == 0);
                                    }}

                                ></TextField>
                            </Grid>
                            <Grid xs={6}>
                                <Typography variant="body1" p={1}>
                                    Property Longitude *
                                </Typography>
                                <TextField
                                    required
                                    id="longitude"
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setLongitude(e.target.value); setValidLongitude(/^[-+]?[0-9]*\.?[0-9]+$/.test(e.target.value) || e.target.value.length == 0)
                                    }}

                                ></TextField>
                            </Grid>

                            <Grid xs={12}>
                                <Typography variant="body1" p={1}>
                                    Room Type *
                                </Typography>
                                <FormControl fullWidth>
                                    <InputLabel id="room-label">Select Type</InputLabel>
                                    <Select
                                        required
                                        labelId="room-label"
                                        id="roomType"
                                        value={roomType}
                                        onChange={(e) => setRoomType(e.target.value)}
                                    >
                                        <MenuItem value={"Studio"}>Studio</MenuItem>
                                        <MenuItem value={"1B1B"}>1B1B</MenuItem>
                                        <MenuItem value={"2B1B"}>2B1B</MenuItem>
                                        <MenuItem value={"2B2B"}>2B2B</MenuItem>
                                        <MenuItem value={"4B2B"}>4B2B</MenuItem>
                                        <MenuItem value={"4B4B"}>4B4B</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid xs={6}>
                                <Typography variant="body1" component="h1" p={1}>
                                    Monthly Rent *
                                </Typography>
                                <TextField
                                    required
                                    id="rent"
                                    type="number"
                                    InputProps={{
                                        inputProps: { 
                                            min: 0
                                        }
                                    }}
                                    className=" text-[16px] placeholder:text-black_900_87 text-black_900_87 text-left w-[100%]"
                                    size="30ch"
                                    variant="outlined"
                                    onChange={(e) => setRent(e.target.value)}

                                ></TextField>
                            </Grid>

                            <Grid xs={6}>
                                <Typography variant="body1" component="h1" p={1}>
                                    Deposit *
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        required
                                        id="deposit"
                                        value={deposit}
                                        onChange={(e) => setDeposit(e.target.value)}
                                    >
                                        <MenuItem value={1}>Required</MenuItem>
                                        <MenuItem value={0}>Not Required</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid xs={12}>
                                <Typography variant="body1" component="h1" p={1}>
                                    Description *
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    multiline
                                    rows={4}
                                    label="Tell us about your home here"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={10}>
                                <Typography variant="body1" p={1}>
                                    Date Available *
                                </Typography>
                                <TextField
                                    required
                                    id="dateAvailable"
                                    type="date"
                                    defaultValue={dateAvailable}
                                    sx={{ width: 220 }}
                                    onChange={(e) => setDateAvailable(e.target.value)}
                                />
                            </Grid>
                            <Grid xs={10}>
                                <Typography variant="body1" p={1}>
                                    Date End *
                                </Typography>
                                <TextField
                                    required
                                    id="dateEnd"
                                    type="date"
                                    defaultValue={dateEnd}
                                    sx={{ width: 220 }}
                                    onChange={(e) => setDateEnd(e.target.value)}
                                />
                            </Grid>

                            <Grid xs={4}>
                                <Typography variant="body1" p={1}>
                                    Gender Constraint *
                                </Typography>
                                <FormControl required>
                                    <RadioGroup
                                        id="gender"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <FormControlLabel value={0} control={<Radio required={true} />} label="Any" />
                                        <FormControlLabel value={1} control={<Radio required={true} />} label="Male Only" />
                                        <FormControlLabel value={2} control={<Radio required={true} />} label="Female Only" />
                                        <FormControlLabel value={3} control={<Radio required={true} />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant="body1" p={1}>
                                    Pet Friendly *
                                </Typography>
                                <FormControl>
                                    <RadioGroup
                                        required
                                        id="pet"
                                        onChange={(e) => setPet(e.target.value)}
                                    >
                                        <FormControlLabel value={1} control={<Radio required={true} />} label="Yes" />
                                        <FormControlLabel value={0} control={<Radio required={true} />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant="body1" p={1}>
                                    Parking Available *
                                </Typography>
                                <FormControl>
                                    <RadioGroup
                                        required
                                        id="parking"
                                        onChange={(e) => setParking(e.target.value)}
                                    >
                                        <FormControlLabel value={1} control={<Radio required={true} />} label="Yes" />
                                        <FormControlLabel value={0} control={<Radio required={true} />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3} mt={2} paddingBottom="5%">
                            <Grid xs={10}>
                                <Typography variant="h6" p={1}>
                                    Property/Room Images
                                </Typography>
                            </Grid>
                            <Grid xs={10}>
                                <Upload photos={photoData => {
                                    setImages(photoData);
                                    console.log(photoData);
                                }}/>
                            </Grid>


                        </Grid>

                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </>
        </ThemeProvider>
    );
};

export default PostNewLease;