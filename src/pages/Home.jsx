import MovieSlider from '../components/MovieSlider';
import Banner from '../components/Banner';
import '../css/Home.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import MovieInfoCard from '../components/MovieInfoCard';

import { useSelector } from 'react-redux';
import useDisableScroll from '../hooks/useDisableScroll';

// Not returning data when site is deployed
// But it work normal on local machine
// import movieSliders from '../data/movieSliderData'


function Home(props) {
    
    const baseUrl = "https://api.themoviedb.org/3/"
    const api = "454d6b5c326671cf654bb9a838b5f24f"
    const language = "en-US"
    
    // MovieSliders is being duplicated on local machine when importing this folder
    // But it work normal when site is deployed
    const movieSliders = [
        { title: "Popular Movies", type: "movie", query: "popular" },
        { title: "Popular TV Shows", type: "tv", query: "popular" },
        { title: "Top Rated TV Shows", type: "tv", query: "top_rated" },
        { title: "Top Rated Movies", type: "movie", query: "top_rated" },
    ]

    const [upcoming, setUpcoming] = useState([])

    const display = useSelector((state) => state.movieInfo.value.display);

    const [movieData, setMovieData] = useState([])

    // API fetching
    useEffect(() => { //BANNER
            axios.get(`${baseUrl}movie/upcoming?api_key=${api}&language=${language}&page=1`)
                .then(response => setUpcoming(response.data.results))
                .catch(err => console.log(err))
    }, [])

    useEffect(() => { //SLIDERS
            movieSliders.forEach((slider) => {
                axios.get(`${baseUrl}${slider.type}/${slider.query}?api_key=${api}&language=${language}&page=1`)
                    .then(response => setMovieData(prev => [...prev, {
                        title: slider.title,
                        type: slider.type,
                        data: response.data.results,
                    }]))
                    .catch(err => console.log(err))
            })
    }, [])

    useDisableScroll()

    return (
        <div className='home_container'>
            <Topbar />
            {
                display &&
                <MovieInfoCard />
            }
            <div className="home_wrapper">
                <Banner data={upcoming} />

                {
                    movieData.map((fetchedMovie, index) => {
                        return (
                            <div key={index}>
                                <MovieSlider data={fetchedMovie.data} title={fetchedMovie.title} type={fetchedMovie.type} />
                            </div>
                        )
                    })
                }

            </div>
            <Footer />
        </div>
    );
}

export default Home;