import React, { useState, useEffect, useContext } from 'react';
import { Context } from './Context';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const FavouritesView = ({ navigation }) => {
  const [questionsUsed, setQuestionsUsed] = useState([]);
  const [questionNum, setQuestionNum] = useState();
  const [showEnd, setShowEnd] = useState(false);
  const [loading, setLoading] = useState(true);
  const { favourites } = useContext(Context);

  let questions = favourites;

  navigation.setOptions({
    title: 'Favourite Questions',
    headerStyle: {
      backgroundColor: '#ED5564',
    },
  });

  //Pull questions from secure store
  const getQuestions = async () => {
    let loadedQuestions = await SecureStore.getItemAsync('favourites');
    if (loadedQuestions != null) {
      loadedQuestions = JSON.parse(loadedQuestions);
      questions = loadedQuestions;
    }
    setLoading(false);
  };

  const generateNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const changeQuestion = async () => {
    //First check if we have already set favourites
    if (loading == true) {
      //First time
      await getQuestions();
    }

    if (questionsUsed.length === questions.length) {
      setQuestionsUsed([]);
      setShowEnd(true);
    } else {
      let newNum = generateNumber(questions.length);
      while (questionsUsed.indexOf(newNum) !== -1) {
        //Number is not unique so regenerate
        newNum = generateNumber(questions.length);
      }
      //Here we must have a unique number
      setQuestionNum(newNum);
      setQuestionsUsed([...questionsUsed, newNum]);
    }
  };

  const resetQuestions = () => {
    changeQuestion();
    setShowEnd(false);
  };

  useEffect(() => {
    changeQuestion();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.container, { backgroundColor: '#ED5564' }]}>
        <View style={styles.largeBox}>
          <Text style={styles.mainText}>
            {showEnd && questions.length > 1
              ? "That's all your favourite questions"
              : questions[questionNum]}
            {questions.length < 1
              ? "You haven't favourited any questions yet. Click the star at the top of a question to favourite it"
              : null}
          </Text>
        </View>
        <View style={styles.smallBox}>
          {questions.length < 1 ? null : (
            <TouchableOpacity
              onPress={() => (showEnd ? resetQuestions() : changeQuestion())}
            >
              <View style={styles.button}>
                <Text style={[styles.buttonText, { color: '#ED5564' }]}>
                  {showEnd ? 'Reset Questions' : 'Next Question'}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

FavouritesView.options = [{ title: 'hello' }];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  button: {
    marginBottom: 0,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Roboto_500Medium',
  },
  smallBox: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeBox: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loading: {
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
});

export default FavouritesView;
