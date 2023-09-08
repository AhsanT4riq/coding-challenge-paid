import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import NewsScreen from './src/screens/NewsScreen';
import {Provider} from 'react-redux';
import {store} from './src/store';
import { News } from './src/feature/newsSlice';

export type RootStackParamList = {
  Home: undefined;
  News: {article: News};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="News" component={NewsScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
