import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = (props)=>{
    return <View style={{...styles.card, ...props.style}}>{props.children}</View>
};

export default Card;


const styles = StyleSheet.create({
    card:{
        shadowColor:'grey',
        shadowOpacity:0.5,
        shadowRadius:6,
        shadowOffset:{
            height:4,
            width:0
        },
        backgroundColor:'white',
        elevation:4,
        padding:20,
        borderRadius:6
        
    },
});