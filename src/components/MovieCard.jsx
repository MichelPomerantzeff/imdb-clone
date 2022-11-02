import movieCover from "../images/movieCover.jpg"
import '../css/MovieCard.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import { displayMovieInfo } from '../features/movieInfo'

function MovieCard(props) {

    const dispatch = useDispatch()
    const image = props.data.poster_path ? `${'https://www.themoviedb.org/t/p/w220_and_h330_face'}${props.data.poster_path}` : movieCover
    const rating = props.data.vote_average?.toFixed(1)
    const title = props.data.name || props.data.original_title

    return (
        <div className="movie_card">
            <div
                onClick={() => {
                    dispatch(displayMovieInfo({ data: props.data, type: props.type || props.data.type, display: true }));
                }}
                className="movie_card_image">
                <img src={image} alt='' />
            </div>

            <div className='movie_card_top_elements'>

                <div className='movie_card_rating'>
                    <StarIcon className='movie_card_star' />
                    <span className='movie_card_vote'>{rating}</span>
                </div>

                <div title='info' className='movie_info_button'>
                    <div
                        onClick={() => {
                            dispatch(displayMovieInfo({ data: props.data, type: props.type || props.data.type, display: true }));
                        }}
                        className='movie_info_background'>
                        <InfoOutlinedIcon />
                    </div>
                </div>
            </div>

            <p
                onClick={() => {
                    dispatch(displayMovieInfo({ data: props.data, type: props.type || props.data.type, display: true }));
                }}
                title={title} className='movie_title'>
                {title}
            </p>
        </div>


    );
}

export default MovieCard;