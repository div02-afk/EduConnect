import { Linking } from 'react-native';

export default function openLink(link) {
    Linking.openURL(link)
    .then((supported) => {
      if (!supported) {
        console.log("Can't handle url: " + link);
      } else {
        return Linking.openURL(link);
      }
    })
    .catch((err) => console.error('An error occurred', err));
  
  }