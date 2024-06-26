import React, {useState} from "react";
import {uploadImage} from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
    const [product, setProduct] = useState({});
    const [file, setFile] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState();
    const {addProduct} = useProducts(); // custom hook

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === 'file') {
            setFile(files && files[0]);
            return;
        }

        setProduct((product) => ({...product, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);

        uploadImage(file)
            .then((url) => {
                addProduct.mutate({product, url}, {
                    onSuccess: () => {
                        setSuccess("성공적으로 제품이 추가되었습니다.");
                        setTimeout(() => setSuccess(null), 4000);
                    }
                });
            }).finally(() => setIsUploading(false));
    }

    return (
        <section className="w-full text-center">
            <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
            {success && <p className="my-2">{success}</p>}
            {file && <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local image"/>}
            <form
                className="flex flex-col px-12"
                onSubmit={e => handleSubmit(e)}
            >
                <input type="file"
                       name="file"
                       accept="image/*"
                       required
                       onChange={handleChange}
                />
                <input type="text"
                       value={product.title ?? ''}
                       name="title"
                       placeholder={"제품명"}
                       required
                       onChange={handleChange}
                />
                <input type="number"
                       value={product.price ?? ''}
                       name="price"
                       placeholder={"가격"}
                       required
                       onChange={handleChange}
                />
                <input type="text"
                       value={product.category ?? ''}
                       name="category"
                       placeholder={"카테고리"}
                       required
                       onChange={handleChange}
                />
                <input type="text"
                       value={product.description ?? ''}
                       name="description"
                       placeholder={"제품설명"}
                       required
                       onChange={handleChange}
                />
                <input type="text"
                       value={product.options ?? ''}
                       name="options"
                       placeholder={"옵션 (콤마(,)구분)"}
                       required
                       onChange={handleChange}
                />

                <Button
                    text={isUploading ? '업로드중...' : '제품 등록하기'}
                    disabled={isUploading}
                />
            </form>
        </section>);
}
