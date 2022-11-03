import '../css/Banner.css'
import { useEffect, useState } from 'react';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useSelector } from 'react-redux';

function Banner(props) {

    const poster = 'https://image.tmdb.org/t/p/w500/'
    const image = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
    const [currBanner, setCurrBanner] = useState(1)
    const [freezeBannerSlide, setFreezeBannerSlide] = useState(false)
    const language = useSelector((state) => state.languageToggle.value.language);

    // Manage banner sliding
    useEffect(() => {
        const interval = setInterval(() => {
            freezeBannerSlide && clearInterval(interval)
            !freezeBannerSlide && setCurrBanner(prev => prev === 20 - 1 ? 0 : prev + 1)
        }, 5000);

        return () => clearInterval(interval)

    }, [freezeBannerSlide])

    function slideBanner(direction) {
        if (direction === "left") {
            setCurrBanner(prev => prev < 1 ? props.data?.length - 1 : prev - 1)
        } else if (direction === "right") {
            setCurrBanner(prev => prev === props.data?.length - 1 ? 0 : prev + 1)
        }
        setFreezeBannerSlide(prev => prev = true)
    }


    return (
        <div className="banner_container">
            <div className="banner_wrapper">
                <div className="banner">

                    <div className="banner_image">
                        <img alt="" src={`${poster + props.data[currBanner]?.backdrop_path}`} />
                    </div>

                    <div className="gradient">
                        <div className="banner_content">

                            <div className="small_poster">
                                <img alt="" src={`${poster + props.data[currBanner]?.poster_path}`} />
                            </div>

                            <div className='banner_details'>
                                <h1 className='banner_title'>{props.data[currBanner]?.title}</h1>
                                <p className='banner_overview'>{props.data[currBanner]?.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="arrow_buttons">
                    <div onClick={() => slideBanner("right")} className="right">
                        <ArrowForwardIosRoundedIcon className="right_arrow" />
                    </div>

                    <div onClick={() => slideBanner("left")} className="left">
                        <ArrowBackIosRoundedIcon className="left_arrow" />
                    </div>
                </div>
            </div>

            <div className="up_next">

                <span className='up_next_title'>
                    {
                        language === "en-US" ? 'Up next' : 'A seguir'
                    }
                </span>

                <div className="up_next_content">

                    <div className='up_next_card border'>

                        <div className="up_next_poster">
                            <img src={`${image}${props.data[currBanner === 19 ? 0 : currBanner + 1]?.poster_path}`} alt='' />
                        </div>

                        <div className='up_next_card_details'>
                            <div className="up_next_card_title">{props.data[currBanner === 19 ? 0 : currBanner + 1]?.title}</div>
                            <div className="up_next_card_date">{props.data[currBanner === 19 ? 0 : currBanner + 1]?.release_date}</div>
                        </div>
                    </div>

                    <div className='up_next_card border'>

                        <div className="up_next_poster">
                            <img src={`${image}${props.data[currBanner === 18 ? 0 : currBanner === 19 ? 1 : currBanner + 2]?.poster_path}`} alt='' />
                        </div>

                        <div className='up_next_card_details'>
                            <div className="up_next_card_title">{props.data[currBanner === 18 ? 0 : currBanner === 19 ? 1 : currBanner + 2]?.title}</div>
                            <div className="up_next_card_date">{props.data[currBanner === 18 ? 0 : currBanner === 19 ? 1 : currBanner + 2]?.release_date}</div>
                        </div>
                    </div>

                    <div className='up_next_card'>

                        <div className="up_next_poster">
                            <img src={`${image}${props.data[currBanner === 17 ? 0 : currBanner === 18 ? 1 : currBanner === 19 ? 2 : currBanner + 3]?.poster_path}`} alt='' />
                        </div>

                        <div className='up_next_card_details'>
                            <div className="up_next_card_title">{props.data[currBanner === 17 ? 0 : currBanner === 18 ? 1 : currBanner === 19 ? 2 : currBanner + 3]?.title}</div>
                            <div className="up_next_card_date">{props.data[currBanner === 17 ? 0 : currBanner === 18 ? 1 : currBanner === 19 ? 2 : currBanner + 3]?.release_date}</div>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
}

export default Banner;