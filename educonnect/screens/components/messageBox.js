import { View,Text,StyleSheet } from "react-native";
import store from "../../store/store";
import React from "react";
import styles from "../../styles";
export default function MessageBox({message,sender}){
    // console.log(info);
    
    const name = store.getState().name;
    const isSender = name === sender;
    return(
        <View style = {isSender&&{alignItems:"flex-end"}}>
        <View style = {[styles.messageBox,{borderRadius:20,width:"auto",padding:10,maxWidth:"60%"},isSender&&{backgroundColor:"#00308F"}]}>
            <View>
                <Text style={styles.senderTitle}>{sender}</Text>
            </View>
            <View>
                <Text style = {styles.messageText}>{message}</Text>
            </View>
        </View>
        </View>
    )
}

