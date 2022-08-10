import React from 'react'
import { Text, TouchableOpacity, StyleProp, StyleSheet, ViewStyle } from 'react-native';

interface Props{

    title:string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export const BlackButton = ({title,onPress,style = {}} : Props) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.9}
        style={{
            ...style as any,
            ...styles.BlackButton
        }}
    >
        <Text style={{color:'white', fontSize:15,textAlign:'center'}}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    BlackButton:{
        height: 60,
        width: 120,
        backgroundColor:'grey',
        borderRadius:50,
        justifyContent:'center',
        alignContent:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height: 3,
        },
        shadowOpacity:0.28,
        elevation:6
    }
})