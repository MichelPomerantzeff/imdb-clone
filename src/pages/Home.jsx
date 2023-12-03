import '../css/Home.css';
import Topbar from '../components/Topbar';
import Banner from '../components/Banner';
import MovieSlider from '../components/MovieSlider';
import MovieInfoCard from '../components/MovieInfoCard';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getData } from '../apis/fetchData';
import { getDetails } from '../apis/fetchDetails';

function Home() {

    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);
    const [movieId, setMovieId] = useState(null);

    const selectMovie = (data) => {
        setMovieId(data.id);
    }

    const dataQuery = useQuery({
        queryKey: ["movies"],
        queryFn: () => getData("movie", "upcoming", language, 1),
    })

    const detailsQuery = useQuery({
        queryKey: ["movieDetails", movieId],
        enabled: movieId != null,
        queryFn: () => getDetails("movie", movieId, language),
    })

    // Your logic for finding and setting the trailer
    const videos = detailsQuery.data?.videos.results || [];
    const trailer = videos.find(video => video.name.includes("Trailer")) || videos.find(video => video.name.includes("Teaser")) || {};

    // TODO: Add style here
    if (dataQuery.isError || detailsQuery.isError) {
        return <div>Error fetching data</div>;
    }

    return (
        <div className='home_container'>
            <Topbar />
            {display ? <MovieInfoCard /> : null}
            <div className="home_wrapper">
                <Banner data={dataQuery.data} trailer={trailer} selectMovie={selectMovie} />

                <MovieSlider
                    title={language === "en-US" ? "Popular Movies" : 'Filmes Populares'}
                    type={'movie'}
                    query={'popular'}
                    queryKey={"popularMovies"}
                />
                <MovieSlider
                    title={language === "en-US" ? "Popular TV Shows" : 'Series Populares'}
                    type={'tv'}
                    query={'popular'}
                    queryKey={"popularTvShows"}
                />
                <MovieSlider
                    title={language === "en-US" ? "Top Rated TV Shows" : 'Series Mais Bem Votadas'}
                    type={'tv'}
                    query={'top_rated'}
                    queryKey={"topRatedTvShows"}
                />
                <MovieSlider
                    title={language === "en-US" ? "Top Rated Movies" : 'Filmes Mais Bem Votadas'}
                    type={'movie'}
                    query={'top_rated'}
                    queryKey={"topRatedMovies"}
                />

            </div>
            <Footer />
        </div>
    );
}

export default Home;