import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import MovieInfoCard from '../components/MovieInfoCard';
import MovieCard from '../components/MovieCard';
import '../css/Watchlist.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import RedoRoundedIcon from '@mui/icons-material/RedoRounded';
import { db } from '../config/firebase';
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import useGetData from '../hooks/useGetData';
import useDisableScroll from '../hooks/useDisableScroll';

function WatchList(props) {

    // const language = 'en-US'
    const language = useSelector((state) => state.languageToggle.value.language);
    const display = useSelector((state) => state.movieInfo.value.display);

    // Costum hooks (fetch data from database)
    const { user, watchlistData, getWatchlistData, getWatchedData } = useGetData();

    // Delete movie from watchlist
    const deleteMovie = async (movie) => {
        const movieToDelete = doc(db, "users", user.email, "watchlist", movie.id)
        await deleteDoc(movieToDelete);
        getWatchlistData()
        getWatchedData()
    }


    async function addToWatched(movie) {

        await setDoc(doc(db, "users", user.email, "watched", movie.id), {
            movieId: movie.movieId,
            name: movie.name,
            vote_average: movie.vote_average,
            poster_path: movie.poster_path,
            type: movie.type,
        });
        deleteMovie(movie)
    }

    useDisableScroll()

    return (
        <div className='watchlist_container'>
            <Topbar />

            {display && <MovieInfoCard />}

            <h1 className='header'>
                {language === "en-US" ? 'WATCHLIST' : 'LISTA PARA ASSISTIR'}
            </h1>

            <div className='watchlist_wrapper'>
                {
                    watchlistData.map(movie => {
                        return (
                            <div key={movie.movieId} className='movie_card_container'>
                                <MovieCard data={movie} />
                                <div className='buttons'>
                                    <button onClick={(() => addToWatched(movie))} className="add_movie">
                                        <div><RedoRoundedIcon /> {language === "en-US" ? 'Watched' : 'Assistidos'}</div>
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
            <Footer />
        </div>
    );
}

export default WatchList;