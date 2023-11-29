import movieCover from '../images/movieCover.jpg'
import '../css/MovieInfoCard.css'
import axios from 'axios';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { closeMovieInfo } from '../features/movieInfo'
import { useEffect, useState } from 'react';

function MovieInfoCard(props) {

    const baseUrl = 'https://api.themoviedb.org/3/'
    const api = import.meta.env.VITE_TMDB_API_KEY
    const imagePrefix = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
    const dispatch = useDispatch()
    const [fetchedInfo, setFetchedInfo] = useState()
    const language = useSelector((state) => state.languageToggle.value.language);
    const movieInfo = useSelector((state) => state.movieInfo.value);
    const display = useSelector((state) => state.movieInfo.value.display);
    const image = fetchedInfo ? `${imagePrefix}${fetchedInfo?.poster_path}` || `${imagePrefix}${movieInfo.data.poster_path}` : movieCover
    const title = fetchedInfo?.name || fetchedInfo?.original_title || movieInfo.data.name
    const releaseDate = fetchedInfo?.first_air_date?.slice(0, 4) || fetchedInfo?.release_date?.slice(0, 4)
    const runtime = fetchedInfo?.runtime || fetchedInfo?.episode_run_time[0]
    const genres = fetchedInfo?.genres
    const rating = movieInfo.data.vote_average
    const plot = fetchedInfo?.overview
    const hour = Math.floor(runtime / 60) > 0 ? `${Math.floor(runtime / 60)}h` : ''
    const min = Math.floor(runtime % 60) > 0 ? `${Math.floor(runtime % 60)}min` : ''

    useEffect(() => {
        axios.get(`${baseUrl}${movieInfo.type}/${movieInfo.data.movieId || movieInfo.data.id}?api_key=${api}&language=${language}`)
            .then(response => setFetchedInfo(response.data))
            .catch(err => console.log(err))
    }, [display])


    return (
        <div className='movie_info_card_container'>

            <div className="movie_info_card_wrapper">

                <div className='movie_info_card_top'>
                    <div className="movie_info_card_poster">
                        <img src={image} alt='' />
                    </div>
                    <div className="movie_info_card_details">

                        <h2>
                            {title}
                        </h2>

                        <div >
                            <span>{releaseDate} |</span>
                            <span className='movie_info_card_runtime'>{runtime ? `${hour} ${min}` : 'N/A'}</span>
                        </div>

                        <div>
                            {
                                genres?.map((genre, index) => (
                                    <div key={genre.id}>
                                        <span className=''>{genre.name}</span>
                                        {
                                            index < fetchedInfo?.genres.length - 1 &&
                                            <span>|</span>
                                        }
                                    </div>
                                ))
                            }
                        </div>

                        <div className=''>
                            <StarIcon className='movie_info_card_star' />
                            {rating.toFixed(1)}
                        </div>

                    </div>
                </div>

                <div className='movie_info_card_bottom'>
                    <p className='movie_info_card_overview'>{plot}</p>
                </div>

                <div
                    className="movie_info_card_x_button"
                    onClick={() => {
                        dispatch(closeMovieInfo({ data: '', display: false, scroll: true }));
                    }}
                ><ClearRoundedIcon /></div>

            </div>

        </div>
    );
}

export default MovieInfoCard;