import React, {useEffect} from "react";
import MainAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import LeaseCard from "../components/LeaseCard";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import {createTheme, Stack, ThemeProvider} from "@mui/material";
import DropDownSelect from "../components/DropDownSelect";
import Map from "../components/Map";
import BasicFilters from "../assets/static/filter.json";
import MonthPicker from "../components/MonthPicker";
import Button from "@mui/material/Button";
import {useLocation} from "react-router-dom";

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
    const userInfo = useLocation();

    const chooseFilterCallback = (para) => (filterValue) => {
        const newFilters = [...filters];
        const filter = filters.find(
            f => f.filterQuery === para
        )
        filter.value = filterValue;
        setFilters(newFilters);
        // console.log(filters);
    }

    const searchWithFilters = (event) => {
        let queryUrl = "?";
        filters.map((filter) => {
            if (filter.value !== "" && (filter.value !== "0" || filter.filterQuery === "name")) {
                queryUrl += filter.filterQuery + "=" + filter.value + "&";
            }
        });
        queryUrl = queryUrl.slice(0, -1);
        console.log(process.env.REACT_APP_SERVER_URL + "home" + queryUrl);

        fetch(process.env.REACT_APP_SERVER_URL + "home" + queryUrl,
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
            });
    }


    useEffect(() => {
        searchWithFilters();
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <>
            <MainAppBar username={userInfo.state.username}/>
            <Box marginX={4}>
                <Grid container spacing={3} mt={2}>
                    <Grid xs={6}>
                        <Map leaseData={leaseData}/>
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="h5" component="h1" p={1}>
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
                        <Stack spacing={2} mt={1}
                        sx={{
                            height: "800px",
                            overflow: "auto"
                        }}>
                            {leaseData.map((singleLease) => (
                                <LeaseCard key={singleLease.post_id} leaseCardData={singleLease} username={userInfo.state.username}/>
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