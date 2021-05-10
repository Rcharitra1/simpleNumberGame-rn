import React, {useState, useRef, useEffect} from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const getRandomNumber=(min, max, exclude)=>
{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndM = Math.floor(Math.random() * (max-min))+min;

    if(rndM===exclude)
    {
        return getRandomNumber(min, max, exclude);
    }else
    {
        return rndM;
    }
}

const GameScreen = (props)=>{


    const [currentGuess, setCurrentGuess]=useState(getRandomNumber(1, 100, props.userChoice));
    console.log(currentGuess);
    const [noOfGuess, setNoOfGuess]=useState(0);
    const currentLow = useRef(1);
    const currentMax = useRef(100);
  

    const handleNextGuess=(direction)=>
    {
        if((direction==='L' && currentGuess<props.userChoice) || (direction=='G' && currentGuess>props.userChoice))
        {

            Alert.alert('Liar','Try again', [{text:'Retry', style:'cancel'}])
        }
       else
        {
            if(direction==='L')
            {
             
               currentMax.current = currentGuess;
            }else
            {
                currentLow.current=currentGuess
            }

            console.log(currentLow);
            console.log(currentMax)

            const numberGuessed=getRandomNumber(currentLow.current, currentMax.current, currentGuess);
            setCurrentGuess(numberGuessed);
            let totalGuess = noOfGuess;
            totalGuess++;
            setNoOfGuess(totalGuess);
        }
       

    }

    useEffect(()=>{
        if(currentGuess===props.userChoice)
        {
            props.handleGameOver(noOfGuess);
        }

    })

    return(
        <View style={styles.screen}>
            <Text style={styles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={()=>{handleNextGuess('L')}}/>
                <Button title="Greater" onPress={()=> {handleNextGuess('G')}}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({

    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'

    },
    title:{
        fontSize:22
        
    }


})


export default GameScreen;
