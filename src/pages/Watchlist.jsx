import '../css/Watchlist.css';
import Topbar from '../components/Topbar';
import MovieInfoCard from '../components/MovieInfoCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import { db } from '../config/firebase';
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import useGetData from '../hooks/useGetData';
import FilterButtons from '../components/FilterButtons';
import { useState } from 'react';

function WatchList() {

    // const language = 'en-US'
    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    // Costum hooks (fetch data from database)
    const { user, watchlistData, getWatchlistData, getWatchedData } = useGetData();

    const [filteredContent, setFilteredContent] = useState(null);

    // Delete movie from watchlist
    const deleteMovie = async (movie) => {
        const movieToDelete = doc(db, "users", user.email, "watchlist", movie.id)
        await deleteDoc(movieToDelete);
        getWatchlistData()
        getWatchedData()
    }

    async function addToWatched(movie) {

        await setDoc(doc(db, "users", user.email, "watched", movie.title || movie.name),
            { ...movie }
        );
        deleteMovie(movie)
    }

    const getFilteredContent = (filter) => {
        if (filter === "Movies") {
            const filteredData = watchlistData.filter(item => item.type === "movie")
            setFilteredContent(filteredData)
        } else if (filter === "Tv Shows") {
            const filteredData = watchlistData.filter(item => item.type === "tv")
            setFilteredContent(filteredData)
        } else if (filter === "All") {
            setFilteredContent([...watchlistData])
        }
        watchlistData ? console.log(watchlistData) : ""
    }


    return (
        <div className='watchlist_container'>
            <Topbar />

            {display ? <MovieInfoCard /> : null}

            <h1 className='header'>
                {language === "en-US" ? 'WATCHLIST' : 'LISTA DE FAVORITOS'}
            </h1>

            <FilterButtons getFilteredContent={getFilteredContent} />

            {
                watchlistData.length > 0 ?
                    <div className='watchlist_wrapper'>
                        {
                            (filteredContent.length > 0 ? filteredContent : watchlistData ?? []).map(movie => {
                                return (
                                    <div key={movie.movieId} className='movie_card_container'>
                                        <MovieCard type={movie.type} data={movie} />
                                        <div className='buttons'>
                                            <button onClick={(() => addToWatched(movie))} className="add_movie">
                                                <div><RedoRoundedIcon /> {language === "en-US" ? 'Watched' : 'Assistido'}</div>
                                            </button>
                                            <button onClick={(() => deleteMovie(movie))} className="delete_movie">
                                                <span><DeleteRoundedIcon /></span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className='empty_list'>{language === "en-US" ? 'This list is empty' : 'Lista vazia'}</div>
            }
            <Footer />
        </div>
    );
}

export default WatchList;