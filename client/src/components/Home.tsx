import {useInitializeData} from "../Hooks/useInitializeData.ts";

export default function Home() {

    useInitializeData();

    return (
        <div>
            <h1 className="menu-title text-5xl m-5">Welcome to LobsterPaper!</h1>
            <p className="font-bold">The best paper in the world!</p>
        </div>
    );
}