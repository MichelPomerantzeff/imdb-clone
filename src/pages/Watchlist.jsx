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
import { useEffect, useState } from 'react';
import LoadingWheel from '../components/LoadingWheel';

function WatchList() {

    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    // Costum hooks (fetch data from database)
    const { user, watchlistData, watchlistDataLoading, getWatchlistData, getWatchedData } = useGetData();

    const [filter, setFilter] = useState("all")

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

    const getFilteredValue = (filter) => {
        setFilter(filter)
    }

    useEffect(() => {
        getWatchlistData()
    }, [filter])

    return (
        <div className='watchlist_container'>
            <Topbar />

            {display ? <MovieInfoCard /> : null}

            <h1 className='header'>
                {language === "en-US" ? 'WATCHLIST' : 'LISTA DE FAVORITOS'}
            </h1>

            <FilterButtons getFilteredValue={getFilteredValue} />

            {

                watchlistDataLoading ? <h1 style={{ display: "flex", justifyContent: "center", padding: "100px" }}><LoadingWheel /></h1> :

                    watchlistData.length > 0 ?
                        <div className='watchlist_wrapper'>
                            {
                                (watchlistData.length > 0 ? watchlistData : watchlistData ?? []).map(movie => {

                                    if (filter === movie.type || filter === "all") {

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
                                    }
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