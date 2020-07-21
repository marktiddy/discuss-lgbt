import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const DiscussionView = ({ route, navigation }) => {
  const { title, questions, color } = route.params;
  const [questionsUsed, setQuestionsUsed] = useState([]);
  const [questionNum, setQuestionNum] = useState();
  const [showEnd, setShowEnd] = useState(false);
  navigation.setOptions({
    title: title,
    headerStyle: {
      backgroundColor: color,
    },
  });

  const generateNumber = (max) => {
    return Math.floor(Math.random() * max);
  };

  const changeQuestion = () => {
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

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[styles.container, { backgroundColor: color }]}>
        <View style={styles.largeBox}>
          <Text style={styles.mainText}>
            {showEnd
              ? 'There are no more questions in this section. Pick another section or click below to reset'
              : questions[questionNum]}
          </Text>
        </View>
        <View style={styles.smallBox}>
          <TouchableOpacity
            onPress={() => (showEnd ? resetQuestions() : changeQuestion())}
          >
            <View style={styles.button}>
              <Text style={[styles.buttonText, { color: color }]}>
                {showEnd ? 'Reset Questions' : 'Next Question'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

DiscussionView.options = [{ title: 'hello' }];

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
});

export default DiscussionView;
