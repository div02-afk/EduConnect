import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Navbar from './components/navbar';
import styles from '../styles';
export default function Discussion({navigation, onBackPress}){
    return (
        <>
        <View style = {styles.container}>
            <Text style ={styles.title} >Discussion</Text>
        </View>
        <Navbar navigation={navigation} />
        </>
    )
}