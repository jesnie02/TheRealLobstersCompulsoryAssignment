import { useAtom } from "jotai";
import { CartAtom } from "../../Atoms/CartAtom.tsx";

interface AddToCartButtonProps {
    paper: any;
}

export default function AddToCartButton({ paper }: AddToCartButtonProps) {
    const [, setCart] = useAtom(CartAtom);

    const addToCart = (paper: any) => {
        setCart((prevCart) => [...prevCart, paper]);
        alert(`${paper.name} added to cart!`);
    };

    return (
        <button className="btn btn-outline mt-1" onClick={() => addToCart(paper)}>
            Add to cart
        </button>
    );
}