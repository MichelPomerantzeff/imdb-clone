import MovieInfoCard from './MovieInfoCard';
import SearchBar from './SearchBar';
import '../css/Topbar.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDropdown from './UserDropdown';
import LanguageDropdown from './LanguageDropdown';


function Topbar() {

    const display = useSelector((state) => state.movieInfo.value.display);
    const searchMode = useSelector((state) => state.searchBarToggle.value.searchMode);
    const watchlistLength = useSelector((state) => state.watchlistLength.value.length);
    const watchedLength = useSelector((state) => state.watchedLength.value.length);
    const language = useSelector((state) => state.languageToggle.value.language);
    const navigate = useNavigate();

    return (
        <nav>
            {display ? <MovieInfoCard /> : null}
            <div className='topbar_container'>

                {
                    !searchMode &&
                    <div onClick={() => navigate("/")} className='topbar_left_section'>
                        <div className="logo">
                            <span>Movie App</span>
                        </div>
                    </div>
                }

                <div className="topbar_center_section">
                    <SearchBar />
                </div>

                {
                    !searchMode &&
                    <div className="topbar_right_section">
                        <div className="lists">

                            <div onClick={() => navigate("/watchlist")} className='watchlist'>
                                {language === "en-US" ? 'Watchlist' : 'Assistir'}
                                {watchlistLength > 0 && <sup className='whatchlist_quantity'>{watchlistLength}</sup>}
                            </div>

                            <div onClick={() => navigate("/watched")} className='watched'>
                                {language === "en-US" ? 'Watched' : 'Assistidos'}
                                {watchedLength > 0 && <sup className='whatchlist_quantity'>{watchedLength}</sup>}
                            </div>
                        </div>

                        <UserDropdown />

                        <LanguageDropdown />

                    </div>
                }

            </div>
        </nav>
    );
}

export default Topbar;