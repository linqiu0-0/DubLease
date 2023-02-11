import React from "react";
import MainAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import LeaseCard from "../components/LeaseCard";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import {Stack} from "@mui/material";
import DropDownSelect from "../components/DropDownSelect";
import Map from "../components/Map";
import BasicFilters from "../data.json";
import LeaseCardData from "../LeaseCardData.json";
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

const headers = { 'Content-Type': 'application/json' }

const Home = () => {
    const [filters, setFilters] = React.useState(initialFilters);

    const chooseFilterCallback = (para) => (filterValue) => {
        console.log(para);
        console.log(filterValue);
        const newFilters = [...filters];
        const filter = filters.find(
            f => f.filterQuery === para
        )
        filter.value = filterValue;
        setFilters(newFilters);
        console.log(filters);
    }

    const searchWithFilters = (event) => {
        let queryUrl = "?";
        filters.map((filter) => {
            queryUrl += filter.filterQuery + "=" + filter.value + "&";
        });
        queryUrl = queryUrl.slice(0, -1);
        console.log(queryUrl);

        // fetch('https://api.npms.io/v2/search?q=react', {
        // })
        //     .then(async response => {
        //         const data = await response.json();
        //
        //         // check for error response
        //         if (!response.ok) {
        //             // get error message from body or default to response statusText
        //             const error = (data && data.message) || response.statusText;
        //             return Promise.reject(error);
        //         }
        //
        //         console.log("haha");
        //     })
        //     .catch(error => {
        //         console.error('There was an error!', error);
        //     });
    }


    return (
        <>
            <MainAppBar />
            <Box marginX={4}>
                <Grid container spacing={3} mt={2}>
                    <Grid xs={6}>
                        <Map />
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="h5" component="h1" p={1}>
                            Search Properties
                        </Typography>
                        <Typography variant="subtitle1" component="div" p={1}>
                            {Object.keys(LeaseCardData).length} Results found
                        </Typography>
                        <Box sx={{display: "flex"}}>
                            <SearchBar
                                chooseFilterCallback={chooseFilterCallback("name")}
                                searchWithFilters={searchWithFilters}/>
                            <Button variant="contained" color="secondary" onClick={searchWithFilters}>Apply Filter</Button>
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
                        <Stack spacing={3}
                        sx={{
                            maxHeight: "1000px",
                            overflow: "auto"
                        }}>
                            {LeaseCardData.map((singleLease) => (
                                <LeaseCard key={singleLease.id} LeaseCardData={singleLease} />
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;