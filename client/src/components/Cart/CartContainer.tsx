import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom"; // Make sure the path is correct

export default function CartContainer() {
    const [cart, setCart] = useAtom(CartAtom);

    const removeItem = (index: number) => {
        setCart(cart.filter((_, i) => i !== index)); // Remove item by index
    };

    return (
        <div>
            <h1 className="text-5xl m-5">Shopping Cart</h1>
            {cart.length > 0 ? (
                <ul className="cart-list">
                    {cart.map((paper, index) => (
                        <li key={index} className="cart-item">
                            <h2>{paper.name}</h2>
                            <p>Price: ${paper.price}</p>
                            <button onClick={() => removeItem(index)} className="btn btn-danger">
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}