import MovieCard from "./MovieCard";
import '../css/MovieSlider.css'
import { useEffect, useState } from "react";

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';


function MovieSlider(props) {

    const [data, setData] = useState([])

    const [sliderIndex, setSliderIndex] = useState(0)

    let itemsPerScreen = 6
    let totalOfItems = data.length
    let maxSliderIndex = totalOfItems / itemsPerScreen
    let maxSliderIndexRestOfDivision = maxSliderIndex % sliderIndex

    // console.log(maxSliderIndexRestOfDivision)

    //Set Data coming from parent
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    function slide(direction) {
        console.log(`Slide to ${direction}`)

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

    return (
        <div className="movie_slider_container">
            <h1 className="movie_slider_category">{props.title}</h1>
            <div className="movie_slider_wrapper">

                {
                    data.map(movieCard => {
                        return (
                            <div
                                // Slide images
                                style={{ transform: `translateX( calc(  (  (-100% * 6) - (18px * ${itemsPerScreen})  ) * ${sliderIndex}  )  ) ` }}

                                key={movieCard.id}
                                className="movie_card_container">

                                <MovieCard data={movieCard} />
                                <button className="add_to_watchlist">
                                    <span>Add to Watchlist</span>
                                </button>
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