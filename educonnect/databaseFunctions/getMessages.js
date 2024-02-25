import { db } from "../firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import store from "../store/store";

export default async function getMessages(topicName) {
  const messages = [];
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "topics", topicName, "messages"),
        orderBy("timestamp")
      )
    );

    querySnapshot.forEach((doc) => {
      messages.push(doc.data());
      messages[messages.length - 1].timestamp = messages[
        messages.length - 1
      ].timestamp
        .toDate()
        .toString();
    });

    store.dispatch({ type: "SET_MESSAGES", payload: { messages: messages } });
  } catch (e) {
    console.log(e);
    return [];
  }
}
