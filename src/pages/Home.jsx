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

import movieSliders from '../data/movieSliderData'

function Home(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = "454d6b5c326671cf654bb9a838b5f24f"
    const language = "en-US"

    const [upcoming, setUpcoming] = useState([])

    const display = useSelector((state) => state.movieInfo.value.display);

    const [movieData, setMovieData] = useState([])

    // API fetching
    useEffect(() => { //BANNER
        return () => {
            axios.get(`${baseUrl}movie/upcoming?api_key=${api}&language=${language}&page=1`)
                .then(response => setUpcoming(response.data.results))
                .catch(err => console.log(err))
        }
    }, [])

    useEffect(() => { //SLIDERS
        return () => {
            movieSliders.forEach((slider) => {
                axios.get(`${baseUrl}${slider.type}/${slider.query}?api_key=${api}&language=${language}&page=1`)
                    .then(response => setMovieData(prev => [...prev, {
                        title: slider.title,
                        type: slider.type,
                        data: response.data.results,
                    }]))
                    .catch(err => console.log(err))
            })
        }
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