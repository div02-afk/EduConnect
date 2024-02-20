/*
title:
link:
description:
type:
subtopic:
subtopicPriority:
*/

import { db } from "../firebaseConfig";
import { collection,getDocs } from "firebase/firestore";

export default async function getTopicInfo(topic) {
    const querySnapshot = await getDocs(collection(db, topic));
    const topics = [];
    querySnapshot.forEach((doc) => {
        topics.push(doc.data());
    });
    console.log("getting info for topic: " + topic);
    return topics;

}