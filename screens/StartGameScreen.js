import React, {useState} from 'react';
import { View, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card'
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

const StartGameScreen =(props)=>{
    const [enteredValue, setEnteredValue]=useState('');
    const [confirm, setConfirmed]=useState(false);

    const [selectedNumber, setSelectedNumber]=useState();

    const handleNumberInput = (val)=>{
        setEnteredValue(val.replace(/[^0-9]/g, ''));   
    }
    const handleResetInput = ()=>{
        setEnteredValue('');
        setConfirmed(false);
    }

    const handleConfirmInput=()=>{
        const chosenNumber = parseInt(enteredValue);

        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber >= 100)
        {
            Alert.alert('Invalid Number', 'Number has to be  between 1 and 99', [{text:'Okay', style:'destructive', onPress:handleResetInput}]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue))
        setEnteredValue('');
        Keyboard.dismiss();    

    }
    let confirmedOutput;
    if(confirm){
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
        <Text>Chosen Number</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
         <MainButton onPress={()=>props.handleStartGame(selectedNumber)}>Begin</MainButton>
        </Card>
      
    }
    return(
        <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}>
        <View style={styles.screen}>
            <Text style={styles.title}>The Game Screen</Text>
            <Card style={styles.inputContainer}>
            <Text>Enter a number</Text>
            <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={handleNumberInput} value={enteredValue}/>
            <View style={styles.buttonContainer}>
            <View style={styles.button}>
            <Button title="Confirm" color={Colors.primary} onPress={handleConfirmInput}/>
            </View>
            <View style={styles.button}>
            <Button title="Reset" color={Colors.secondary}  onPress={handleResetInput}/>
            </View>
            </View>
            </Card>
            {confirmedOutput}

        </View>
        </TouchableWithoutFeedback>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center',
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },

    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center'
        
    },
   
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15
    },

    button:{
        width:'40%'
    },

    input : {
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    }
});