import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../http.ts';

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await http.api.customerGetByEmail(email);
            if (response.status !== 200) throw new Error("Customer not found");

            const customerId = response.data.id;
            navigate(`/customer/${customerId}`);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="menu-title text-5xl m-5">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full max-w-xs mb-4"
                    required
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Login;