import '../css/SearchBar.css';
import movieCover from '../images/movieCover.jpg';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import axios from 'axios';
import { displayMovieInfo } from '../features/movieInfo';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import useGetData from '../hooks/useGetData';
import { toggleSearchMode } from '../features/searchBarToggle'

function SearchBar(props) {

    const baseUrl = "https://api.themoviedb.org/3/";
    const api = "454d6b5c326671cf654bb9a838b5f24f";
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const language = useSelector((state) => state.languageToggle.value.language);
    const searchMode = useSelector((state) => state.searchBarToggle.value.searchMode);
    const { user, watchlistData, getWatchlistData, watchedData } = useGetData();
    let disabled = false;

    const dispatch = useDispatch();

    // Fetch API on movie searching
    useEffect(() => {
        axios.get(`${baseUrl}search/multi?api_key=${api}&language=${language}&page=1&query=${search}`)
            .then(response => setData(response.data.results))
            .catch(err => console.log(err))
    }, [search, language])

    async function addToWatchlist(data, type) {
        await setDoc(doc(db, "users", user.email, "watchlist", data.original_title || data.original_name), {
            movieId: data.id,
            name: data.original_title || data.original_name,
            vote_average: data.vote_average,
            poster_path: data.poster_path,
            type: type,
        });
        getWatchlistData()
    }

    return (
        <div className="search_bar">

            <input
                onChange={e => {
                    setTimeout(() => setSearch(e.target.value), 500)
                }}
                onFocus={() => setIsSearchBarOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchBarOpen(false), 200)}
                type="text"
                placeholder={language === "en-US" ? 'Search' : 'Buscar'}
                className='search_bar_input_desktop'
            />
            <button className='search_button_off'><SearchIcon /></button>

            <input
                onChange={e => {
                    setTimeout(() => setSearch(e.target.value), 500)
                }}
                onFocus={() => setIsSearchBarOpen(true)}
                onBlur={() => setTimeout(() => setIsSearchBarOpen(false), 200)}
                type="text"
                placeholder={language === "en-US" ? 'Search' : 'Buscar'}
                className='search_bar_input_mobile'
                style={
                    {
                        display: `${!searchMode ? 'none' : 'flex'}`,
                    }
                }
            />
            <button className='search_button_on'>
                {
                    searchMode ?
                        <ClearRoundedIcon onClick={() => dispatch(toggleSearchMode({ searchMode: false }))} />
                        :
                        <SearchIcon onClick={() => dispatch(toggleSearchMode({ searchMode: true }))} />
                }
            </button>

            {
                search && isSearchBarOpen &&
                <div className="search_bar_dropdown_box">
                    {
                        data.map((movie, index) => {

                            let movieId = movie.id

                            // Check if movie is on watchlist/watched
                            const isOnWatchlist = watchlistData.find(movie => {
                                return movieId === movie.movieId
                            })
                            const isOnWatched = watchedData.find(movie => {
                                return movieId === movie.movieId
                            })
                            isOnWatchlist || isOnWatched ? disabled = true : disabled = false

                            if (index < 10) {

                                return (
                                    <div key={movie.id} className='searched_movie'>
                                        <div
                                            onClick={() => { dispatch(displayMovieInfo({ data: movie, type: movie.media_type, display: true })); }}
                                            className='searched_movie_wrapper'
                                        >
                                            <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : movieCover} alt='' />

                                            <div className="searched_movie_elements">
                                                <h4 className='searched_movie_title'>{movie.title || movie.name}</h4>
                                                <span className='searched_movie_date'>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}</span>
                                                <div className='searched_movie_rating'>
                                                    <StarIcon className='star_icon' />
                                                    {movie.vote_average?.toFixed(1) || '--'}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="buttons">
                                            <button
                                                onClick={(() => {
                                                    if (user) addToWatchlist(movie, movie.media_type)
                                                    else alert("Sign in and start creating your wathlist")
                                                })}
                                                className="add_movie"
                                                disabled={disabled}
                                                style={{
                                                    background: `${disabled && '#cccccc1d'}`,
                                                    color: `${disabled && '#cccccc1d'}`,
                                                    pointerEvents: `${disabled && 'none'}`,
                                                    margin: '0 10px 10px 10px'
                                                }}
                                            >
                                                <div><AddRoundedIcon />
                                                    {
                                                        language === "en-US" ? 'Watchlist' : 'Assistir'
                                                    }
                                                </div>
                                            </button>
                                        </div>

                                    </div>
                                )
                            }
                            return ''
                        })
                    }
                </div>
            }
        </div >
    );
}

export default SearchBar;