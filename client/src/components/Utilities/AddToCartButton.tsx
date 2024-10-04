import { useState } from "react";
import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom.tsx";

interface AddToCartButtonProps {
    paper: any;
}

export default function AddToCartButton({ paper }: AddToCartButtonProps) {
    const [, setCart] = useAtom(CartAtom);
    const [quantity, setQuantity] = useState<number | "">(1); // Initialize quantity state

    const addToCart = (paper: any) => {
        const paperWithQuantity = { ...paper, quantity: Number(quantity) }; // Add quantity to paper object
        setCart((prevCart) => [...prevCart, paperWithQuantity]);
        alert(`${paper.name} added to cart!`);
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuantity(value === "" ? "" : Number(value)); // Update quantity state
    };

    return (
        <div>
            <div>
                <label>
                    Quantity:
                </label>
                <input
                    type="number"
                    id="stock"
                    value={quantity}
                    onChange={handleQuantityChange} // Update quantity state
                    min="1"
                    className="shadow appearance-none border rounded w-full py-2 px-3 max-w-40 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <button className="btn btn-outline mt-1" onClick={() => addToCart(paper)}>
                Add to cart
            </button>
        </div>
    );
}