import ThemeSwitcher from './ThemeSwitcher';
import ProfileLogo from "./Utilities/ProfileLogo.tsx";
import CartLogo from "./Utilities/CartLogo.tsx";
import HomeLogo from "./Utilities/HomeLogo.tsx";

const Navigation = () => {
    return (
        <nav className="navigation fixed top-0 left-0 right-0 flex justify-between items-center bg-white text-black p-3 shadow-lg z-50">
            <div className="flex items-center flex-1">
                <div>
                    <img src="/assets/LobsterPaperLogo.png" alt="Lobster Paper Logo" className="h-40 w-auto"/>
                </div>
                <div className="flex justify-between w-full">
                    <HomeLogo/>
                    <ProfileLogo/>
                    <CartLogo/>
                    <ThemeSwitcher className="theme-switcher"/>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;