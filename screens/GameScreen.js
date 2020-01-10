import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Button, Alert, ScrollView, FlatList} from 'react-native'
import { Ionicons } from '@expo/vector-icons' //go to expo documentation to look for other icon libraries and see examples

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
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

const renderListItem = (value, numOfRound) => (
		<View key={value} style={styles.listItem} >
			<BodyText>#{numOfRound}</BodyText>
			<BodyText>{value}</BodyText>
		</View>
)

const renderListItemFlatList = (listLength, itemData) => (
	<View style={styles.listItem} >
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
)

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice)
	const [currentGuess, setCurrentGuess] = useState(initialGuess)
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);
	//useRef doesnt result in rerendering of component whereas useState does

	const { userChoice, onGameOver } = props; //pulls property names out
	//useEffect a react hook that allows side effects
	//allowing logic to run after render cycle
	//runs after its been rendered
	useEffect(() => {
		if (currentGuess === userChoice){
			onGameOver(pastGuesses.length);
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
			currentLow.current = currentGuess + 1
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
		setCurrentGuess(nextNumber) //rerenders component
		setPastGuesses(curPastGuesses => [nextNumber.toString(),...curPastGuesses])
		// setRounds(curRounds => curRounds + 1)
	}

	return (
<View style={styles.screen}>
	<Text style={DefaultStyles.title}>Opponents Guess</Text>
	<NumberContainer> {currentGuess} </NumberContainer>
	<Card style={styles.buttonContainer}>
		<MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
			<Ionicons name="md-remove" size={24} color='white' />
		</MainButton>
		<MainButton onPress={nextGuessHandler.bind(this, 'higher')} >
		<Ionicons name="md-add" size={24} color='white' />
		</MainButton>
	</Card>
	<View style={styles.listContainer} >
		{/*<ScrollView contentContainerStyle={styles.list}>
		{pastGuesses.map((guess,index) => (renderListItem(guess, pastGuesses.length - index)))}
		</ScrollView>*/}
		<FlatList 
			keyExtractor={(item)=>item} 
			data={pastGuesses} 
			renderItem={renderListItemFlatList.bind(this, pastGuesses.length)} 
			contentContainerStyle={styles.list}
		/>
	</View>
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
		width: 400,
		maxWidth: '90%'
	},
	listItem: {
		padding: 15,
		marginVertical: 10,
		borderColor: '#ccc',
		borderWidth: 1,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
	},
	listContainer:{
		flex: 1, //necessary for android to work
		width: '60%'
	},
	list:{
		alignItems: 'center', //for cross axis
		justifyContent: 'flex-end',
		flexGrow: 1,
	}
});

export default GameScreen;