import Menu from "./Menu.tsx";


const AdminDashboard = () => {
    return (
        <>
        <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="text-4xl">Admin Dashboard</h1>
            <p className="text-2xl">Welcome, Admin! Here you can manage the application.</p>
        </div>
        <br />
            <Menu />

        </>
    );
};

export default AdminDashboard;
