import React from 'react';
import '../css/MovieCard.css'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import StarIcon from '@mui/icons-material/Star';



function MovieCard(props) {

    const image = 'https://www.themoviedb.org/t/p/w220_and_h330_face'

    return (
        <div>
            <div className="movie_card">

                <div className="movie_card_image">
                    <img src={`${image}${props.data.poster_path}`} alt='' />
                </div>

                <div className='movie_card_top_elements'>

                    <div className='movie_card_rating'>
                        <StarIcon className='movie_card_star' />
                        <span className='movie_card_vote'>{props.data.vote_average.toFixed(1)}</span>
                    </div>

                    <div title='info' className='movie_info_button'>
                        <div className='movie_info_background'>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                </div>

                <p title={props.data.name || props.data.original_title} className='movie_title'>{props.data.name || props.data.original_title}</p>
            </div>
        </div>
    );
}

export default MovieCard;