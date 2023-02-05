import React from "react";
import MainAppBar from "../components/AppBar";
import Box from "@mui/material/Box";
import LeaseCard from "../components/LeaseCard";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import {Stack} from "@mui/material";
import DropDownSelect from "../components/DropDownSelect";
import FilterDrawer from "../components/FilterDrawer";
import Map from "../components/Map";
import BasicFilters from "../data.json";

const Home = () => {
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
                            0 Results found
                        </Typography>
                        <Box my={2} sx={{display: "flex"}}>
                            <SearchBar />
                            <FilterDrawer />
                        </Box>
                        <React.Fragment>
                            {BasicFilters.map((filter) => (
                                <DropDownSelect key={filter.id} items={filter.items}/>
                            ))}
                        </React.Fragment>
                        <Stack spacing={3}
                        sx={{
                            maxHeight: "1000px",
                            overflow: "auto"
                        }}>
                            <LeaseCard />
                            <LeaseCard />
                            <LeaseCard />
                            <LeaseCard />
                            <LeaseCard />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;