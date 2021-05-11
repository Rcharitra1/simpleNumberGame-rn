import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';

import * as Font from 'expo-font';
// import {AppLoading} from 'expo';

import  AppLoading from 'expo-app-loading';


import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = ()=>
{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}



export default function App() {
  const [userNumber, setUserNumber]=useState();
  const [guessRounds, setGuessRounds]=useState(0);
  const [fontLoaded, setFontLoaded]=useState(false);




  const handleStartGame=(val)=>{
    setUserNumber(val);
  }

  const handleGameOver = (val)=>{
    setGuessRounds(val);
  }

  const handleRestart = ()=>{
    setUserNumber();
    setGuessRounds(0);
    renderScreen=<StartGameScreen handleStartGame={handleStartGame}/>
  }

  let renderScreen=<StartGameScreen handleStartGame={handleStartGame}/>

  if(userNumber)
  {
    renderScreen=<GameScreen userChoice={userNumber} handleGameOver={handleGameOver}/>
  }

  if(guessRounds>0)
  {
    renderScreen=<GameOverScreen numbOfRounds={guessRounds} handleRestart={handleRestart} userNumber={userNumber}/>
  }



 


  if(!fontLoaded)
  {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={()=> setFontLoaded(true)} onError={(err)=> console.log(err)}/>);
      
  }



 
    return (
      <View style={styles.screen}>
      <Header title={'Guess a number'}/>
      {renderScreen}
      </View>
    );





  


}

const styles = StyleSheet.create({
  screen:{
    flex :1
  }

});
