import MovieCard from "./MovieCard";
import '../css/MovieSlider.css'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useGetData from "../hooks/useGetData";
import { useSelector } from "react-redux";
import axios from "axios";

function MovieSlider(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = import.meta.env.VITE_TMDB_API_KEY
    const [data, setData] = useState([])
    const [sliderIndex, setSliderIndex] = useState(0)
    const language = useSelector((state) => state.languageToggle.value.language);

    let itemsPerScreen = 6
    let totalOfItems = data?.length
    let maxSliderIndex = totalOfItems / itemsPerScreen
    let maxSliderIndexRestOfDivision = maxSliderIndex % sliderIndex
    let disabled = false

    useEffect(() => { //SLIDERS
        axios.get(`${baseUrl}${props.type}/${props.query}?api_key=${api}&language=${language}&page=1`)
            .then(response => setData(response.data.results,))
            .catch(err => console.log(err))
    }, [language])

    function slide(direction) {

        if (direction === "right") {
            if (sliderIndex === Math.floor(maxSliderIndex - 1)) {
                setSliderIndex(prev => (prev - 1) + maxSliderIndexRestOfDivision)
            } else {
                setSliderIndex(prev => prev + 1)
            }
        } else if (direction === "left") {
            setSliderIndex(prev => prev > 0 ? Math.floor(prev) - 1 : 0)
        }
    }

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
        } catch(error) {
            console.log("Error adding document to watchlist:", error)
        }
        getWatchlistData()

    }

    return (
        <div className="movie_slider_container">
            <h1 className="movie_slider_category">{props.title}</h1>
            <div className="movie_slider_wrapper">

                {
                    data?.map(movieCardData => {
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
                            <div
                                // Slide images
                                style={{ transform: `translateX( calc(  (  (-100% * 6) - (18px * ${itemsPerScreen})  ) * ${sliderIndex}  )  )`, transition: "1s ease" }}

                                key={movieCardData.id}
                                className="movie_card_container">

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



                            </div>
                        )
                    })
                }

            </div>

            <div className="arrow_buttons_slider">

                {
                    sliderIndex <= Math.floor(maxSliderIndex - 1) &&
                    <div onClick={() => slide("right")} className="right_slider">
                        <ArrowForwardIosRoundedIcon className="right_arrow" />
                    </div>
                }

                {
                    sliderIndex > 0 &&
                    <div onClick={() => slide("left")} className="left_slider">
                        <ArrowBackIosRoundedIcon className="left_arrow" />
                    </div>
                }

            </div>

        </div>
    );
}

export default MovieSlider;