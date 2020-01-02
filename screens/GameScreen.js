import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

//doesnt use any data from within the component
//if you dont rely on props or state put functions here
const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max-min)) + min
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	}
	return rndNum
}

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice))
	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	//useRef doesnt result in rerendering of component whereas useState does

	const { userChoice, onGameOver } = props; //pulls property names out
	//useEffect a react hook that allows side effects
	//allowing logic to run after render cycle
	//runs after its been rendered
	useEffect(() => {
		if (currentGuess === userChoice){
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver])
	//first argument is a function. second is dependencies. effect reruns if one of dependencies changes
	// because props changes constantly, dependency changes. we only want to reload if true dependency does

	const nextGuessHandler = direction => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) || 
			(direction === 'higher' && currentGuess > props.userChoice)
			) {
			Alert.alert('Don\'t lie!', 'You might get coal for Christmas if you do...', [{text:'Sorry!',style:'cancel'}]);
			return;
		}
		if (direction === 'lower'){
			currentHigh.current = currentGuess
		}
		else{
			currentLow.current = currentGuess
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
		setCurrentGuess(nextNumber) //rerenders component
		setRounds(curRounds => curRounds + 1)
	}

	return (
<View style={styles.screen}>
	<Text>Opponents Guess</Text>
	<NumberContainer> {currentGuess} </NumberContainer>
	<Card style={styles.buttonContainer}>
		<Button title='Lower' onPress={nextGuessHandler.bind(this, 'lower')} />
		<Button title='Higher' onPress={nextGuessHandler.bind(this, 'higher')} />
	</Card>
</View>
		);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer:{
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%'
	}
});

export default GameScreen;