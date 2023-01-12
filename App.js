import React,{Component,useEffect} from 'react';
import{View,Text,Platform,StatusBar} from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import HomeScrn from './src/components/HomeScrn';
import Header from './src/components/Header';
import AddTaskScrn from './src/components/AddTaskScrn';
import EditTaskScrn from './src/components/EditScreen';
import Test from './src/components/Test';

const Stack = createStackNavigator();

const App = () =>{

  useEffect(() => {
    StatusBar.setBarStyle('dark-content',true)
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)
  },[])

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
         {/* <Stack.Screen name="Test" component ={Test}/> */}
        <Stack.Screen name="Home" component ={HomeScrn}/>
        <Stack.Screen name='AddTaskScrn' component={AddTaskScrn}/>
        <Stack.Screen name='EditTaskScrn' component={EditTaskScrn}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;