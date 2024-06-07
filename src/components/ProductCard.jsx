export default function ProductCard({product}) {
    const {title, price, category, image} = product;
    return (
        <li className="rounded-lg shadow-md overflow-hidden cursor-pointer">
            <img className="w-full" src={image} alt={title}/>
            <div className="mt-2 px-2 text-lg flex justify-between items-center">
                <h3 className="truncate">{title}</h3>
                <span>{`₩${price.toLocaleString("ko-KR")}`}</span>
            </div>
            <p className="p-2 mb-2 text-gray-600">{category}</p>
        </li>
    );
}
