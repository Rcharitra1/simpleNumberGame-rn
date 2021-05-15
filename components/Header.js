import React from 'react';

import {View, Text, StyleSheet, Platform} from 'react-native';

import Colors from '../constants/colors';


const Header = props =>{
    return(
        <View style={{...styles.headerBase, ...Platform.select({ios: styles.headerIOS, android: styles.headerAndroid})}}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );

};

export default Header;


const styles = StyleSheet.create({
    headerBase:{
        width:"100%",
        height:90,
        paddingTop:36,
        alignItems:'center',
        justifyContent:'center',
     
    },
    headerIOS:{
        borderBottomColor: '#ccc',
        borderWidth:1,
        backgroundColor:'transparent'
    },
    headerAndroid:{
        backgroundColor:Colors.primary,
    },
    title:{
        color:'black',
        fontSize:18,
        fontWeight:'bold',
        color: Platform.OS==='ios'? Colors.primary : 'black'
    }
});