import GetAllPaperComponent from "./Paper/GetAllPaperComponent.tsx";

export default function Home() {
    return (
        <div>
            <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/assets/WebBackGround.webp')" }}>
                <div className="flex items-center justify-center min-h-screen">
                    <h1 className="menu-title text-5xl m-5 text-white bg-black bg-opacity-50 p-10 rounded-lg shadow-lg">
                        Welcome to Lobster paper!
                    </h1>
                </div>
            </div>
            <div>
                <GetAllPaperComponent />
            </div>
        </div>
    );
}