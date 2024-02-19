import {db} from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export default async function getTopics() {
  console.log("getting topics");
  const topics = [];
  try {
    const querySnapshot = await getDocs(collection(db, "topics"));
    querySnapshot.forEach((doc) => {
      topics.push(doc.data());
    });
    return topics;
  }
  catch (e) {
    console.log(e);
    return [];
  }
}
