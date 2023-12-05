import movieCover from '../images/movieCover.jpg'
import '../css/MovieInfoCard.css'
import '../css/MovieSlider.css'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { closeMovieInfo } from '../features/movieInfo'
import { useRef } from 'react';
import useDisableScroll from '../hooks/useDisableScroll';
import { useQuery } from '@tanstack/react-query';
import { getDetails } from '../apis/fetchDetails';
import useEventListener from '../hooks/useEventListener';
import { Divider } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';


function MovieInfoCard() {

    const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
    const dispatch = useDispatch();
    const movieInfo = useSelector((state) => state.movieInfo.value);
    const language = useSelector((state) => state.languageToggle.value.language);
    const ref = useRef();

    const movieId = Number.isInteger(movieInfo.data.id) ? movieInfo.data.id : movieInfo.data.movieId;

    const { data } = useQuery({
        queryKey: ["movieDetails", movieId, language],
        enabled: movieId != null,
        queryFn: () => getDetails(movieInfo.type, movieId, language),
    })

    const image = `${IMAGE_BASE_URL}/${data?.poster_path}`;
    const title = data?.title || data?.name;
    const releaseDate = data?.first_air_date?.slice(0, 4) || data?.release_date?.slice(0, 4);
    const runtime = data?.runtime || (data?.episode_run_time ? data?.episode_run_time[0] : '');
    const genres = data?.genres;
    const rating = data?.vote_average.toFixed(1);
    const plot = data?.overview;
    const hour = Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h` : '';
    const min = Math.floor(runtime % 60) > 0 ? `${Math.floor(runtime % 60)}min` : '';

    const handleClickEvent = e => {
        if (ref.current && e.target === ref.current) {
            dispatch(closeMovieInfo({ display: false, scroll: true }));
        }
    }
    useEventListener("click", handleClickEvent)

    const handleKeyEvent = e => {
        if (e.key === "Escape") {
            dispatch(closeMovieInfo({ display: false, scroll: true }));
        }
    }
    useEventListener("keydown", handleKeyEvent)

    useDisableScroll();

    return (
        <div ref={ref} className='movie_info_card_container'>

            <div className="movie_info_card_wrapper">

                <div className='movie_info_card_top'>
                    <div className="movie_info_card_poster">
                        <img src={image || movieCover} alt='' />
                    </div>
                    <div className="movie_info_card_details">

                        <h1>
                            {title}
                        </h1>

                        <div >
                            {releaseDate}
                            <Divider sx={{ border: "solid 1px var(--text-dark-bg2)", margin: "2px 6px" }} orientation="vertical" variant="middle" flexItem />
                            <span className='movie_info_card_runtime'>{runtime ? `${hour} ${min}` : 'N/A'}</span>
                        </div>

                        <div>
                            {
                                genres?.map((genre, index) => (
                                    <div key={genre.id}>
                                        <span className=''>{genre.name}</span>
                                        {
                                            index < data?.genres.length - 1 &&
                                            <Divider sx={{ border: "solid 1px var(--text-dark-bg2)", margin: "2px 6px" }} orientation="vertical" variant="middle" flexItem />
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className=''>
                            <StarIcon className='movie_info_card_star' />
                            {rating}
                            <span className='out-of-ten'>/10</span>
                        </div>

                    </div>
                </div>

                <div className='movie_info_card_bottom'>
                    <p className='movie_info_card_overview'>{plot}</p>
                </div>

                <div className='buttons'>
                    <button className="add_movie_button">
                        <div>
                            <AddRoundedIcon />
                            {language === "en-US" ? 'Watchlist' : 'Assistir'}
                        </div>
                    </button>
                    <button className="trailer_button">
                            <VideocamOutlinedIcon />
                    </button>

                </div>

                <div
                    className="movie_info_close_button"
                    onClick={() => {
                        dispatch(closeMovieInfo({ display: false, scroll: true }));
                    }}
                ><ClearRoundedIcon /></div>

            </div>

        </div>
    );
}

export default MovieInfoCard;