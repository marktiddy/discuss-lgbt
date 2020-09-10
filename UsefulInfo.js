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
import { AntDesign } from '@expo/vector-icons';

const sitesObject = [
  {
    name: 'OneBodyOneFaith',
    subtitle: 'A Christian LGBTQ+ organisation',
    link: 'https://onebodyonefaith.org.uk/',
  },
  {
    name: 'Inclusive Church',
    subtitle: 'Christian LGBTQ+ organisation with inclusive church finder',
    link: 'http://inclusive-church.org',
  },
  {
    name: 'Hidayah',
    subtitle: 'Muslim LGBTQ+ charity',
    link: 'https://www.hidayahlgbt.com/',
  },
  {
    name: 'UK Black Pride',
    subtitle: 'Black LGBTQ+ movement',
    link: 'https://www.ukblackpride.org.uk/',
  },
  {
    name: 'Regard',
    subtitle: 'LGBTQ+/Disability Charity',
    link: 'http://regard.org.uk',
  },
  {
    name: 'Switchboard',
    subtitle: 'Phone info line',
    link: 'http://switchboard.lgbt',
  },
  {
    name: 'The Albert Kennedy Trust',
    subtitle: 'Help for homeless LGBTQ+ young people',
    link: 'http://www.akt.org.uk',
  },
  {
    name: 'Stonewall',
    subtitle: 'LGBTQ+ Charity',
    link: 'http://www.stonewall.org.uk',
  },
  {
    name: 'Mermaids',
    subtitle: 'Trans charity',
    link: 'http://mermaidsuk.org.uk',
  },
  {
    name: 'Mind',
    subtitle: 'Mental Health Charity',
    link: 'http://www.mind.org.uk',
  },
];

const UsefulInfo = ({ navigation }) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.mainText}>
            A selection of useful sites to help you find out more about LGBTQ+
            and faith
          </Text>
          <View style={styles.sites}>
            <Text style={styles.siteTitle}>Find Us Online</Text>
            <TouchableOpacity
              onPress={() => openUrl('https://www.discusslgbtq.com')}
            >
              <Text style={styles.siteLink}>Our Website</Text>
            </TouchableOpacity>
            <View style={styles.siteSocial}>
              <TouchableOpacity
                onPress={() =>
                  openUrl('https://www.instagram.com/discusslgbtq/')
                }
              >
                <AntDesign name="instagram" style={styles.siteSocialIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openUrl('https://twitter.com/discusslgbtq')}
              >
                <AntDesign name="twitter" style={styles.siteSocialIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.siteTitle}>Other Useful Websites</Text>

            {sitesObject.map((m, i) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WebViewComp', {
                      showUrl: m.link,
                    })
                  }
                  key={i}
                >
                  <View style={styles.siteLink}>
                    <Text style={styles.siteLinkTitle}>{m.name}</Text>
                    <Text style={styles.siteLinkSub}>{m.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
    marginBottom: 0,
  },
  chooseText: {
    color: '#AC92EB',
    fontFamily: 'Roboto_500Medium',
  },
  sites: {
    backgroundColor: '#AC92EB',
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
    color: '#AC92EB',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  siteLinkTitle: {
    color: '#AC92EB',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  siteLinkSub: {
    color: '#AC92EB',
    textAlign: 'center',
    fontFamily: 'Roboto_500Medium',
    fontSize: 14,
    margin: 5,
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
    height: 2,
    backgroundColor: 'white',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UsefulInfo;
