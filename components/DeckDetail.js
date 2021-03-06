import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { getDeck } from "../helpers/repository";

export default class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const deck = navigation.getParam('deckTitle', 'Deck');
    return {
      title: deck
    };
  };
  
  state = {
    deck: {}
  }
  
  componentDidMount() {
    this._navListener = this.props.navigation.addListener('willFocus', () => {
       const deckTitle = this.props.navigation.getParam('deckTitle', 'Deck');
       if (deckTitle) {
         getDeck(deckTitle).then(deck => this.setState({ deck }));
       }
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.deckNameText}>{deck.title}</Text>
          <Text style={styles.cardCountText}>{deck.cardCount} cards</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={() =>
            this.props.navigation.navigate('NewCard', { deckTitle: deck.title })}>
            <Text style={styles.cardCountText}>New Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() =>
            this.props.navigation.navigate('QuizPage', { deckTitle: deck.title })}>
            <Text style={styles.cardCountText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFF3',
    padding: 20,
    flex: 1,
    justifyContent: 'space-around'
  },
  deckNameText: {
    textAlign: 'center',
    fontSize: 64,
    color: '#A593E0',
    fontWeight: '200',
  },
  cardCountText: {
    fontSize: 24,
    textAlign: 'center',
    color: '#566270',
    fontWeight: '300',
  },
  button: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#A593E0',
    margin: 5,
    padding: 10,
  },
});