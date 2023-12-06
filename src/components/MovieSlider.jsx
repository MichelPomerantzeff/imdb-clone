import MovieCard from "./MovieCard";
import '../css/MovieSlider.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useGetData from "../hooks/useGetData";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

// Import Swiper
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useQuery } from "@tanstack/react-query";
import { getData } from "../apis/fetchData";
import LoadingWheel from "./LoadingWheel";
import ErrorAlert from "./ErrorAlert";

function MovieSlider({ type, query, title, queryKey }) {

    const language = useSelector((state) => state.languageToggle.value.language);

    let disabled = false

    const { data, isLoading, isError } = useQuery({
        queryKey: ["sliderData", queryKey, language],
        queryFn: () => getData(type, query, language, 1),
    })

    // Costum hooks (fetch data from database)
    const { user, watchlistData, getWatchlistData, watchedData } = useGetData()

    // Add Movie to Watchlist
    async function addToWatchlist(data, type) {
        if (user) {
            try {
                await setDoc(doc(db, "users", user.email, "watchlist", data.title || data.name),
                    { ...data, type, movieId: data.id }
                );
            } catch (error) {
                console.log("Error adding document to watchlist:", error)
            }
            getWatchlistData()
        } else {
            alert("Sign in and start adding movies to your wathlist")
        }
    }

    if (isLoading) return <LoadingWheel />

    return (
        <>
            {!isError ?
                <div className="movie_slider_container">
                    <h1 className="movie_slider_category">{title}</h1>
                    <div className="movie_slider_wrapper">
                        <Swiper
                            style={{ padding: "0 13px" }}
                            modules={[Navigation, Pagination]}
                            navigation
                            breakpoints={{
                                1200: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 20 },
                                980: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
                                680: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 15 },
                                480: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10 },
                                200: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
                            }}
                        >
                            {
                                data?.map((movieCardData, index) => {
                                    let movieId = movieCardData.id

                                    // Check if movie is on watchlist/watched
                                    const isOnWatchlist = watchlistData.find(movie => movieId === movie.movieId)
                                    const isOnWatched = watchedData.find(movie => movieId === movie.movieId)

                                    isOnWatchlist || isOnWatched ? disabled = true : disabled = false

                                    return (
                                        <SwiperSlide
                                            key={index}
                                            className='slider_movie'
                                        >

                                            <MovieCard type={type} data={movieCardData} />

                                            <div className='buttons'>
                                                <button
                                                    onClick={(() => { addToWatchlist(movieCardData, type) })}
                                                    className="add_movie_button"
                                                    disabled={disabled}
                                                    style={{
                                                        background: `${disabled && '#7472721d'}`,
                                                        color: `${disabled && 'var(--second-color)'}`,
                                                        pointerEvents: `${disabled && 'none'}`,

                                                    }}
                                                >
                                                    <div>
                                                        {
                                                            disabled ?
                                                                <DoneRoundedIcon />
                                                                :
                                                                <>
                                                                    <AddRoundedIcon />
                                                                    {language === "en-US" ? 'Watchlist' : 'Assistir'}
                                                                </>
                                                        }
                                                    </div>
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>

                    </div>

                </div >
                :
                <ErrorAlert />

            }
        </>
    );
}

export default MovieSlider;

MovieSlider.propTypes = {
    type: PropTypes.string,
    query: PropTypes.string,
    title: PropTypes.string,
    queryKey: PropTypes.string
}
