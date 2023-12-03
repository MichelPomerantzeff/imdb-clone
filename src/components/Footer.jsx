import '../css/Footer.css'

function Footer() {
    return (
        <footer>
            &copy; 2022 Developed by
            <strong>
                <a href="http://michelpomerantzeff.com" target="_blank" rel="noreferrer">
                    {" " + "Michel Pomerantzeff"}
                </a>
            </strong>
        </footer>
    );
}

export default Footer;