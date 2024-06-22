import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Index from './src/Index';
import { globalStyles } from './src/components/styles';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <SafeAreaView style={globalStyles.containerApp}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
