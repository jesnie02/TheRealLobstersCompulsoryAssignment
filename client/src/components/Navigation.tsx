import ThemeSwitcher from './ThemeSwitcher';
import ProfileLogo from "./Utilities/ProfileLogo.tsx";
import CartLogo from "./Utilities/CartLogo.tsx";
import HomeLogo from "./Utilities/HomeLogo.tsx";

const Navigation = () => {
    return (
        <nav className="navigation fixed top-0 left-0 right-0 flex justify-between items-center bg-white text-black p-3 shadow-lg z-50">
            <div className="flex items-center">
                <div>Logo</div>
                <HomeLogo />
            </div>
            <div className="profile-center">
                <ProfileLogo />
            </div>
            <div className="flex items-center">
                <CartLogo />
                <ThemeSwitcher className="theme-switcher" />
            </div>
        </nav>
    );
};

export default Navigation;