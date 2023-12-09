import spare_poster from "../images/spare_poster.jpeg"
import '../css/MovieCard.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { displayMovieInfo } from '../features/movieInfo'
import PropTypes from "prop-types";

function MovieCard({ type, data }) {

    const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face';
    const dispatch = useDispatch();
    const image = `${IMAGE_BASE_URL}/${data.poster_path}`;
    const rating = data.vote_average?.toFixed(1);
    const title = data.name || data.title;

    function showMovieInfo() {
        dispatch(displayMovieInfo({ data: data, type: type, display: true }))
    }

    return (
        <div className="movie_card">
            <div
                onClick={showMovieInfo}
                className="movie_card_image">
                <img src={image || spare_poster} alt='' />
            </div>

            <p
                onClick={showMovieInfo}
                title={title} className='movie_title'>
                {title}
            </p>

            <div className='movie_card_details'>

                <div className='movie_card_rating'>
                    <StarIcon className='movie_card_star' />
                    <span> {rating} </span>
                </div>

                <div title='info' className='movie_info_button'>
                    <InfoOutlinedIcon />
                </div>
            </div>
        </div>


    );
}

export default MovieCard;

MovieCard.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object
}
