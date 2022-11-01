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

function Home(props) {

    const baseUrl = "https://api.themoviedb.org/3/"
    const api = "454d6b5c326671cf654bb9a838b5f24f"
    // const language = "en-US"

    const language = useSelector((state) => state.languageToggle.value.language);

    const [upcoming, setUpcoming] = useState([])

    const display = useSelector((state) => state.movieInfo.value.display);

    // API fetching
    useEffect(() => { //BANNER
        axios.get(`${baseUrl}movie/upcoming?api_key=${api}&language=${language}&page=1`)
            .then(response => setUpcoming(response.data.results))
            .catch(err => console.log(err))
    }, [language])

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

                <MovieSlider title={'Popular Movies'} type={'movie'} query={'popular'} />
                <MovieSlider title={'Popular TV Shows'} type={'tv'} query={'popular'} />
                <MovieSlider title={'Top Rated TV Shows'} type={'tv'} query={'top_rated'} />
                <MovieSlider title={'Top Rated Movies'} type={'movie'} query={'top_rated'} />

            </div>
            <Footer />
        </div>
    );
}

export default Home;