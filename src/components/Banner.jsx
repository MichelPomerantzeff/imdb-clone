import '../css/Banner.css';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

// Import Swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import PropTypes from "prop-types";
import { Divider } from '@mui/material';
import LoadingWheel from './LoadingWheel';
import ErrorAlert from './ErrorAlert';
import YoutubePlayer from './YoutubePlayer';

function Banner({ data, isLoading, isError, trailer, selectMovie }) {

    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w1280/'
    const UP_NEXT_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
    const language = useSelector((state) => state.languageToggle.value.language);
    const [currPoster, setCurrPoster] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    let upNextArray = [1, 2, 3];
    const swiperRef = useRef(null);

    const handleSlideChange = (swiper) => {
        setCurrPoster(swiper.realIndex);
    };

    const handlePlay = (movie) => {
        selectMovie(movie);
        setIsPlaying(true);
    }

    const handleMouseOver = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop();
        }
    };
    
    const handleMouseOut = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
        }
    };

    if (isLoading) return <LoadingWheel />

    return (
        <div className="banner_container">
            {!isError ?
                <div className="banner_wrapper">
                    <div className="poster_carousel"
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        {isPlaying ?
                            <YoutubePlayer
                                trailerKey={trailer.key}
                                setIsPlaying={setIsPlaying}
                            />
                            :
                            <Swiper
                                ref={swiperRef}
                                slidesPerView={1}
                                navigation={true}
                                autoplay={{
                                    delay: 4000,
                                }}
                                speed={500}
                                loop={true}
                                modules={[Autoplay, Pagination, Navigation]}
                                onSlideChange={handleSlideChange}
                            >
                                {data.map((movie, index) => {
                                    return (
                                        <SwiperSlide
                                            key={index}
                                            className='poster_slide'
                                            onClick={() => handlePlay(movie)}
                                        >
                                            <div className="big_image">
                                                <img src={POSTER_BASE_URL + movie.backdrop_path} alt="IMAGE" />
                                            </div>
                                            <div className="poster_details">
                                                <div className="poster_deitals_shadow"></div>
                                                <div className="small_image">
                                                    <img src={POSTER_BASE_URL + movie.poster_path} alt="IMAGE" />
                                                </div>
                                                <div className="poster_movie_description_wrapper">
                                                    <div className="banner_play_btn">
                                                        <PlayArrowRoundedIcon className='play_icon' />
                                                    </div>
                                                    <div className="poster_movie_description">
                                                        <h1>{movie.title}</h1>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="gradient_bg"></div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        }
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
                                card == data?.length ? card = 0 : card == data?.length + 1 ? card = 1 : card == data?.length + 2 ? card = 2 : card;
                                return (
                                    <div key={index}>
                                        <div onClick={() => handlePlay(data && data[card])} className="up_next_card">
                                            <div className="up_next_poster">
                                                {
                                                    data?.length > 0 &&
                                                    <img src={`${UP_NEXT_BASE_URL}${data && data[card]?.poster_path}`} alt="" />
                                                }
                                            </div>
                                            <div className="up_next_card_details">
                                                <div className={`up_next_play_btn ${isPlaying ? "play_btn_disabled" : "play_btn_active"}`}>
                                                    <PlayArrowRoundedIcon />
                                                </div>
                                                <h1 className="up_next_card_title">{data && data[card]?.title}</h1>
                                                <span className="up_next_card_date">{data && data[card]?.release_date}</span>
                                            </div>
                                        </div>
                                        {index < 3 && <Divider sx={{ background: "#313131" }} />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                :
                <ErrorAlert />
            }
        </div >
    );
}

export default Banner;

Banner.propTypes = {
    data: PropTypes.array,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    trailer: PropTypes.object,
    selectMovie: PropTypes.func,
}
