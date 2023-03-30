import * as React from 'react';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import PropTypes from 'prop-types';
import ImagePlaceHolder from "../assets/images/PlaceHolderImage.png";
import {useQueries} from 'react-query';
import {Skeleton} from "@mui/material";

export default function ImagesCarousel({ image_keys }) {

    const fetchImage = async (imageKey) => {
        let query = process.env.REACT_APP_SERVER_URL + "get_image?key=" + imageKey;
        try {
            let response = await fetch(query);
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = response.statusText;
                throw new Error(error);
            }
            let data = await response.json();
            let imageBytes = data.Body.data;
            let blob = new Blob([new Uint8Array(imageBytes)],{type:'image/png'});
            let file = new File([blob],imageKey);
            let imageUrl = URL.createObjectURL(file);
            // images.push({ src: imageUrl }); // have to use push since multiple images may change state at the same time
            // console.log(images);
            return imageUrl;
        } catch (error) {
            console.error('There was an error!', error);
            throw new Error("Image " + error.message);
        }
    };

    const userQueries = useQueries(
        image_keys.map(image_key => {
            return {
                queryKey: ['subleaseImage', image_key],
                queryFn: () => fetchImage(image_key),
            }
        })
    )
    if (userQueries === []) {
        userQueries.push({isLoadging: false, data: ImagePlaceHolder});
    }
    console.log(userQueries);

    return (
        <Carousel showThumbs={false} >
            {
                (image_keys.length === 0) ?
                <Box sx={{height: 650, width: "auto"}}>
                    <img
                        src={ImagePlaceHolder}
                        srcSet={ImagePlaceHolder}
                        alt={"sublease detail pic"}
                        className={"sublease_info_img"}
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                    />
                </Box>
                :
                userQueries.map((item, index) => (
                    (item.isLoading) ?
                    <Box key={index} sx={{height: 650 }}>
                        <Skeleton animation="wave" variant="rectangular" height={650}/>
                    </Box>
                    :
                    <Box key={index} sx={{height: 650, width: "auto"}}>
                        <img
                            src={item.data}
                            srcSet={item.data}
                            alt={"sublease detail pic"}
                            className={"sublease_info_img"}
                            loading="lazy"
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                ))
            }
        </Carousel>
    );
}

ImagesCarousel.propTypes = {
    image_keys: PropTypes.array,
};
