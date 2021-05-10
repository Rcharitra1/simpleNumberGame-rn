import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


export default function App() {
  const [userNumber, setUserNumber]=useState();
  const [guessRounds, setGuessRounds]=useState(0);

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
    renderScreen=<GameOverScreen numbOfRounds={guessRounds} handleRestart={handleRestart}/>
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
