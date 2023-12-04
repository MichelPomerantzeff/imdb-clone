import '../css/Watched.css';
import Topbar from '../components/Topbar';
import MovieInfoCard from '../components/MovieInfoCard';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { db } from '../config/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import useGetData from '../hooks/useGetData';
import FilterButtons from '../components/FilterButtons';
import { useEffect, useState } from 'react';
import LoadingWheel from '../components/LoadingWheel';

function Watched() {

    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    // Costum hooks (fetch data from database)
    const { user, getWatchlistData, watchedData, watchedDataLoading, getWatchedData } = useGetData();

    const [filter, setFilter] = useState("all")

    // Delete movie from watched
    const deleteMovie = async (movie) => {
        const movieToDelete = doc(db, "users", user.email, "watched", movie.id)
        await deleteDoc(movieToDelete);
        getWatchedData()
        getWatchlistData()
    }

    async function addToWatchlist(movie) {

        await setDoc(doc(db, "users", user.email, "watchlist", movie.title || movie.name),
            { ...movie }
        );
        deleteMovie(movie)
    }

    const getFilteredValue = (filter) => {
        setFilter(filter)
    }

    useEffect(() => {
        getWatchedData()
    }, [filter])

    return (
        <div className='watched_container'>
            <Topbar />

            {display ? <MovieInfoCard /> : null}

            <h1 className='header'>
                {language === "en-US" ? 'WATCHED' : 'LISTA DE ASSISTIDOS'}
            </h1>

            <FilterButtons getFilteredValue={getFilteredValue} />

            {

                watchedDataLoading ? <h1 style={{ display: "flex", justifyContent: "center", padding: "100px" }}><LoadingWheel /></h1> :

                    watchedData.length > 0 ?
                        <div className='watched_wrapper'>
                            {
                                (watchedData.length > 0 ? watchedData : watchedData ?? []).map(movie => {

                                    if (filter === movie.type || filter === "all") {

                                        return (
                                            <div key={movie.movieId} className='movie_card_container'>
                                                <MovieCard type={movie.type} data={movie} />
                                                <div className='buttons'>
                                                    <button onClick={(() => addToWatchlist(movie))} className="add_movie">
                                                        <div><UndoRoundedIcon />{language === "en-US" ? 'Watchlist' : 'Assistir'}</div>
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

export default Watched;