import Topbar from '../components/Topbar';
import '../css/Watchlist.css'

function WatchList(props) {
    return (
        <div className='watchlist_container'>
            <Topbar />
            <div className='watchlist_wrapper'>
                <h1>WATCHLIST</h1>
            </div>
        </div>
    );
}

export default WatchList;