import spare_poster from '../images/spare_poster.jpeg'
import '../css/MovieInfoCard.css'
import '../css/MovieSlider.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { closeMovieInfo } from '../features/movieInfo'
import { useRef, useState } from 'react';
import useDisableScroll from '../hooks/useDisableScroll';
import { useQuery } from '@tanstack/react-query';
import { getDetails } from '../apis/fetchDetails';
import useEventListener from '../hooks/useEventListener';
import { Divider } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import useGetData from '../hooks/useGetData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import YoutubePlayer from './YoutubePlayer';


function MovieInfoCard() {

    const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
    const dispatch = useDispatch();
    const movieInfo = useSelector((state) => state.movieInfo.value);
    const language = useSelector((state) => state.languageToggle.value.language);
    const ref = useRef();
    const { user, watchlistData, getWatchlistData, watchedData } = useGetData()

    const movieId = Number.isInteger(movieInfo.data.id) ? movieInfo.data.id : movieInfo.data.movieId;

    const { data } = useQuery({
        queryKey: ["movieDetails", movieId, language],
        enabled: movieId != null,
        queryFn: () => getDetails(movieInfo.type, movieId, language),
    })

    const title = data?.title || data?.name;
    const releaseDate = data?.first_air_date?.slice(0, 4) || data?.release_date?.slice(0, 4);
    const runtime = data?.runtime || (data?.episode_run_time ? data?.episode_run_time[0] : '');
    const genres = data?.genres;
    const rating = data?.vote_average?.toFixed(1);
    const plot = data?.overview;
    const hour = Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h` : '';
    const min = Math.floor(runtime % 60) > 0 ? `${Math.floor(runtime % 60)}min` : '';

    // Logic for finding and setting the trailer, teaser and clip
    const videos = data?.videos?.results || [];
    const trailer = videos.find(video => video.name.includes("Official Trailer")) || videos.find(video => video.type.includes("Trailer"));
    const teaser = videos.find(video => video.type.includes("Teaser"));
    const clip = videos.find(video => video.type.includes("Clip"));

    const [isTraleirOpen, setIsTrailerOpen] = useState(false);
    const [videoKey, setVideoKey] = useState(null);
    let disabled = false

    const handleClickEvent = e => {
        if (ref.current && e.target === ref.current) {
            dispatch(closeMovieInfo({ display: false, scroll: true }));
        }
    }

    const handleKeyEvent = e => {
        if (e.key === "Escape") {
            closeModal();
        }
    }
    useEventListener("click", handleClickEvent)
    useEventListener("keydown", handleKeyEvent)

    const closeModal = () => {
        dispatch(closeMovieInfo({ display: false, scroll: true }));
    }

    useDisableScroll();

    function handleTrailer() {
        if (trailer) {
            setVideoKey(trailer.key)
            setIsTrailerOpen(true)
        } else if (teaser) {
            setVideoKey(teaser.key)
            setIsTrailerOpen(true)
        } else if (clip) {
            setVideoKey(clip.key)
            setIsTrailerOpen(true)
        } else {
            alert(`There is no trailer for this ${movieInfo.type === "movie" ? "Movie" : "TV Show"}.`)
            setVideoKey(null)
            setIsTrailerOpen(false)
        }
        console.log(videoKey)
    }

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
            getWatchlistData();
        } else {
            alert("Sign in and start adding movies to your wathlist")
        }
    }

    // Check if movie is on watchlist/watched
    const isOnWatchlist = watchlistData.find(movie => (movieInfo.data.id === movie.movieId || movieInfo.data.movieId === movie.movieId))
    const isOnWatched = watchedData.find(movie => (movieInfo.data.id === movie.movieId || movieInfo.data.movieId === movie.movieId))

    isOnWatchlist || isOnWatched ? disabled = true : disabled = false


    return (
        <div ref={ref} className='movie_info_card_container'>

            {isTraleirOpen ?

                <YoutubePlayer
                    trailerKey={videoKey}
                    setIsPlaying={setIsTrailerOpen}
                />

                :
                <div className="movie_info_card_wrapper">

                    <div className='movie_info_card_top'>
                        <div className="movie_info_card_poster">
                            <img src={data?.poster_path != undefined ? `${IMAGE_BASE_URL}/${data?.poster_path}` : spare_poster} alt='' />
                        </div>
                        <div className="movie_info_card_details">

                            <h1>
                                {title}
                            </h1>

                            <div >
                                {releaseDate &&
                                    <>
                                        {releaseDate}
                                        <Divider sx={{ border: "solid 1px var(--text-dark-bg2)", margin: "4px 6px" }} orientation="vertical" variant="middle" flexItem />
                                    </>
                                }
                                <span className='movie_info_card_runtime'>{runtime ? `${hour} ${min}` : 'N/A'}</span>
                            </div>

                            <div>
                                {
                                    genres?.map((genre, index) => (
                                        <div key={genre.id}>
                                            <span className=''>{genre.name}</span>
                                            {
                                                index < data?.genres.length - 1 &&
                                                <Divider sx={{ border: "solid 1px var(--text-dark-bg2)", margin: "4px 6px" }} orientation="vertical" variant="middle" flexItem />
                                            }
                                        </div>
                                    ))
                                }
                            </div>

                            {
                                rating &&
                                <div className=''>
                                    <StarIcon className='movie_info_card_star' />
                                    {rating}
                                    <span className='out-of-ten'>/10</span>
                                </div>
                            }

                        </div>
                    </div>

                    <div className='movie_info_card_bottom'>
                        <p className='movie_info_card_overview'>{plot}</p>
                    </div>


                    <div className='buttons'>
                        <button
                            onClick={(() => { addToWatchlist(movieInfo.data, movieInfo.type) })}
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
                        <button onClick={handleTrailer} className="trailer_button">
                            <VideocamOutlinedIcon />
                        </button>
                    </div>

                    <div
                        className="movie_info_close_button"
                        onClick={closeModal}
                    ><ClearRoundedIcon /></div>
                </div>
            }
        </div>
    );
}

export default MovieInfoCard;