import '../css/Footer.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import { useNavigate } from 'react-router-dom';

function Footer() {

    const navigate = useNavigate();

    return (
        <footer>
            <div className="footer_wrapper">
                <div className="col">
                    <div className="footer_logo_col">
                        <div onClick={() => navigate("/")} className="logo">
                            <span>Movie App</span>
                            <LiveTvRoundedIcon className='footer_tv_icon' />
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque maxime, doloribus, reprehenderit porro officiis, quia omnis et ipsum laudantium earum nam.</p>
                    </div>
                </div>

                <div className="col">
                    <div className="footer_links_col">
                        <h2>USEFUL LINKS</h2>
                        <ul>
                            <li>Contact us</li>
                            <li>Career</li>
                            <li>Our Services</li>
                            <li>Privacy Policy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>

                <div className="col">
                    <div className="footer_social_col">
                        <h2>SOCIALS</h2>
                        <div className="footer_socials">
                            <div className='footer_social_icon'> <TwitterIcon /> </div>
                            <div className='footer_social_icon'> <YouTubeIcon /> </div>
                            <div className='footer_social_icon'> <InstagramIcon /> </div>
                            <div className='footer_social_icon'> <FacebookIcon /> </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='developed_by'>
                &copy; 2022 Developed by
                <a href="http://michelpomerantzeff.com" target="_blank" rel="noreferrer">
                    <strong> {" " + "MPomerantzeff"} </strong>
                </a>
            </div>
        </footer>
    );
}

export default Footer;