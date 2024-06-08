import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import Button from "../components/ui/Button";
import useCarts from '../hooks/useCarts';

export default function ProductDetail() {
    const {
        state: {
            product: {id, image, title, description, category, price, options}
        }
    } = useLocation(); // navigator에 state 속성으로 전달 가능
    const [selected, setSelected] = useState(options && options[0]);
    const [quantity, setQuntity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(price);
    const [success, setSuccess] = useState();
    const {addCart} = useCarts();

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    const handleCart = (e) => {
        e.preventDefault();

        const product = {id, image, title, price, option: selected, quantity, totalPrice}
        addCart.mutate({product}, {
            onSuccess: () => {
                setSuccess("성공적으로 카트에 추가되었습니다.");
                setTimeout(() => setSuccess(null), 4000);
            }
        })
    }

    const handlePlus = () => {
        const increase = quantity + 1;
        setQuntity(increase);
        setTotalPrice(increase * price);
    }

    const handleMinus = () => {
        if (quantity >= 2) {
            const decrease = quantity - 1;
            setQuntity(decrease);
            setTotalPrice(decrease * price);
        }
    }

    return (
        <>
            <p className="mx-12 mt-4 text-gray-500">{category}</p>
            <section className="flex flex-col md:flex-row p-4">
                <img className="w-full px-4 basis-7/12" src={image} alt={title}/>
                <div className="w-full basis-5/12 flex flex-col p-4">
                    <h2 className="text-3xl font-bold py-2">{title}</h2>
                    <p className="text-2xl font-bold py-2 border-b border-gray-400">{`₩${totalPrice.toLocaleString("ko-KR")}`}</p>
                    <p className="my-2 text-sm">{description}</p>
                    <div className="flex items-center my-2">
                        <label className="text-brand font-bold"
                               htmlFor="select">옵션</label>
                        <select id="select"
                                className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
                                onChange={handleSelect}
                                value={selected}>
                            {options && options.map((option, index) => <option key={index} value={option}>{option}</option>)}
                        </select>
                    </div>
                    <div className="my-2 flex justify-between items-center">
                        <div className="text-brand font-bold">수량</div>
                        <div>
                            <button
                                className="text-3xl border p-2 rounded-full mx-2 w-14 hover:bg-gray-100"
                                onClick={() => handlePlus()}>+
                            </button>
                            <span className="text-3xl">{quantity}</span>
                            <button
                                className="text-3xl border p-2 rounded-full mx-2 w-14 hover:bg-gray-100"
                                onClick={() => handleMinus()}>-
                            </button>
                        </div>
                    </div>
                    {success && <p className="my-2">{success}</p>}
                    <Button text={"장바구니 추가"} onClick={handleCart}/>
                </div>
            </section>
        </>
    );
}
