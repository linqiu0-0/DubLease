import React, { useEffect } from "react";

import { Text } from "../../components/Text";
import { Line } from "../../components/Line";
// import { Img } from "../../components/Img";
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { TextField, Button, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import Grid from "@mui/material/Unstable_Grid2";
import { ProfileHeader } from "./ProfileHeader";
import FormControl, { useFormControl } from '@mui/material/FormControl';

const Profile = () => {
    const [userData, setUserData] = React.useState('')
    const [edit, setEdit] = React.useState(false)
    const [phone, setPhone] = React.useState('')
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')

    const userId = window.sessionStorage.getItem("userId")


    const handlePhoneChange = (newValue) => {
        setPhone(newValue)
    }



    const handleSubmit = () => {
        if (!matchIsValidTel(phone)) {
            // eslint-disable-next-line no-undef
            alert("invalid phone number");
        } else {
            setEdit(false)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "id": userId,
                    "email": email,
                    "username": name,
                    "phone": phone
                })
            };
            
            fetch(process.env.REACT_APP_SERVER_URL + "edit_profile", requestOptions)
                .then(checkStatus)
                .then(response => response.json())
                .then(data => {
                    // log user id
                    console.log(data.phone);
                    console.log(data.email);
                    console.log(data.email);

                })
                .catch(handleError);
        }
    }

    useEffect(() => {
        const requestOptions = {
            method: 'Get',
            headers: { 'Content-Type': 'application/json' },
        };

        let queryUrl = "?id=" + userId
        fetch(process.env.REACT_APP_SERVER_URL + "profile" + queryUrl, requestOptions)
            .then(checkStatus)
            .then(response => response.json())
            .then(data => {
                setUserData(data)
            })
            .catch(handleError);
    })

    function handleError(error) {
        console.log(error);
    }

    function checkStatus(response) {
        if (!response.ok) {
            response.text().then(txt => { console.log(txt); });
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }




    return (
        <>
            <div className="bg-gray_50 flex flex-col font-plusjakartasans items-center justify-start mx-[auto] pb-[200px] h-[100%] w-[100%]">
                <div className="flex flex-col gap-[23px] justify-center w-[100%]">
                   <ProfileHeader/>
                    <div className="flex md:flex-col sm:flex-col flex-row md:gap-[40px] sm:gap-[40px] items-start justify-center max-w-[1020px] mx-[auto] md:px-[20px] sm:px-[20px] w-[100%]">
                        <div className="flex flex-col items-start justify-start w-[auto]">
                            <div className="flex flex-col items-center justify-start md:w-[100%] sm:w-[100%] w-[75%]">
                                <div className="flex-col hidden items-start justify-start w-[100%]">
                                    <div className="flex flex-row gap-[21px] items-center justify-start md:w-[100%] sm:w-[100%] w-[38%]">
                                        <Line className="bg-deep_purple_A200 h-[56px] w-[3px]" />
                                        <Text
                                            className="font-bold text-black_900 text-left w-[auto]"
                                            variant="body1"
                                        >
                                            Profile
                                        </Text>
                                    </div>
                                    <Line className="bg-indigo_50 h-[1px] w-[100%]" />
                                </div>
                            </div>
                            <div className="flex-col gap-[16px] hidden justify-start md:w-[100%] sm:w-[100%] w-[75%]">
                                <Text
                                    className="font-medium md:ml-[0] sm:ml-[0] ml-[24px] text-bluegray_800 text-left w-[auto]"
                                    variant="body1"
                                >
                                    My Account
                                </Text>
                                <Line className="bg-indigo_50 h-[1px] w-[100%]" />
                            </div>
                        </div>
                        <div className="bg-white_A700 border border-indigo_50 border-solid flex md:flex-1 sm:flex-1 flex-col gap-[24px] justify-end py-[24px] rounded-radius8 md:w-[100%] sm:w-[100%] w-[auto]">
                            <div className=" ml-[24px] mr-[24px] mt-[14px]">
                                <Grid container spacing={3} mt={1} justifyContent="space-between">
                                    <Grid xs={5}>
                                        <Text
                                            className="font-bold text-black_900 text-left w-[auto]"
                                            variant="body2"
                                        >
                                            Personal Info
                                        </Text>
                                    </Grid>
                                    <Grid xs={2}>
                                        <Button
                                            className="flex h-[40px] items-right justify-end min-w-[] w-[40px]"
                                            shape="icbRoundedBorder8"
                                            size="mdIcn"
                                            variant="icbFillGray50"
                                            onClick={() => { setEdit(true); }}
                                        >
                                            <Text
                                                className="font-bold text-black_900 text-left w-[auto]"
                                                variant="body4"
                                            > Edit </Text>

                                            <EditIcon />
                                        </Button>
                                    </Grid>
                                </Grid>

                                <div className="flex flex-col gap-[16px] items-start justify-start w-[auto]">

                                    {/* <Text className="text-black_900 font-bold text-left w-[auto]" variant="body3">
                                        Avatar
                                    </Text> */}
                                    {/* <div className="flex flex-row gap-[24px] items-center justify-between w-[100%]"> */}
                                    {/* <Img
                                            src="images/img_changeprofilepic.svg"
                                            className="h-[100px] w-[100px]"
                                            alt="user"
                                        /> */}
                                    {/* <div className="flex flex-row gap-[16px] items-center justify-start w-[auto]">
                                            <Button
                                                className="cursor-pointer font-bold min-w-[105px] text-[16px] text-center text-white_A700 w-[auto]"
                                                shape="RoundedBorder8"
                                                size="2xl"
                                                variant="contained"
                                                color="secondary"
                                            >
                                                Upload
                                            </Button>
                                            <Button
                                                className="cursor-pointer font-bold min-w-[112px] text-[16px] text-center text-deep_purple_A200 w-[auto]"
                                                shape="RoundedBorder8"
                                                size="2xl"
                                                variant="OutlineIndigo50"
                                            >
                                                Remove
                                            </Button>
                                        </div> */}
                                    {/* </div> */}
                                </div>
                            </div>
                            <Line className="bg-deep_purple_50 h-[1px] w-[100%]" />
                            <div className="flex flex-col items-center justify-start  ml-[24px] mr-[24px] ">
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <div className="flex sm:flex-col flex-row gap-[24px] items-start justify-between  sm:w-[100%] w-[580px]">
                                    <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[270px]">
                                        <Text
                                            className="font-medium text-black_900 text-left w-[auto]"
                                            variant="body3"
                                        >
                                            <Text className="text-black_900 text-[14px] font-plusjakartasans">
                                                Display Name{" "}
                                            </Text>
                                            <span className="text-bluegray_300 text-[14px] font-plusjakartasans">
                                                (Visible to others)
                                            </span>
                                        </Text>
                                        <TextField
                                            className="font-medium p-[0] text-[16px] placeholder:text-black_900 text-black_900 text-left w-[100%]"
                                            wrapClassName="w-[100%]"
                                            name="Frame"
                                            placeholder={userData.username}
                                            shape="RoundedBorder8"
                                            disabled={!edit}
                                            onChange={(e) => { setName(e.target.value) }}
                                        ></TextField>
                                    </div>
                                    <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start w-[270px]">
                                        <Text
                                            className="font-medium text-black_900 text-left w-[auto]"
                                            variant="body3"
                                        >
                                            <span className="text-black_900 text-[14px] font-plusjakartasans">
                                                Name{" "}
                                            </span>
                                            <span className="text-bluegray_300 text-[14px] font-plusjakartasans">
                                                (Your given name)
                                            </span>
                                        </Text>
                                        <TextField
                                            className="font-medium p-[0] text-[16px] placeholder:text-black_900 text-black_900 text-left w-[100%]"
                                            wrapClassName="w-[100%]"
                                            name="Frame One"
                                            placeholder={userData.username}
                                            shape="RoundedBorder8"
                                        ></TextField>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-start justify-start mt-[24px] sm:w-[100%] w-[580px]">
                                    <Text className="text-black_900 text-[14px] font-plusjakartasans">
                                        Phone Number
                                    </Text>
                                    {!edit && <MuiTelInput className="sm:w-[100%] w-[580px]" defaultCountry="US" value={userData.phone} disabled />}
                                    {edit && <MuiTelInput className="sm:w-[100%] w-[580px]" defaultCountry="US" value={phone} onChange={handlePhoneChange} />}
                                </div>
                                <div className="flex flex-col gap-[8px] h-[120px] md:h-[auto] sm:h-[auto] items-start justify-start mt-[24px] sm:w-[100%] w-[580px]">
                                    <Text className="text-black_900 text-[14px] font-plusjakartasans">
                                        Email
                                    </Text>
                                    <TextField
                                        className="font-medium p-[0] text-[16px] placeholder:text-black_900 text-black_900 text-left w-[100%]"
                                        wrapClassName="w-[100%]"
                                        name="Frame One"
                                        type="email"
                                        placeholder={userData.email}
                                        shape="RoundedBorder8"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        disabled={!edit}

                                    ></TextField>
                                    {edit && <Text className="text-black_900 text-[14px] font-plusjakartasans">
                                        * Edit this wouldn't change the login email address. This is only used for contact.
                                    </Text> }                               
                                    </div>
                                {edit && <div className="flex flex-col gap-[8px] h-[76px] md:h-[auto] sm:h-[auto] items-center justify-center mt-[24px] sm:w-[100%] w-[580px]">
                                    <Button
                                        className="cursor-pointer font-bold text-[16px] text-center text-white_A700 w-[352px] bg-deep_purple_A200_75 text-white_A700"
                                        shape="RoundedBorder8"
                                        size="3xl"
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => { setEdit(false) }}
                                    >
                                        Dicard Changes
                                    </Button>
                                    <Button
                                        className="cursor-pointer font-bold text-[16px] text-center text-white_A700 w-[352px] bg-deep_purple_A200_75 text-white_A700"
                                        shape="RoundedBorder8"
                                        size="3xl"
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                    >
                                        Save changes
                                    </Button>
                                </div>}
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export { Profile };