import * as React from 'react';
import { useEffect } from "react";
import { Paper } from "@mui/material";
import { Box } from '@mui/material';
import { Text } from "../Text";
import { Img } from "../Img";
import { Line } from "../Line";
import { StatusButton } from "./StatusButton";
import { CardDropDown } from './CardDropDown';
import PropTypes from 'prop-types';
import ImagePlaceHolder from "../../assets/images/PlaceHolderImage.png";


function LeaseCardVertical({ leaseCardData, setReloading }) {

    const [image, setImage] = React.useState([]);

    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    };
    const fetchImage = async (imageKey) => {
        if (imageKey == null) {
            setImage(ImagePlaceHolder);
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
                style={{ objectFit: "cover", width: "100%", aspectRatio: "7 / 4" }}
                alt={leaseCardData.name + " cover image"}
            />
            <Box sx={{
                m:2,
                mr:0
            }} >
            <div className="flex flex-row  items-end justify-between w-[100%]">
                <div className='basis-4/6'>
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
                </div>
                {leaseCardData.status ? <StatusButton
                    className=" basis-1/6 font-bold min-w-[100px] text-[14px] text-center text-green_600 w-[auto]"
                    variant={'FillGreen50'}
                >
                    AVAILABLE
                </StatusButton> :
                    <StatusButton
                        className="basis-1/6 font-bold min-w-[85px] text-[14px] text-center text-orange_400 w-[auto]"
                        variant={'FillOrange50'}
                    >
                        ARCHIVED
                    </StatusButton>}
                <CardDropDown className=" basis-1/6 justify-self-end"
                    post_id={leaseCardData.post_id} lease_status={leaseCardData.status} setReloading={setReloading} />
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
                        {leaseCardData.bedNum === "0" ?
                            "Studio" :
                            leaseCardData.bedNum === "1" ? leaseCardData.bedNum + " Bed" :
                                leaseCardData.bedNum + " Beds"}
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
                        {leaseCardData.bathNum} {leaseCardData.bathNum === "1" ? "Bath" : "Baths"}
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


LeaseCardVertical.propTypes = {
    leaseCardData: PropTypes.object.isRequired,
    setReloading: PropTypes.func.isRequired
};