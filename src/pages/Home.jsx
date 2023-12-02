import Topbar from '../components/Topbar';
import Banner from '../components/Banner';
import MovieSlider from '../components/MovieSlider';
import MovieInfoCard from '../components/MovieInfoCard';
import Footer from '../components/Footer';
import '../css/Home.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {

    const BASE_URL = "https://api.themoviedb.org/3/";
    const [upcoming, setUpcoming] = useState([]);
    const [trailer, setTrailer] = useState({});


    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    useEffect(() => {
        fetchMovies();
    }, [language])

    // Fetch popular movies movie
    const fetchMovies = async () => {
        const { data } = await axios.get(`${BASE_URL}movie/upcoming`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                language: language,
                page: 1
            }
        })
        setUpcoming(data.results);
    }

    // Fetch single movie
    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${BASE_URL}movie/${id}`, {
            params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                append_to_response: "videos",
                language: language,
                page: 1
            }
        })

        if (data.videos && Array.isArray(data.videos.results) && data.videos.results.length > 0) {
            const trailer = data.videos.results.find(video => video.name.includes("Trailer"))
            const teaser = data.videos.results.find(video => video.name.includes("Teaser"))
            setTrailer(trailer || teaser);
        }
        
        if (data.videos.results.length < 1) {
            setTrailer({});
        }
    }

    const selectMovie = (data) => {
        fetchMovie(data.id);
    }

    return (
        <div className='home_container'>
            <Topbar />
            {
                display &&
                <MovieInfoCard />
            }
            <div className="home_wrapper">
                <Banner data={upcoming} trailer={trailer} selectMovie={selectMovie} />

                <MovieSlider
                    title={language === "en-US" ? "Popular Movies" : 'Filmes Populares'}
                    type={'movie'}
                    query={'popular'}
                />
                <MovieSlider
                    title={language === "en-US" ? "Popular TV Shows" : 'Series Populares'}
                    type={'tv'}
                    query={'popular'}
                />
                <MovieSlider
                    title={language === "en-US" ? "Top Rated TV Shows" : 'Series Mais Bem Votadas'}
                    type={'tv'}
                    query={'top_rated'}
                />
                <MovieSlider
                    title={language === "en-US" ? "Top Rated Movies" : 'Filmes Mais Bem Votadas'}
                    type={'movie'}
                    query={'top_rated'}
                />

            </div>
            <Footer />
        </div>
    );
}

export default Home;