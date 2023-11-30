import '../css/Banner.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

// Import Swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import PropTypes from "prop-types";

function Banner({ data }) {

    const posterBaseUrl = 'https://image.tmdb.org/t/p/w1280/'
    const upNextBaseUrl = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
    const language = useSelector((state) => state.languageToggle.value.language);
    const [currPoster, setCurrPoster] = useState(0);
    let upNextArray = [1, 2, 3];

    const handleSlideChange = (swiper) => {
        setCurrPoster(swiper.realIndex);
    };

    // TODO: Apply styling here
    if (!data) return <h1>LOADING ....................</h1>

    return (
        <div className="banner_container">
            <div className="banner_wrapper">
                < div className="poster_carousel" >
                    <Swiper
                        slidesPerView={1}
                        navigation
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                        }}
                        speed={300}
                        loop={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        onSlideChange={handleSlideChange}
                    >
                        {
                            data.map((movie, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className='poster_slide'
                                    >
                                        <div className="big_image">
                                            <img src={posterBaseUrl + movie.backdrop_path} alt="IMAGE" />
                                        </div>
                                        <div className="poster_details">
                                            <div className="poster_deitals_shadow"></div>
                                            <div className="small_image">
                                                <img src={posterBaseUrl + movie.poster_path} alt="IMAGE" />
                                            </div>
                                            <div className="poster_movie_description">
                                                <h1>MOVIE NAME</h1>
                                                <span>Movie narrative</span>
                                            </div>
                                        </div>
                                        <div className="gradient_bg"></div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                </ div>
                <div className="up_next">
                    <span className='up_next_title'>
                        {
                            language === "en-US" ? 'Up next' : 'A seguir'
                        }
                    </span>
                    <div className="up_next_content">
                        {upNextArray.map((index) => {
                            let card = currPoster + index;
                            card == data.length ? card = 0 : card == data.length + 1 ? card = 1 : card == data.length + 2 ? card = 2 : card;
                            return (
                                <div className="up_next_card border" key={index}>
                                    <div className="up_next_poster">
                                        {
                                            data.length > 0 &&
                                            <img src={`${upNextBaseUrl}${data[card]?.poster_path}`} alt="" />
                                        }
                                    </div>
                                    <div className="up_next_card_details">
                                        <div className="up_next_card_title">{data[card]?.title}</div>
                                        <div className="up_next_card_date">{data[card]?.release_date}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Banner;

Banner.propTypes = {
    data: PropTypes.array
}
