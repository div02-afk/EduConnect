import {db} from '../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";


export default async function addUser(email, name, password) {
    await setDoc(doc(db, "users", email), {
        email: email,
        name: name,
    });
    return "Success";
}