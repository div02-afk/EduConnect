import React, { useEffect ,useState} from "react";
import { View, Text, Pressable, BackHandler ,Linking, ScrollView} from "react-native";
import styles from "../styles";
import Navbar from "./components/navbar";
import getTopicInfo from "../databaseFunctions/getTopicInfo";
import store from "../store/store";


function openLink(link) {
  Linking.openURL(link)
  .then((supported) => {
    if (!supported) {
      console.log("Can't handle url: " + link);
    } else {
      return Linking.openURL(link);
    }
  })
  .catch((err) => console.error('An error occurred', err));

}

export default function Topic({ route, navigation, onBackPress }) {
  const id = store.getState().currentTopic;
  const [topicInfo, setTopicInfo] = useState([]);
  useEffect(() => {
    getTopicInfo(id).then((result) => {
      // console.log("result:");
      console.log(result);
      
      setTopicInfo(result);
    });
  }, []);
  useEffect(() => {
    const backhandling = () => {
      if (onBackPress) {
        onBackPress(); // Call the onBackPress function from the props
      } else {
        navigation.goBack();
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backhandling);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backhandling);
    };
  }, [onBackPress, navigation]);
  const sortedArray = {};
  topicInfo.forEach((obj) => {
    const subtopicPriority = obj.subTopicPriority;
    if (!sortedArray[subtopicPriority]) {
      sortedArray[subtopicPriority] = [];
    }
    sortedArray[subtopicPriority].push(obj);
  });
  // console.log(sortedArray);
  // Step 3: Convert the object into an array of arrays
  const subTopicList = Object.values(sortedArray);
  // console.log(subTopicList);
  return (
    <>
      <View>
        <Text style={styles.title}>Topic for id {id}</Text>
        <View style = {styles.subTopicList} >
          {subTopicList.map((subtopic) => {
            return (
              <ScrollView style={{ flex: 1, flexDirection: "row" }}>
                {subtopic.map((link) => {
                  return (
                    <Pressable
                    style={{width:200,height:50,borderWidth:1,borderColor:"white"}}
                      onPress={() =>
                        openLink(link.link)
                      }
                    >
                      <Text style={[styles.text,{color:"#c6c6c6"}]}>{link.title}</Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
            );
          })}
        </View>
      </View>
      <Navbar navigation={navigation} />
    </>
  );
}
