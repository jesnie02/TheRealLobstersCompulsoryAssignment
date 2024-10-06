import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DevTools } from 'jotai-devtools';
import Navigation from './Navigation.tsx';
import { useAtom } from 'jotai';
import { ThemeAtom } from '../Atoms/ThemeAtom.tsx';
import {useEffect} from "react";
import AdminApp from './Admin/AdminApp.tsx';
import Home from "./Home.tsx";
import CustomerApp from "./Customer/CustomerApp.tsx";
import LoginCustomer from "./Customer/LoginCustomer.tsx";
import CustomerById from "./Customer/CustomerById.tsx";
import OrderDetail from "./Order/OrderDetail.tsx";

const App = () => {
    const [theme] = useAtom(ThemeAtom);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div className={`app-container ${theme}`}>
            <Navigation />
            <Toaster position={"bottom-center"} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/adminDash/*" element={<AdminApp />} />
                <Route path="/customerDash/*" element={<CustomerApp />} />
                <Route path="/login-customer" element={<LoginCustomer />} />
                <Route path="/customer/:id" element={<CustomerById />} />
                <Route path="/order/:orderId" element={<OrderDetail />} />
            </Routes>
            <DevTools />
        </div>
    );
};

export default App;
