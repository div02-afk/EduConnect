import {db} from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export default async function getName(email) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
        if (doc.data().email === email) {
            console.log(doc.data().name);
        return doc.data().name;
        
        }
    });
    return "Error";
}