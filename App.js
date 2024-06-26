import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Quiz from './screens/Quiz';

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
       <Quiz/>
    </SafeAreaView>
  );
}


