import ThemeSwitcher from './ThemeSwitcher';
import ProfileLogo from "./ProfileLogo.tsx";

const Navigation = () => {
    return (
        <nav className="navigation">
            <div>Logo</div>
            <ProfileLogo />
            <ThemeSwitcher className="theme-switcher" />
        </nav>
    );
};

export default Navigation;