import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';


const GameOverScreen = props =>{
    console.log(props.numOfRounds)
    return (
        <View>
            <Card style={styles.container}>
            <Text style={styles.title}>Game Over</Text>
            <Text>Opponent took:</Text>
            <NumberContainer>{props.numbOfRounds}</NumberContainer>
            <Button title='Play Again' onPress={props.handleRestart}/>
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

    }

});

export default GameOverScreen;