import React, {useEffect} from "react";
import MainAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import LeaseCard from "../components/LeaseCard";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import {Alert, createTheme, Stack, ThemeProvider} from "@mui/material";
import DropDownSelect from "../components/DropDownSelect";
import Map from "../components/Map";
import BasicFilters from "../assets/static/filter.json";
import MonthPicker from "../components/MonthPicker";
import Button from "@mui/material/Button";

const monthPicker = [
    {
        prefix: "Start",
        queryPara: "start-date"
    },
    {
        prefix: "End",
        queryPara: "end-date"
    }
]

const initialFilters = [
    {
        filterQuery: "name",
        value: ""
    },
    {
        filterQuery: "start-date",
        value: ""
    },
    {
        filterQuery: "end-date",
        value: ""
    },
    {
        filterQuery: "min-price",
        value: ""
    },
    {
        filterQuery: "max-price",
        value: ""
    },
    {
        filterQuery: "bed",
        value: ""
    },
    {
        filterQuery: "gender",
        value: ""
    }
];

const headers = { 'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"};

const theme = createTheme({
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

const Home = () => {
    const [filters, setFilters] = React.useState(initialFilters);
    const [leaseData, setLeaseData] = React.useState([]);
    const [alert, setAlert] = React.useState("");
    const username = window.sessionStorage.getItem("username")
    const userId = window.sessionStorage.getItem("userId")

    const chooseFilterCallback = (para) => (filterValue) => {
        const newFilters = [...filters];
        const filter = filters.find(
            f => f.filterQuery === para
        )
        filter.value = filterValue;
        setFilters(newFilters);
    }

    const searchWithFilters = (event) => {
        if (filters[1].value !== "" && filters[2].value !== "" && filters[1].value.localeCompare(filters[2].value) > 0) {
            setAlert({severity: "warning", content: "Start Date must be earlier than End Date"});
            return;
        } else if (filters[3].value !== "" && filters[4].value !== "" && paseInt(filters[3].value) > paseInt(filters[4].value)) {
            setAlert({severity: "warning", content: "Max Price must be bigger than Min Price"});
            return;
        }
        // reset Alert
        setAlert("");

        let query = "?";
        filters.map((filter) => {
            if (filter.value !== "" && (filter.value !== "0" || filter.filterQuery === "name")) {
                query += filter.filterQuery + "=" + filter.value + "&";
            }
        });
        query = process.env.REACT_APP_SERVER_URL + "home" + query.slice(0, -1);

        fetch(query,
        {headers})
            .then(async response => {
                const data = await response.json();
                console.log(data);
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                setLeaseData(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setAlert({severity: "error", content: "There is an internal error."});
            });
    }

    useEffect(() => {
        searchWithFilters();
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <>
            <MainAppBar username={username} userId={userId}/>
            <Box marginX={4}>
                <Grid container spacing={3} mt={2}>
                    {/*map view*/}
                    <Grid xs={6}>
                        <Map leaseData={leaseData} isSubleaseInfo={false}/>
                    </Grid>
                    {/*sublease search*/}
                    <Grid xs={6}>
                        <Typography variant="h5" component="h1" p={1} pb={0}>
                            Search Properties
                        </Typography>
                        <Typography variant="subtitle1" component="div" p={1}>
                            {Object.keys(leaseData).length} Results found
                        </Typography>

                        <Box sx={{display: "flex"}}>
                            <SearchBar
                                chooseFilterCallback={chooseFilterCallback("name")}
                                searchWithFilters={searchWithFilters}/>
                            <Button variant="contained" color="primary" onClick={searchWithFilters}>Apply Filter</Button>
                        </Box>

                        {/* Display alert message if there is one. */}
                        {(alert === "") ? <></> : <Alert severity={alert.severity}>{alert.content}</Alert>}

                        <MonthPicker
                            prefix={monthPicker[0].prefix}
                            chooseFilterCallback={chooseFilterCallback(monthPicker[0].queryPara)}/>
                        <MonthPicker
                            prefix={monthPicker[1].prefix}
                            chooseFilterCallback={chooseFilterCallback(monthPicker[1].queryPara)}/>
                        <React.Fragment>
                            {BasicFilters.map((filter) => (
                                <DropDownSelect key={filter.id} items={filter.items} label={filter.label}
                                                chooseFilterCallback={chooseFilterCallback(filter.queryPara)}/>
                            ))}
                        </React.Fragment>

                        <Stack spacing={2} mt={1} px={1}
                        sx={{
                            height: "800px",
                            overflow: "auto"
                        }}>
                            {leaseData.map((singleLease) => (
                                <LeaseCard key={singleLease.post_id} leaseCardData={singleLease} username={username}/>
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
        </ThemeProvider>
    );
};

export default Home;