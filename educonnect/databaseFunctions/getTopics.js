import {db} from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";

export default async function getTopics() {
  const topics = [];
  const querySnapshot = await getDocs(collection(db, "topics"));
  querySnapshot.forEach((doc) => {
    topics.push(doc.data());
  });
  return topics;
}
