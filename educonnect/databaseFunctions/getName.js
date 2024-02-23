import { db } from "../firebaseConfig";
import { collection, getDocs,query,where } from "firebase/firestore";
import store from "../store/store";
import {SET_NAME} from "../store/actionTypes";
export default async function getName(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    
    store.dispatch({ type: SET_NAME, payload: { name: doc.data().name } });
    const name = doc.data().name;
    return name;
  } else {
    return "John Doe";
  }
}
