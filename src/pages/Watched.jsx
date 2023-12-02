import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import MovieInfoCard from '../components/MovieInfoCard';
import MovieCard from '../components/MovieCard';
import '../css/Watched.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { db } from '../config/firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import useGetData from '../hooks/useGetData';

function Watched() {

    // const language = 'en-US'

    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    // Costum hooks (fetch data from database)
    const { user, getWatchlistData, watchedData, getWatchedData } = useGetData();


    // Delete movie from watched
    const deleteMovie = async (movie) => {
        const movieToDelete = doc(db, "users", user.email, "watched", movie.id)
        await deleteDoc(movieToDelete);
        getWatchedData()
        getWatchlistData()
    }

    async function addToWatchlist(movie) {

        await setDoc(doc(db, "users", user.email, "watchlist", movie.id), {
            movieId: movie.movieId,
            name: movie.name,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            type: movie.type,
        });
        deleteMovie(movie)
    }

    return (
        <div className='watched_container'>
            <Topbar />

            {display && <MovieInfoCard />}

            <h1 className='header'>
                {language === "en-US" ? 'WATCHED' : 'LISTA DE ASSISTIDOS'}
            </h1>

            <div className='watched_wrapper'>
                {
                    watchedData.length > 0 ?
                        watchedData.map(movie => {
                            return (
                                <div key={movie.movieId} className='movie_card_container'>
                                    <MovieCard data={movie} />
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
                        })
                        :
                        <div className='empty_list'>{language === "en-US" ? 'This list is empty' : 'Lista vazia'}</div>
                }
            </div>
            <Footer />
        </div>
    );
}

export default Watched;