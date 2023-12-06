import YouTube from "react-youtube";
import useEventListener from "../hooks/useEventListener";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PropTypes from "prop-types";

export default function YoutubePlayer({ trailerKey, setIsPlaying }) {

    let closeTimeout;

    const handleVideoEnd = () => {
        closeTimeout = setTimeout(() => {
            closeTrailer();
        }, 5000)
    }

    const handleVideoPlay = () => {
        clearTimeout(closeTimeout);
    }

    const closeTrailer = () => {
        setIsPlaying(false)
    }

    const handleKeyEvent = e => {
        if (e.key === "Escape") {
            closeTrailer()
        }
    }

    useEventListener("keydown", handleKeyEvent)

    return (
        <div className="trailer_container">
            <YouTube
                className={'trailer_wrapper'}
                videoId={trailerKey}
                onPlay={handleVideoPlay}
                onEnd={handleVideoEnd}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        controls: 1,
                        fs: 1,
                        cc_load_policy: 0,
                    }
                }}
            />
            <div className="close_trailer">
                <CloseRoundedIcon onClick={closeTrailer} className='close_button' />
            </div>
        </div>
    )
}

YoutubePlayer.propTypes = {
    trailerKey: PropTypes.string,
    setIsPlaying: PropTypes.func,
}