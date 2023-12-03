import '../css/Banner.css';
import { useState } from 'react';
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
import YouTube from 'react-youtube';
import { Divider } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useEventListener from '../hooks/useEventListener';

function Banner({ data, trailer, selectMovie }) {

    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w1280/'
    const UP_NEXT_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face/'
    const language = useSelector((state) => state.languageToggle.value.language);
    const [currPoster, setCurrPoster] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    let upNextArray = [1, 2, 3];
    let closeTimeout;

    const handleSlideChange = (swiper) => {
        setCurrPoster(swiper.realIndex);
    };

    const handlePlay = (movie) => {
        selectMovie(movie);
        setIsPlaying(true);
    }

    const handleVideoEnd = () => {
        closeTimeout = setTimeout(() => {
            closeTrailer();
        }, 5000)
    }

    const handleVideoPlay = () => {
        clearTimeout(closeTimeout);
    }

    const closeTrailer = () => {
        setIsPlaying(false)
    }

    const handleKeyEvent = e => {
        if (e.key === "Escape") {
            closeTrailer()
        }
    }

    useEventListener("keydown", handleKeyEvent)

    // TODO: Apply styling here
    if (!data) return <h1 style={{ color: "white", fontSize: "5rem" }}>LOADING ....................</h1>

    return (
        <div className="banner_container">
            <div className="banner_wrapper">
                < div className="poster_carousel" >

                    {isPlaying ?
                        <div className="trailer_container">
                            <YouTube
                                className={'trailer_wrapper'}
                                videoId={trailer.key}
                                onPlay={handleVideoPlay}
                                onEnd={handleVideoEnd}
                                opts={{
                                    width: "100%",
                                    height: "100%",
                                    playerVars: {
                                        autoplay: 1,
                                        controls: 1,
                                        fs: 1,
                                        cc_load_policy: 0,
                                    }
                                }}
                            />
                            <div className="close_trailer">
                                <CloseRoundedIcon onClick={closeTrailer} className='close_button' />
                            </div>
                        </div>
                        :
                        <Swiper
                            slidesPerView={1}
                            navigation={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: true,
                            }}
                            speed={300}
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
                            card == data.length ? card = 0 : card == data.length + 1 ? card = 1 : card == data.length + 2 ? card = 2 : card;
                            return (
                                <div key={index}>
                                    <div className="up_next_card">
                                        <div className="up_next_poster">
                                            {
                                                data.length > 0 &&
                                                <img src={`${UP_NEXT_BASE_URL}${data[card]?.poster_path}`} alt="" />
                                            }
                                        </div>
                                        <div className="up_next_card_details">
                                            <div onClick={() => handlePlay(data[card])} className={`up_next_play_btn ${isPlaying && "up_next_btn_disabled"}`}>
                                                <PlayArrowRoundedIcon />
                                            </div>
                                            <h1 className="up_next_card_title">{data[card]?.title}</h1>
                                            <span className="up_next_card_date">{data[card]?.release_date}</span>
                                        </div>
                                    </div>
                                    {index < 3 && <Divider sx={{ background: "#313131" }} />}
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
    data: PropTypes.array,
    trailer: PropTypes.object,
    selectMovie: PropTypes.func
}
