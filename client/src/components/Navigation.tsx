import ThemeSwitcher from './ThemeSwitcher';
import ProfileLogo from "./Utilities/ProfileLogo.tsx";
import CartLogo from "./Utilities/CartLogo.tsx";
import HomeLogo from "./Utilities/HomeLogo.tsx";

const Navigation = () => {
    return (
        <nav className="navigation flex justify-between items-center m-3">
            <div className="flex items-center">
                <div className="fill-base-content">Logo</div>
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