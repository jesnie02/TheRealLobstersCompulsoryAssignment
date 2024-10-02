import { Link } from "react-router-dom";
import homeLogo from '/assets/Home.png';

const HomeLogo = () => {
    return (
        <div className="home-logo">
            <Link to="/" className="home-button">
                <img src={homeLogo} alt="Home" className="profile-image" />
            </Link>
        </div>
    );
};

export default HomeLogo;