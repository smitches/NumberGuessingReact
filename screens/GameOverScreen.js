import React from 'react'
import {View, StyleSheet, Button, Image, Text} from 'react-native';

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
	return (
<View style={styles.screen}>
	<TitleText> The Game is Over! </TitleText>
	<View style={styles.imageContainer}>
		<Image
			source={require('../assets/Images/success.png')} 
			// source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Mt._Everest_from_Gokyo_Ri_November_5%2C_2012_Cropped.jpg'}}
			style={styles.image} 
			fadeDuration={1000} />
	</View>
	<View style={styles.resultContainer}>
		<BodyText style={styles.resultText}> Your phone only needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds
			 to guess your unique number
			 of <Text style={styles.highlight}>{props.userNumber}</Text>
		</BodyText>
	</View>
	<MainButton onPress={props.onRestart} > New Game </MainButton>
</View>
		)
}
//break comment

const styles = StyleSheet.create(
{
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	//downloaded files have unknown width and height.
	//local files if sized perfectly can be ignored if right size
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover', //could also be contain
	},
	imageContainer:{
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth:3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: 30, //this is on exterior of item
	},
	highlight: {
		color: Colors.primary
	},
	resultContainer: {
		marginHorizontal: 20,
		marginVertical: 15,
	},
	resultText: {
		textAlign: 'center',
		fontSize: 20,
	}
})
//Text does wrap to next line and does inherit styles if wrapped in another text element

export default GameOverScreen;