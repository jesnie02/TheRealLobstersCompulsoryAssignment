import {Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import {DevTools} from "jotai-devtools";
import Navigation from "./Navigation.tsx";
import {useAtom} from "jotai";
import {ThemeAtom} from "../Atoms/ThemeAtom.tsx";
import Home from "./Home.tsx";
import {useEffect} from "react";
import PaperComponent from "./EntityComponent/PaperComponent.tsx";

const App = () => {

    const [theme] = useAtom(ThemeAtom);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    return (<>

        <Navigation/>
        <Toaster position={"bottom-center"}/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/papers" element={<PaperComponent />} />
        </Routes>
        <DevTools/>

    </>)
}
export default App;