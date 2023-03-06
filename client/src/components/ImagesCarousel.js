import * as React from 'react';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImagesCarousel({images}) {

    return (
        <Carousel showThumbs={false} >

            {images.map((item) => (
                <Box key={item.src} sx={{height: 650, width: "auto"}}>
                    <img
                        src={item.src}
                        srcSet={item.src}
                        alt={"sublease detail pic"}
                        className={"sublease_info_img"}
                        loading="lazy"
                    />
                </Box>
            ))}
        </Carousel>
    );
}

