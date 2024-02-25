import { db } from "../firebaseConfig";
import { doc, collection, addDoc, getDoc } from "firebase/firestore";
import store from "../store/store";
export default async function addMessage(topicName, message, type) {
  try {
    timestamp = new Date();
    const docRef = doc(db, "topics", topicName);
    const subCollection = collection(docRef, "messages");
    await addDoc(subCollection, {
      message: message,
      type: type,
      sender: store.getState().name,
      timestamp: timestamp,
    });
  } catch (e) {
    console.log(e);
  }
  console.log("Message added");
}
