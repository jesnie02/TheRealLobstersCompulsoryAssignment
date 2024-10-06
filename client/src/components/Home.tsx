import GetAllPaperComponent from "./Paper/GetAllPapers/GetAllPaperComponent.tsx";

export default function Home() {
  return (
    <div>
        <div className="flex flex-col items-center">
            <h1 className="menu-title text-5xl m-5">Welcome to Lobster paper!</h1>
            <p className="font-bold">Buy some amazing paper products!</p>
        </div>
        <GetAllPaperComponent/>
    </div>
  );
}