import GetAllPaperComponent from "./Paper/GetAllPapers/GetAllPaperComponent.tsx";

export default function Home() {
  return (
    <div>
      <h1 className="menu-title text-5xl m-5">Welcome to Lobster paper!</h1>
      <p className="font-bold ">Welcome to the home page!</p>
        <GetAllPaperComponent/>
    </div>
  );
}