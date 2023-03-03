import React, { useEffect } from "react";
import {  Grid, Box} from "@mui/material";
import { ListingHeader } from "./ListingHeader";
import { LeaseCardVertical } from "../../components/LeaseCardVertical/LeaseCardVertical";
import { Text } from "../../components/Text";

const Listings = () => {
  const [leaseData, setLeaseData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [reloading, setReloading] = React.useState(false);

  const getLeaseData = () => {
    let queryUrl = "?id=" + window.sessionStorage.getItem("userId") ;
    let headers = {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    };

    fetch(process.env.REACT_APP_SERVER_URL + "list" + queryUrl,
      { headers })
      .then(async response => {
        const data = await response.json();
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setLeaseData(data);
        setLoading(false)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }

  useEffect(() => {
    getLeaseData();
    setReloading(false);
    console.log("road all result")
  }, [reloading]);


  return (
    <>
      <div className="bg-gray_50 flex flex-col font-plusjakartasans items-center justify-start mx-[auto] pb-[150px] h-[100%] w-[100%]">
        <div className="flex flex-col gap-[10px] justify-center w-[100%]">
          <ListingHeader />
          <div className="flex flex-col items-center justify-center mt-[40px] md:w-[100%] w-[100%]">
            {/* <Paper className="flex flex-col items-center justify-center mt-[40px] md:w-[100%] w-[85%]" variant="outlined">
              <Box sx={{
                width: '100%',
                p: 1,
                ml: 1
              }} >
                <Grid container >
                  <Grid item xs={8} container justifyContent="flex-start" alignItems="center">

                    <Text
                      className="font-bold text-indigo_900 text-left tracking-[-0.09px] w-[auto]"
                      as="body1"
                      variant="body1"
                    >
                      My Listings
                    </Text>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Listing Status</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selected}
                        label="Listing Status"
                        onChange={(e) => { setSelected(e.target.value) }}
                      >
                        <MenuItem value={10}>Show All</MenuItem>
                        <MenuItem val ue = {20}>Only Archive Listings< /MenuItem>
                        <MenuItem value={30}>Only Active Listings</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Paper> */}
            <Box sx={{
              width: '85%',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              p: 1,
              m: 1
            }} >
              {!loading && (leaseData.length != 0 ?
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                  {leaseData.map((singleLease) => (
                    <Grid item xs={4} key={singleLease.post_id}>
                      <LeaseCardVertical key={singleLease.post_id} leaseCardData={singleLease} setReloading={setReloading} />
                    </Grid>
                  ))}
                </Grid> :
                <Text
                  className="font-bold text-indigo_900 text-left tracking-[-0.09px] w-[auto]"
                  variant="body3"
                >
                  You have not posted any properties yet.
                </Text>)}
            </Box>
          </div>
        </div >
      </div >
    </>

  ); 
}; 
  
export { Listings }