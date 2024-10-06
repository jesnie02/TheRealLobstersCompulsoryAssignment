import { useState } from "react";
import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom.tsx";
import { PapersAtom } from "../../Atoms/PapersAtom.tsx";

interface AddToCartButtonProps {
    paper: any;
}

export default function AddToCartButton({ paper }: AddToCartButtonProps) {
    const [, setCart] = useAtom(CartAtom);
    const [quantity, setQuantity] = useState<number | "">(1);
    const [papers, setPapers] = useAtom(PapersAtom);

    const addToCart = async (paper: any) => {
        const paperWithQuantity = { ...paper, quantity: Number(quantity) };
        setCart((prevCart) => [...prevCart, paperWithQuantity]);
        const newStock = paper.stock - Number(quantity);
        setPapers(papers.map(p =>
            p.id === paper.id
                ? { ...p, stock: newStock }
                : p
        ));
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

            <button className="btn btn-outline mt-4" onClick={() => addToCart(paper)} disabled={paper.stock < quantity}>
                Add to cart
            </button>
        </div>
    );
}