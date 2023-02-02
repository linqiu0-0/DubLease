import React from "react";
import MainAppBar from "../components/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LeaseCard from "../components/LeaseCard";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import {Stack} from "@mui/material";
import Button from "@mui/material/Button";
import DropDownSelect from "../components/DropDownSelect";
import FilterDrawer from "../components/FilterDrawer";

const Home = () => {
    return (
        <>
            <MainAppBar />
            <Box marginX={10}>
                <Grid container spacing={2} mt={2}>
                    <Grid xs={6}>
                        map
                    </Grid>
                    <Grid xs={6}>
                        <Typography variant="subtitle1" component="h2">
                            0 Results found
                        </Typography>
                        <Box my={2} sx={{display: "flex"}}>
                            <SearchBar />
                            <FilterDrawer />
                        </Box>
                        <DropDownSelect />
                        <DropDownSelect />
                        <DropDownSelect />
                        <DropDownSelect />
                        <Stack spacing={4}
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