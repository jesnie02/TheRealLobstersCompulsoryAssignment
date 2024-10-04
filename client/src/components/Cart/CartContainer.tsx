import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";

export default function CartContainer() {
    const [cart, setCart] = useAtom(CartAtom);

    const removeItem = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, paper) => total + (paper.price * paper.quantity), 0).toFixed(2);
    };

    return (
        <div>
            <h1 className="text-5xl m-5">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div>
                    <ul className="cart-list">
                        {cart.map((paper, index) => (
                            <li key={index} className="cart-item">
                                <h2>{paper.quantity} x {paper.name}</h2>
                                <p>Price: ${(paper.price * paper.quantity).toFixed(2)}</p> {/* Display total price for each item */}
                                <button onClick={() => removeItem(index)} className="btn btn-danger">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h2>Total: ${calculateTotalPrice()}</h2> {/* Display total price for the cart */}
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}