import {useNavigate} from "react-router-dom";

export default function ProductCard({product}) {
    const {id, title, price, category, image} = product;
    const navigator = useNavigate();

    return (
        <li key={id}
            className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
            onClick={() => navigator(`/products/${id}`, {state: {product}})}>
            <img className="w-full" src={image} alt={title}/>
            <div className="mt-2 px-2 text-lg flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <span>{`₩${price.toLocaleString("ko-KR")}`}</span>
            </div>
            <p className="p-2 mb-2 text-gray-600">{category}</p>
        </li>
    );
}
