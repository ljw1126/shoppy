import {get, getDatabase, ref, remove, set, update} from "firebase/database";
import {app} from "./firebase_config";
import {v4 as uuid} from "uuid";

const database = getDatabase(app);

export async function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {

            if (snapshot.exists()) {
                const admins = snapshot.val();
                const isAdmin = admins.includes(user.uid);

                return {...user, isAdmin};
            }

            return user;
        })
}

// 소켓 통신
export async function addNewProduct(product, image) {
    const id = uuid();
    return await set(ref(database, `products/${id}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image,
        options: product.options.split(",")
    });
}

export async function getProducts() {
    return get(ref(database, 'products')).then(snapshot => {
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        }

        return [];
    });
}

export async function getCarts(uid) {
    return await get(ref(database, `carts/${uid}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }

            return {};
        })
}

/**
 * 1. 동일한 "상품_옵션" 있는 경우 update
 * 2. 없는 경우 카트에 상품 추가
 */
export async function addToCart(userId, product) {
    const cartRef = ref(database, `carts/${userId}/${getCartItemId(product)}`);

    await get(cartRef).then(snapshot => {
        if (snapshot.exists()) {
            const items = snapshot.val();
            const updatedQuantity = product.quantity + items.quantity;
            const updateTotalPrice = updatedQuantity * items.price;

            update(cartRef, {...items, quantity: updatedQuantity, totalPrice: updateTotalPrice});
            return;
        }

        set(cartRef, product);
    });
}

export async function updateToCart(userId, product) {
    await update(ref(database, `carts/${userId}/${getCartItemId(product)}`), product);
}

export async function removeFromCart(userId, product) {
    await remove(ref(database, `carts/${userId}/${getCartItemId(product)}`));
}

function getCartItemId(product) {
    return `${product.id}_${product.option}`;
}
