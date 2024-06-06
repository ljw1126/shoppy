import {get, getDatabase, ref, set} from "firebase/database";
import {app} from "./firebase_config";
import {v4 as uuid} from "uuid";

const database = getDatabase(app);

export async function adminUser(user) {
    return get(ref(database, 'admins'))
        .then((snapshot) => {

        if(snapshot.exists()) {
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
        price : parseInt(product.price),
        image,
        options: product.options.split(",")
    });
}

