import Topbar from '../components/Topbar';
import Banner from '../components/Banner';
import MovieSlider from '../components/MovieSlider';
import MovieInfoCard from '../components/MovieInfoCard';
import Footer from '../components/Footer';
import '../css/Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDisableScroll from '../hooks/useDisableScroll';

function Home(props) {

    const baseUrl = "https://api.themoviedb.org/3/";
    const api = "454d6b5c326671cf654bb9a838b5f24f";
    const [upcoming, setUpcoming] = useState([]);
    const language = useSelector((state) => state.languageToggle.value.language);
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

                <MovieSlider
                    title={language === "en-US" ? "Popular Movies" : 'Filmes Populares'}
                    type={'movie'}
                    query={'popular'}
                />
                <MovieSlider
                    title={language === "en-US" ? '"Popular TV Shows"' : 'Series Populares'}
                    type={'tv'}
                    query={'popular'}
                />
                <MovieSlider
                    title={language === "en-US" ? '"Top Rated TV Shows"' : 'Series Mais Bem Votadas'}
                    type={'tv'}
                    query={'top_rated'}
                />
                <MovieSlider
                    title={language === "en-US" ? '"Top Rated Movies"' : 'Filmes Mais Bem Votadas'}
                    type={'movie'}
                    query={'top_rated'}
                />

            </div>
            <Footer />
        </div>
    );
}

export default Home;