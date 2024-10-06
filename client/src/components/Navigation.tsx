import ProfileLogo from "./Utilities/ProfileLogo.tsx";
import CartLogo from "./Utilities/CartLogo.tsx";
import HomeLogo from "./Utilities/HomeLogo.tsx";

const Navigation = () => {
    return (
        <nav className="navigation top-0 left-0 right-0 flex justify-between items-center bg-lightPink text-black p-3 shadow-lg z-50">
            <div className="flex items-center w-full mx-8">
                <div className="h-40 w-auto">
                    <img src="/assets/LobsterPaperLogo.png" alt="Lobster Paper Logo" className="h-40 w-auto"/>
                </div>
                <div className="flex-grow flex justify-center">
                    <HomeLogo/>
                </div>
                <div className="flex items-center space-x-8 m-8">
                    <ProfileLogo/>
                    <CartLogo/>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;