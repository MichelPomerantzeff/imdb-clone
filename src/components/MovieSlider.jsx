import MovieCard from "./MovieCard";
import '../css/MovieSlider.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useGetData from "../hooks/useGetData";
import { useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";

// Import Swiper
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function MovieSlider(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = import.meta.env.VITE_TMDB_API_KEY
    const [data, setData] = useState([])
    const language = useSelector((state) => state.languageToggle.value.language);

    let disabled = false

    useEffect(() => { //SLIDERS
        axios.get(`${baseUrl}${props.type}/${props.query}?api_key=${api}&language=${language}&page=1`)
            .then(response => setData(response.data.results,))
            .catch(err => console.log(err))
    }, [language])

    // Costum hooks (fetch data from database)
    const { user, watchlistData, getWatchlistData, watchedData } = useGetData()

    // Add Movie to Watchlist
    async function addToWatchlist(data, type) {
        try {
            await setDoc(doc(db, "users", user.email, "watchlist", data.original_title || data.original_name), {
                movieId: data.id,
                name: data.original_title || data.original_name,
                vote_average: data.vote_average,
                poster_path: data.poster_path,
                type: type,
            });
        } catch (error) {
            console.log("Error adding document to watchlist:", error)
        }
        getWatchlistData()

    }

    return (
        <div className="movie_slider_container">
            <h1 className="movie_slider_category">{props.title}</h1>
            <div className="movie_slider_wrapper">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    breakpoints={{
                        1280: { slidesPerView: 6, slidesPerGroup: 6, spaceBetween: 20 },
                        980: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20},
                        680: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 15},
                        480: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 10},
                        200: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10},
                    }}
                >
                    {
                        data?.map((movieCardData, index) => {
                            let movieId = movieCardData.id

                            // Check if movie is on watchlist/watched
                            const isOnWatchlist = watchlistData.find(movie => {
                                return movieId === movie.movieId
                            })
                            const isOnWatched = watchedData.find(movie => {
                                return movieId === movie.movieId
                            })
                            isOnWatchlist || isOnWatched ? disabled = true : disabled = false

                            return (
                                <SwiperSlide
                                    key={index}
                                    className='slider_movie'
                                >

                                    <MovieCard type={props.type} data={movieCardData} />

                                    <div className='buttons'>
                                        <button
                                            onClick={(() => {
                                                if (user) {
                                                    addToWatchlist(movieCardData, props.type)
                                                } else {
                                                    alert("Sign in and start adding movies to your wathlist")
                                                }
                                            })}
                                            className="add_movie"
                                            disabled={disabled}
                                            style={{
                                                background: `${disabled && '#cccccc1d'}`,
                                                color: `${disabled && '#cccccc1d'}`,
                                                pointerEvents: `${disabled && 'none'}`,

                                            }}
                                        >
                                            <div><AddRoundedIcon />
                                                {language === "en-US" ? 'Watchlist' : 'Assistir'}
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
    );
}

export default MovieSlider;

MovieSlider.propTypes = {
    type: PropTypes.string,
    query: PropTypes.string,
    title: PropTypes.string
}
