import MovieSlider from '../components/MovieSlider';
import Banner from '../components/Banner';
import '../css/Home.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';

function Home(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = "api_key=454d6b5c326671cf654bb9a838b5f24f"
    const language = "&language=en-US"

    const [upcoming, setUpcoming] = useState([])
    const [popularTv, setPopularTv] = useState([])
    const [topRatedTv, setTopRatedTv] = useState([])
    const [topRatedMovie, setTopRatedMovie] = useState([])
    const [popularMovie, setPopularMovie] = useState([])

    // API fetching
    useEffect(() => {
        axios.get(`${baseUrl}movie/upcoming?${api}${language}&page=1`)
            .then(response => setUpcoming(response.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}tv/popular?${api}&language=en-US&page=1`)
            .then(response => setPopularTv(response.data.results))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}tv/top_rated?${api}&language=en-US&page=1`)
            .then(response => setTopRatedTv(response.data.results))
            .catch(err => console.log(err))
    }, [])
    
        useEffect(() => {
            axios.get(`${baseUrl}movie/popular?${api}&language=en-US&page=2`)
                .then(response => setPopularMovie(response.data.results))
                .catch(err => console.log(err))
        }, [])
    
    useEffect(() => {
        axios.get(`${baseUrl}movie/top_rated?${api}&language=en-US&page=2`)
            .then(response => setTopRatedMovie(response.data.results))
            .catch(err => console.log(err))
    }, [])



    return (
        <div className='home_container'>
            <Topbar/>
            <div className="home_wrapper">
                <Banner data={upcoming} />
                <MovieSlider data={popularTv} title={"Popular TV Shows"} />
                <MovieSlider data={topRatedTv} title={"Top Rated TV Shows"} />
                <MovieSlider data={popularMovie} title={"Popular Movies"} />
                <MovieSlider data={topRatedMovie} title={"Top Rated Movies"} />
            </div>
            <Footer/>
        </div>
    );
}

export default Home;