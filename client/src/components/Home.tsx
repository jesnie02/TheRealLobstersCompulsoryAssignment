import PaperComponent from "./EntityComponent/PaperComponent.tsx";

export default function Home() {


    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Welcome to LobsterPaper!</h1>
            <p className="font-bold">The best paper in the world!</p>
            <PaperComponent/>
        </div>
    );
}