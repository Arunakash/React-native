import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react'; 
import {View,Text,Image,ActivityIndicator} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { TouchableRipple,Snackbar } from 'react-native-paper';



const SignIn = (props) =>{
    const [isEmailTextInputFocuse,setIsEmailTextInputFocuse] = useState(false);
    const [isPwdTextInputFocuse,setIsPwdTextInputFocuse] = useState(false);
    const[email,setEmail] = useState('');
    const[pwd,setPwd] = useState('');
    const[isLoaderVisible,setIsLoaderVisible] = useState(false);
    const[visibleSnackBar,setVisibleSnackBar] = useState(false);
    const signIn = async() =>{
      const auth = JSON.parse(await AsyncStorage.getItem('userAuthValue'));
      if(auth){
      if(auth.confirmPwd === pwd && auth.email === email){
        console.log("paa")
        setIsLoaderVisible(true)
       setTimeout(()=>{ props.navigation.replace("Home")},2000)
      }else{
        console.log("faa")
         setVisibleSnackBar(true)
      }
    }else{
      setVisibleSnackBar(true)
    }
    }
    const onDismissSnackBar = () => setVisibleSnackBar(false);
    const setStateEmail =(text) =>{
      setEmail(text)
    }
    const setStatePwd = (text) =>{
        setPwd(text)
    }
    return (
        <View name="screen-contnt-hldr" style={{flex:1,backgroundColor:"#fff"}}>
               <ScrollView>
            <View name="contnt-hldr">
              <View name="icon-hldr" style={{alignItems:"center",justifyContent:"center",paddingTop:110,paddingBottom:60}}>
                <Text style={{fontSize:38,fontWeight:"bold",color:"#6A5ACD"}}>Sign In</Text>
              </View>
              <View name={"form-container"}>
                 <View style={{paddingHorizontal:20,paddingVertical:20}} name="form-row1">
                   <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isEmailTextInputFocuse?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">       
                     <TextInput onFocus={()=>{setIsEmailTextInputFocuse(true)}} onChangeText={(text)=>{setStateEmail(text)}} onBlur={() =>{setIsEmailTextInputFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="E-mail/Phone"></TextInput>
                   </View>
                 </View>
                 <View style={{paddingHorizontal:20,paddingVertical:20}}name="form-row2">
                 <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isPwdTextInputFocuse?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                 <TextInput onFocus={()=>{setIsPwdTextInputFocuse(true)}} onChangeText={(text)=>{setStatePwd(text)}} onBlur={() =>{setIsPwdTextInputFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="Password" secureTextEntry={true}></TextInput>
                   <View></View>
                 </View>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:100}}name="form-row2">
                <TouchableRipple rippleColor='#fff'  onPress={()=>{signIn()}} borderless={true} style={{height:50,borderRadius:20}}>
                   <View style={{backgroundColor:'#fff',backgroundColor:"#6A5ACD",alignItems:"center",justifyContent:"center",borderRadius:20,height:50,shadowOpacity: 0.2,shadowRadius: 3,}} name="Submit-btn">
                      <Text style={{fontSize:15,fontWeight:"bold",color:"#fff"}}>Submit</Text>
                   </View>
                 </TouchableRipple>
                 </View>
                 <View style={{alignItems:'center',justifyContent:'center',paddingTop:100}}>
                    <Text>Don't have an accout? <Text style={{fontWeight:"bold",color:"#6A5ACD"}} onPress={() =>{props.navigation.navigate("SignUp")}}> Sign-Up</Text></Text>
                 </View>
              </View>
            </View>
            </ScrollView>
            {isLoaderVisible?<ActivityIndicator animating={true} color="#6A5ACD" style={{position:'absolute',top:0,left:0,bottom:0,right:0}} size={"large"} ></ActivityIndicator>:<></>}
            <Snackbar duration={2000} visible={visibleSnackBar}  onDismiss={onDismissSnackBar}><Text style={{textAlign:'center',color:"#fff"}}>Not a registered user !</Text></Snackbar>
        </View>
        
    )
}

export default SignIn;