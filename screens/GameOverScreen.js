import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import Card from '../components/Card';

import defaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton'



const GameOverScreen = props =>{
    return (
        <View>
            <Card style={styles.container}>
            <Text style={defaultStyles.titleText}>Game Over</Text>

            <Image 
            source={require('../assets/images/game-over.png')} 
            fadeDuration='1000'
            // source={{uri:'https://en.wikipedia.org/wiki/Summit#/media/File:Iv%C3%A1n_Ernesto_G%C3%B3mez_Carrasco_en_la_cima_del_Monte_Everest.jpg'}}
            style={styles.imageBox} resizeMode='contain'/>
            
            <Text style={defaultStyles.bodyText}>Opponent took<Text style={styles.highlight}> {props.numbOfRounds} </Text>guesses. The number was <Text style={styles.highlight}>{props.userNumber}.</Text></Text>
            <MainButton onPress={props.handleRestart}>New Game</MainButton>
            </Card>
        </View>);

};


const styles = StyleSheet.create({

    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        margin:20,
        alignItems:'center'
    },
    title:{

        fontSize:20,
        marginVertical:10
    },
    imageBox:{
        width:'80%',
        height:300
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans-bold'
    }

});

export default GameOverScreen;