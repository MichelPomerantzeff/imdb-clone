import Topbar from '../components/Topbar';
import '../css/Watched.css'

function Watched(props) {
    return (
        <div className='watched_container'>
            <Topbar />
            <div className='watched_wrapper'>
                <h1>WATCHED</h1>
            </div>
        </div>
    );
}

export default Watched;