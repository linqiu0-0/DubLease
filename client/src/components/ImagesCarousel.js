import * as React from 'react';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImagesCarousel({images}) {
    console.log(images);

    return (
        <Carousel showThumbs={false}>
            {images.map((item) => (
                <Box key={item.src} sx={{height: 550}}>
                    <img
                        src={item.src}
                        srcSet={item.src}
                        alt={"haha,sb"}
                        className={"sublease_info_img"}
                        loading="lazy"
                    />
                </Box>
            ))}
        </Carousel>
    );
}

