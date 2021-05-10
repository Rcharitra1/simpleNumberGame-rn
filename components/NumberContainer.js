import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import  Colors  from '../constants/colors';



const NumberContainer = props => {

    return   (<View style={styles.container}>  
        <Text style={styles.number}>{props.children}</Text>    
    </View>);

};


export default NumberContainer;


const styles = StyleSheet.create({
    container:{
        borderWidth:2,
        marginVertical:10,
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        borderColor:Colors.secondary
    },
    number :{
        color: Colors.secondary,
        fontSize:22
    }
})
