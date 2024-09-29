import ThemeSwitcher from './ThemeSwitcher';

const Navigation = () => {
    return (
        <nav className="navigation">
            <div>Logo</div>
            <ThemeSwitcher className="theme-switcher" />
        </nav>
    );
};

export default Navigation;