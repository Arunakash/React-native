import React,{Component,useEffect,useState} from 'react';
import{View,Text,Platform,StatusBar} from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import HomeScrn from './src/components/HomeScrn';
import Header from './src/components/Header';
import AddTaskScrn from './src/components/AddTaskScrn';
import EditTaskScrn from './src/components/EditScreen';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplaScreen from './src/components/SplashScrn';


const Stack = createStackNavigator();

const App = () =>{
  const[isAuth,setIsAuth] = useState(false)
  const getAuth =  async () =>{
    const auth = JSON.parse(await AsyncStorage.getItem('userAuthValue'));
    if(auth){
      setIsAuth(true)
    }else{
      setIsAuth(false)
    }
  }
  useEffect(() => {
    StatusBar.setBarStyle('dark-content',true)
    StatusBar.setBackgroundColor("transparent")
    StatusBar.setTranslucent(true)
    getAuth()
  },[])

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Stack.Screen name = "Splash" component={SplaScreen}/>
        <Stack.Screen name="Home" component ={HomeScrn}/> 
        <Stack.Screen name ="SignIn" component={SignIn}/>
        <Stack.Screen name ="SignUp" component={SignUp}/>
        <Stack.Screen name='AddTaskScrn' component={AddTaskScrn}/>
        <Stack.Screen name='EditTaskScrn' component={EditTaskScrn}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;