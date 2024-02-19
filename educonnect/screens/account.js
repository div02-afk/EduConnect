import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Navbar from './components/navbar';
import styles from '../styles';
export default function Account({navigation, onBackPress}){
    return (
        <>
        <View style = {styles.container}>
            <Text style ={styles.title} >Account</Text>
        </View>
        <Navbar navigation={navigation} />
        </>
    )
}