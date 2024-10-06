import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom";
import { PapersAtom } from "../../Atoms/PapersAtom.tsx";
import CreateOrderButton from "../Utilities/CreateOrderButton.tsx";

export default function CartContainer() {
    const [cart, setCart] = useAtom(CartAtom);
    const [papers, setPapers] = useAtom(PapersAtom);

    const removeItem = (index: number) => {
        const paperToRemove = cart[index];
        setCart(cart.filter((_, i) => i !== index));
        // Restore the stock count when an item is removed from the cart
        setPapers(papers.map(paper =>
            paper.id === paperToRemove.id
                ? { ...paper, stock: paper.stock + paperToRemove.quantity }
                : paper
        ));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, paper) => total + (paper.price * paper.quantity), 0).toFixed(2);
    };

    return (
        <div className="fixed top-16 right-0 p-6 bg-white rounded-lg shadow-md w-96 h-full overflow-y-auto">
            <h1 className="text-5xl m-5 text-center font-bold">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div>
                    <ul className="cart-list space-y-4">
                        {cart.map((paper, index) => (
                            <li key={index} className="cart-item p-4 bg-lightGray rounded-lg shadow-sm flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-semibold">{paper.quantity} x {paper.name}</h2>
                                    <p className="text-lg">Price: ${(paper.price * paper.quantity).toFixed(2)}</p>
                                </div>
                                <button onClick={() => removeItem(index)} className="btn btn-danger bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-3xl font-bold mt-6">Total: ${calculateTotalPrice()}</h2>
                    <CreateOrderButton/>
                </div>
            ) : (
                <p className="text-xl text-center mt-6">Your cart is empty.</p>
            )}
        </div>
    );
}