import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ route }) => {
  const url = route.params.showUrl;

  return <WebView source={{ uri: url }} />;
};
export default WebViewScreen;
