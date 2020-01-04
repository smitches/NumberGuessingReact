import React, {useState} from 'react'
import { View, 
	Text,
	StyleSheet,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const HomeScreen = props => {
	const [enteredValue,setEnteredValue] = useState('')
	const [confirmedValue, setConfirmedValue] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g,''))
	}

	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmedValue(false);
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
			Alert.alert(
				"Invalid Number!", 
				"Number has to be a number between 1 and 99", 
				[{ text: 'Okay', style : 'destructive', onPress : resetInputHandler}]);
			return
		}
		setConfirmedValue(true);
		setEnteredValue('');
		//all gets executed in next render cycle after function completes
		//all three happen together. or move to end for safety
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	}

	let confirmedOutput;

	if (confirmedValue) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText> You selected </BodyText>
				<NumberContainer> {selectedNumber} </NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}
				>
					START GAME
				</MainButton>
				
			</Card>
			)
	}

// breakingComment

	return(
<TouchableWithoutFeedback 
	onPress={()=> {
		Keyboard.dismiss();
	}}>
	<View style={styles.screen}>
		<TitleText style={styles.title}> Begin Game from Home </TitleText>
		<Card style={styles.inputContainer}>
			<BodyText>Select a Number</BodyText>
			<Input 
				style={styles.input} 
				blurOnSubmit 
				autoCapitalize='none' 
				autoCorrect={false}
				keyboardType="number-pad" 
				maxLength={2}
				onChangeText={numberInputHandler}
				value={enteredValue}
				/>
			<View style={styles.buttonContainer}>
				<View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
				<View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
			</View>
		</Card>
		{confirmedOutput}
	</View>		
</TouchableWithoutFeedback>
		);
};

// breakingComment

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'flex-start', // default
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold',//defined in app.js
	},
	inputContainer:{
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
	},
	buttonContainer:{
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15,
	},
	button: {
		width: 100,
	},
	input: {
		width: 50,
		textAlign: 'center',
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center',
	},
	text: {
		fontFamily: 'open-sans-bold',
	}
});

export default HomeScreen;