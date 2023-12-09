import '../css/SearchBar.css';
import spare_poster from '../images/spare_poster.jpeg';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { displayMovieInfo } from '../features/movieInfo';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchMode } from '../features/searchBarToggle'
import { useQuery } from '@tanstack/react-query';
import { getSearchData } from '../apis/fetchMulti';
import useDebounce from '../hooks/useDebounce';
import { Divider } from '@mui/material';

function SearchBar() {

    const IMAGE_BASE_URL = 'https://www.themoviedb.org/t/p/w220_and_h330_face'
    const [search, setSearch] = useState('');
    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
    const language = useSelector((state) => state.languageToggle.value.language);
    const searchMode = useSelector((state) => state.searchBarToggle.value.searchMode);
    const dispatch = useDispatch();
    const debouncedSearch = useDebounce(search, 800);

    const { data } = useQuery({
        queryKey: ["searchedMovies", language, debouncedSearch],
        enabled: search != '',
        queryFn: () => getSearchData("search/multi", language, 1, search),
    })

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
                        data?.map((movie, index) => {

                            if (index < 10) {

                                return (
                                    <div key={movie.id} className='searched_movie'>
                                        <div
                                            onClick={() => { dispatch(displayMovieInfo({ data: movie, type: movie.media_type, display: true })); }}
                                            className='searched_movie_wrapper'
                                        >
                                            <img src={movie.poster_path ? `${IMAGE_BASE_URL}/${movie.poster_path}` : spare_poster} alt='' />

                                            <div className="searched_movie_elements">
                                                <h4 className='searched_movie_title'>{movie.title || movie.name}</h4>
                                                <span className='searched_movie_date'>{movie.release_date?.slice(0, 4) || movie.first_air_date?.slice(0, 4) || 'N/A'}</span>
                                                <div className='searched_movie_rating'>
                                                    {movie.vote_average != 0 ?
                                                        <>
                                                            <StarIcon className='star_icon' />
                                                            {movie.vote_average % 1 !== 0 ? movie.vote_average?.toFixed(1) : movie.vote_average}
                                                        </>
                                                        :
                                                        '--'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Divider sx={{borderColor: "var(--text-dark-bg4)"}}/>
                                    </div>
                                )
                            }
                            return
                        })
                    }
                </div>
            }
        </div >
    );
}

export default SearchBar;