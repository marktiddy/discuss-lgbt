import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Context } from './Context';

const DiscussionView = ({ route, navigation }) => {
  const { favourites, setFavourites, saveFavourites } = useContext(Context);
  const { title, questions, color } = route.params;
  const [isFav, setIsFav] = useState(false);
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

  const changeQuestion = async () => {
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

      //See if our current question is a favourite
      if (favourites.length >= 1) {
        if (favourites.indexOf(questions[newNum]) !== -1) {
          //Question has been favourite
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      } else {
        setIsFav(false);
      }
    }
  };

  const resetQuestions = () => {
    changeQuestion();
    setShowEnd(false);
  };

  useEffect(() => {
    changeQuestion();
  }, []);

  const updateFavourites = () => {
    let existingFavourites = favourites;

    if (existingFavourites.indexOf(questions[questionNum]) == -1) {
      //Question isnt already a favourite, so add
      existingFavourites.push(questions[questionNum]);
      //Update our context
      setFavourites(existingFavourites);
      saveFavourites();
      setIsFav(true);
    } else {
      //Favourite exists so we remove it
      const index = existingFavourites.indexOf(questions[questionNum]);
      existingFavourites.splice(index, 1);
      setFavourites(existingFavourites);
      saveFavourites();
      setIsFav(false);
    }
  };

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
          <TouchableOpacity
            onPress={() => {
              updateFavourites();
            }}
            style={styles.favicon}
          >
            <AntDesign name={isFav ? 'star' : 'staro'} style={styles.favicon} />
          </TouchableOpacity>
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
  favicon: {
    color: 'white',
    fontSize: 32,
    position: 'absolute',
    top: 0,
    right: 0,

    padding: 10,
  },
});

export default DiscussionView;
