import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useState,useEffect} from 'react';
import {View,Text,StatusBar} from 'react-native';


const SplaScreen = (props) =>{
    const[isAuth,setIsAuth] = useState(false)
    const getAuth =  async () =>{
      const auth = JSON.parse(await AsyncStorage.getItem('userAuthValue'));
      if(auth){
       setTimeout(()=>{props.navigation.replace("Home")},1000)
      }else{
        setTimeout(()=>{props.navigation.replace("SignIn")},1000)
      }
    }
    useEffect(() => {
      StatusBar.setBarStyle('dark-content',true)
      StatusBar.setBackgroundColor("transparent")
      StatusBar.setTranslucent(true)
      getAuth()
    },[])
    return(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:"#6A5ACD"}}>To Do App</Text>
    </View>)
}

export default SplaScreen;