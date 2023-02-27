import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Paper, SvgIcon } from "@mui/material";
import { Grid, Box, Button, IconButton } from '@mui/material';
import { Text } from "../Text";
import { Img } from "../Img";
import { Line } from "../Line";
import { StatusButton } from "./StatusButton";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from '@mui/icons-material/MoreVert';


function LeaseCardVertical({ leaseCardData }) {

    const navigate = useNavigate();

    const browseSubleaseDeatail = (event) => {
        console.log(leaseCardData);
        navigate("/sublease/" + leaseCardData.post_id, {});
    }


    return (
        <Paper variant="outlined" onClick={browseSubleaseDeatail}>
            {/* <div className="h-[424px] w-[410px] md:h-[96px] sm:h-[96px] relative w-[100%]"></div> */}
            <Img
                src="images/img_image.png"
                className="h-[auto] w-[auto]"
                alt="Image One"
            />

            <Box sx={{
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                flexWrap: 'wrap',
                p: 1,
                m: 1
            }} >
                <div className="flex flex-row gap-[10px] items-end justify-start w-[95%]">
                    <Text
                        className="font-extrabold text-deep_purple_A200 text-left tracking-[-1.00px] w-[auto]"
                        as="body2"
                        variant="body2"
                    >
                        $2,095
                    </Text>
                    <Text
                        className="text-black_900_87 text-left w-[auto]"
                        as="body6"
                        variant="body6"
                    >
                        /month
                    </Text>
                    <StatusButton
                        className="cursor-pointer font-bold min-w-[74px] ml-[115px] text-[14px] text-center text-green_600 w-[auto]"
                        variant={'FillGreen50'}
                    >
                        ACTIVE
                    </StatusButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="flex flex-col gap-[8px] items-start justify-start mt-[4px] w-[auto]">
                    <Text
                        className="font-bold text-black_900 text-left tracking-[-0.24px] w-[auto]"
                        as="body2"
                        variant="body2"
                    >
                        Palm Harbor
                    </Text>
                    <Text
                        className="font-normal text-black_900_87 text-left w-[auto]"
                        as="body6"
                        variant="body6"
                    >
                        2699 Green Valley, Highland Lake, FL
                    </Text>
                </div>
                <Line className="bg-deep_purple_50 h-[1px] mt-[16px] w-[98%]" />
                <div className="flex flex-row gap-[16px] items-start justify-start mt-[14px] w-[auto]">
                    <div className="flex flex-row gap-[8px] items-center justify-center w-[auto]">
                        <Img
                            src="images/img_laptop.svg"
                            className="h-[20px] w-[20px]"
                            alt="laptop"
                        />
                        <Text
                            className="text-gray_600 text-left w-[auto]"
                            as="body6"
                            variant="body6"
                        >
                            3 Beds
                        </Text>
                    </div>
                    <div className="flex flex-row gap-[8px] items-start justify-start w-[auto]">
                        <Img
                            src="images/img_lock.svg"
                            className="h-[20px] w-[20px]"
                            alt="lock"
                        />
                        <Text
                            className="text-gray_600 text-left w-[auto]"
                            as="body6"
                            variant="body6"
                        >
                            2 Bathrooms
                        </Text>
                    </div>
                    <div className="flex flex-row gap-[8px] items-center justify-center w-[auto]">
                        <Img
                            src="images/img_mail.svg"
                            className="h-[20px] w-[20px]"
                            alt="mail"
                        />
                        <Text
                            className="text-gray_600 text-left w-[auto]"
                            as="body6"
                            variant="body6"
                        >
                            5x7 m²
                        </Text>
                    </div>
                </div>
            </Box>
        </Paper>
    );
}

export { LeaseCardVertical };