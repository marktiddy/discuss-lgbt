// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { AntDesign } from '@expo/vector-icons';
import { Provider } from './Context';
import {
  useFonts,
  Roboto_300Light,
  Roboto_500Medium,
} from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuItem from './Components/menuItem';
import DiscussionView from './DiscussionView';
import FavouritesView from './FavouritesView';
import WebViewScreen from './WebViewScreen';

import UsefulInfo from './UsefulInfo';
import { questions } from './data/questions';

let topColor = '#86007d';

const HomeScreen = ({ navigation }) => {
  const [favourites, setFavourites] = useState([]);
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const openUrl = (url) => {
    Linking.openURL(url);
  };

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
            Pick A Question Pack To Start
          </Text>
          {questions.map((q) => {
            return (
              <TouchableOpacity
                key={q.title}
                onPress={(setFavourites) => {
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Favourites');
            }}
          >
            <MenuItem title="Your Favourites" color="#ed5564" />
          </TouchableOpacity>

          <View style={styles.sites}>
            <TouchableOpacity onPress={() => navigation.navigate('UsefulInfo')}>
              <Text style={styles.siteTitle}>Useful Websites and Info</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: '',
              headerStyle: {
                backgroundColor: '#ED5564',
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
          <Stack.Screen
            name="Favourites"
            component={FavouritesView}
            options={{
              title: 'Favourite Questions',
              headerStyle: {
                backgroundColor: topColor,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="UsefulInfo"
            component={UsefulInfo}
            options={{
              title: 'Useful Info',
              headerStyle: {
                backgroundColor: '#AC92EB',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          <Stack.Screen
            name="WebViewComp"
            component={WebViewScreen}
            options={{
              title: 'Useful Website',
              headerStyle: {
                backgroundColor: '#AC92EB',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebebeb',
    paddingTop: 15,
  },
  scrollview: {
    marginHorizontal: 20,
    paddingTop: 15,
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'Roboto_500Medium',
    color: '#ED5564',
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
    color: '#ED5564',
    fontFamily: 'Roboto_500Medium',
  },
  sites: {
    backgroundColor: '#ED5564',
    marginTop: 20,
    textAlign: 'center',
    borderRadius: 3,
    padding: 6,
  },
  siteTitle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  siteLink: {
    color: '#ED5564',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  siteSocial: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  siteSocialIcon: {
    color: 'white',
    fontSize: 35,
  },
  divider: {
    height: 50,
  },
});

export default App;
