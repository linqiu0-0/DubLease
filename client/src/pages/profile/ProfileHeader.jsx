import React from "react";

import { AccountMenu } from "../../components/AccountMenu";
import { Button, Grid } from "@mui/material";
import { ReactComponent as Logo } from '../../assets/images/DubLeaseLogo.svg';
import { Text } from "../../components/Text";
import { Line } from "../../components/Line";
import { Img } from "../../components/Img";
import { useNavigate } from "react-router-dom";



const ProfileHeader = () => {
    const navigate = useNavigate();
    const username = window.sessionStorage.getItem("username")
    const userId = window.sessionStorage.getItem("userId")

    return (
        <div className="h-[180px] md:h-[96px] sm:h-[96px] relative w-[100%]">
            <header className="flex items-center justify-center mb-[-1.5px] mx-[auto] w-[100%] z-[1]">
                <div className="flex flex-1 flex-col items-center justify-center w-[100%]">
                    <div className="bg-white_A700 flex flex-row items-center justify-center p-[20px] w-[100%]">
                        <Grid container >
                            <Grid item xs={8} container justifyContent="flex-start" alignItems="center">

                                <Button
                                    className="flex h-[48px] items-center justify-center min-w-[50px] w-[48px]"
                                    shape="icbRoundedBorder8"
                                    size="smIcn"
                                    variant="icbFillDeeppurpleA200"
                                    href="/DubLease"
                                >
                                    <Logo />
                                </Button>
                                <Text
                                    className="font-bold mb-[2px] mt-[8px] text-indigo_900 text-left"
                                    variant="body2"
                                >
                                    My Profile
                                </Text>
                            </Grid>
                            <Grid item xs={4}>
                                <ul className="flex flex-row gap-[10px] sm:hidden items-center justify-right md:ml-[0] ml-[70%] common-row-list common-row-list">
                                    <li className="w-[40px] my-[4px]">
                                        <Button
                                            className="flex h-[40px] items-center justify-center min-w-[] w-[40px]"
                                            shape="icbRoundedBorder8"
                                            size="mdIcn"
                                            variant="icbFillGray50"
                                        >
                                            <Img
                                                src="images/img_notification_black_901.svg"
                                                className="h-[24px]"
                                                alt="notification"
                                            />
                                        </Button>
                                    </li>
                                    <li className="sm:w-[100%] sm:my-[10px] w-[1%] my-[4px]">
                                    </li>
                                    <li className="sm:w-[100%] sm:my-[10px] w-[1%] my-[4px]">
                                        <Line className="bg-black_900_63 h-[40px] w-[1px]" />
                                    </li>
                                    <li className="w-[40px] my-[4px]">
                                        <AccountMenu username={username} userId={userId} />
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>

                    </div>
                    <Line className="bg-deep_purple_50 h-[1.5px] w-[100%]" />
                </div>
            </header>
            <Line className="bg-deep_purple_50 h-[1.5px] w-[100%]" />
            <div className="flex flex-col items-center justify-start mt-[auto] mx-[auto] w-[100%]">
                <div className="bg-white_A700 flex flex-col items-start justify-start p-[24px] sm:px-[20px] w-[100%]">
                    <div className="flex flex-row gap-[16px] items-center justify-start md:ml-[0] sm:ml-[0] ml-[24px] w-[auto]">
                        <Img
                            src="images/img_arrowleft_gray_600.svg"
                            className="common-pointer h-[20px] w-[20px]"
                            onClick={() =>
                                navigate('/')}
                            alt="arrowleft"
                        />
                        <Text
                            className="font-bold text-gray_600 text-left w-[auto]"
                            variant="body4"
                        >
                            Back to Dashboard
                        </Text>
                    </div>
                </div>
                <Line className="bg-deep_purple_50 h-[1px] w-[100%]" />
            </div>
        </div>
    )
}

export { ProfileHeader }