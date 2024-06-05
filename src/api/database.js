import {get, getDatabase, ref} from "firebase/database";
import {app} from "./firebase_config";

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
