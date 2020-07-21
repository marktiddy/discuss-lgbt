// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { AppLoading } from 'expo';
import {
  useFonts,
  Roboto_300Light,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuItem from './Components/menuItem';
import DiscussionView from './DiscussionView';
import { questions } from './data/questions';

let topColor = '#86007d';

const HomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.titleText}>Welcome to Discuss LGBTQ+</Text>
          <Text style={styles.mainText}>
            This app has been designed to help you have real conversations with
            others around sexuality and gender.
          </Text>
          <Text style={styles.mainText}>
            This app has 100 different questions (some serious, some less
            serious) and displays them at random…work through them with a friend
            or with a group! LGBTQ+ stands for Lesbian, Gay Bisexual, Trans,
            Queer/Questioning, Intersex, Asexual/Aromantic, Pansexual and all
            other queer identities.
          </Text>
          <Text style={[styles.mainText, styles.chooseText]}>
            Choose a category from below to get started
          </Text>
          {questions.map((q) => {
            return (
              <TouchableOpacity
                key={q.title}
                onPress={() => {
                  navigation.navigate('Discussion', {
                    title: q.title,
                    questions: q.questions,
                    color: q.color,
                  });
                }}
              >
                <MenuItem title={q.title} color={q.color} />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#86007d',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Discussion"
          component={DiscussionView}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: topColor,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    marginTop: 15,
  },
  scrollview: {
    marginHorizontal: 20,
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Roboto_500Medium',
    color: '#86007d',
    textAlign: 'center',
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    fontFamily: 'Roboto_300Light',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 15,
  },
  chooseText: {
    color: '#86007d',
    fontFamily: 'Roboto_500Medium',
  },
});

export default App;
