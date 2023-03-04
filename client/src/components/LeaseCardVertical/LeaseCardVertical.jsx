import * as React from 'react';
import { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import { Box } from '@mui/material';
import { Text } from "../Text";
import { Img } from "../Img";
import { Line } from "../Line";
import { StatusButton } from "./StatusButton";
import { CardDropDown } from './CardDropDown';


function LeaseCardVertical({ leaseCardData, setReloading }) {

    const [image, setImage] = React.useState([]);

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    };
    const fetchImage = async (imageKey) => {
        console.log(imageKey);
        if (imageKey == null) {
            return;
        }
        try {
            let response = await fetch(process.env.REACT_APP_SERVER_URL + "get_image?key=" + imageKey,
                { headers })
            let data = await response.json();
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            let imageBytes = data.Body.data;
            imageBytes = _arrayBufferToBase64(imageBytes);
            let imageUrl = "data:image/png;base64," + imageBytes;
            setImage(imageUrl);
            console.log(image);
        } catch (e) {
            console.log(e);
        }
    };

    const _arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    useEffect(() => {
        fetchImage(leaseCardData.image_keys[0]);
    }, []);

    return (
        <Paper variant="outlined">
                <Img
                    src={image}
                    style ={{objectFit: "cover", width:"100%",aspectRatio: "7 / 4"}}
                    // className="h-[100%] w-[100%] objectFit-cover"
                    alt={leaseCardData.name + " cover image"}
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
                            variant="body2"
                        >
                            ${leaseCardData.price}
                        </Text>
                        <Text
                            className="text-black_900_87 text-left w-[auto]"
                            variant="body6"
                        >
                            /month
                        </Text>
                        {leaseCardData.status ? <StatusButton
                            className="cursor-pointer font-bold min-w-[100px] ml-[95px] text-[14px] text-center text-green_600 w-[auto]"
                            variant={'FillGreen50'}
                        >
                            AVAILABLE
                        </StatusButton> :
                            <StatusButton
                                className="cursor-pointer font-bold min-w-[85px] ml-[110px] text-[14px] text-center text-orange_400 w-[auto]"
                                variant={'FillOrange50'}
                            >
                                ARCHIVED
                            </StatusButton>}
                        <CardDropDown post_id={leaseCardData.post_id} lease_status={leaseCardData.status} setReloading={setReloading}/>
                    </div>
                    <div className="flex flex-col gap-[8px] items-start justify-start mt-[4px] w-[auto]">
                        <Text
                            className="font-bold text-black_900 text-left tracking-[-0.24px] w-[auto]"
                            variant="body2"
                        >
                            {leaseCardData.name}
                        </Text>
                        <Text
                            className="font-normal text-black_900_87 text-left w-[auto]"
                            variant="body6"
                        >
                            {leaseCardData.address}
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
                                variant="body6"
                            >
                                {leaseCardData.bedNum == "studio"? "Studio": leaseCardData.bedNum + " Beds"} 
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
                                variant="body6"
                            >
                                {leaseCardData.bedNum == "studio"? "1 Bathroom": leaseCardData.bedNum + " Beds"} 
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
                                variant="body6"
                            >
                                {leaseCardData.space} sqft
                            </Text>
                        </div>
                    </div>
                </Box>
        </Paper>
    );
}

export { LeaseCardVertical };