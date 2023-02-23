import * as React from 'react';
import Box from '@mui/material/Box';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ImagesCarousel() {
    return (
        <Carousel showThumbs={false} infiniteLoop={true}>
            {itemData.map((item) => (
                <Box key={item.img} sx={{height: 550}}>
                    <img
                        src={`${item.img}`}
                        srcSet={`${item.img}`}
                        alt={item.title}
                        className={"sublease_info_img"}
                        loading="lazy"
                    />
                </Box>
            ))}
        </Carousel>
        // <Box sx={{width: 600, height: 450, overflowY: 'scroll' , ml: 2}}>
        //     <ImageList variant="masonry" cols={2} gap={8}>
        //         {itemData.map((item) => (
        //             <ImageListItem key={item.img}>
        //                 <img
        //                     src={`${item.img}`}
        //                     srcSet={`${item.img}`}
        //                     alt={item.title}
        //                     loading="lazy"
        //                 />
        //             </ImageListItem>
        //         ))}
        //     </ImageList>
        // </Box>
    );
}

const itemData = [
    {
        img: 'https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg',
        title: 'asdf',
    },
    {
        img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
        title: 'Bed',
    },
    {
        img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
        title: 'Books',
    },
    {
        img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
        title: 'Sink',
    },
    {
        img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
        title: 'Kitchen',
    },
    {
        img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
        title: 'Blinds',
    },
    {
        img:'https://hips.hearstapps.com/hmg-prod/images/edc100122couturier-005-1662561799.jpg?resize=1200:*',
        title: 'asdfasdfasdf',
    },
    {
        img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
        title: 'Chairs',
    },
    {
        img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
        title: 'Laptop',
    },
    {
        img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
        title: 'Doors',
    },
    {
        img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
        title: 'Storage',
    },
    {
        img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
        title: 'Candle',
    },
    {
        img: 'https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg',
        title: 'Coffee table',
    },
    {
        img: 'https://images1.apartments.com/i2/WCQqdTdOx7whsIN4SXA0qt-msh5dw_VGIju9PzqlhX4/111/hub-u-district-seattle-seattle-wa-primary-photo.jpg',
        title: 'haha',
    }
];
