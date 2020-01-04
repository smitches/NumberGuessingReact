import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import { AppLoading } from 'expo';

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  //returning a promise
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);

  const [dataLoaded,setDataLoaded] = useState(false);
  
  if (!dataLoaded){
    //must be a function that returns a promise
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)}
      onError={(err)=>console.log(err)} />;
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
    setRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setRounds(numOfRounds);
  }

  const configureNewGameHandler = () => {
    setRounds(0);
    setUserNumber(null); //falseish value
  }

  let content = <HomeScreen onStartGame={startGameHandler}/>
  content = (
    <GameOverScreen userNumber={12} roundsNumber={3} onRestart={configureNewGameHandler} />
  )
  if (userNumber && rounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }else if (rounds > 0){
    content = <GameOverScreen userNumber={userNumber} roundsNumber={rounds} onRestart={configureNewGameHandler} />
  }
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number'/>
      {content}
    </View>
  );
}

//break comment 

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
