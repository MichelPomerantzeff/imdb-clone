import movieCover from "../images/movieCover.jpg"
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
    const rating = data.vote_average?.toFixed(1)
    const title = data.name || data.title

    return (
        <div className="movie_card">
            <div
                onClick={() => {
                    dispatch(displayMovieInfo({ data: data, type: type, display: true }));
                }}
                className="movie_card_image">
                <img src={image || movieCover} alt='' />
            </div>

            <p
                onClick={() => {
                    dispatch(displayMovieInfo({ data: data, type: type, display: true }));
                }}
                title={title} className='movie_title'>
                {title}
            </p>

            <div className='movie_card_details'>

                <div className='movie_card_rating'>
                    <StarIcon className='movie_card_star' />
                    <span
                        className={rating > 7.9 ? "high_vote" : rating < 6 ? "low_vote" : ""}>
                        {rating}
                    </span>
                </div>

                <div title='info' className='movie_info_button'>
                    <div
                        className='movie_info_background'>
                        <InfoOutlinedIcon />
                    </div>
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
