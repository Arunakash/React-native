import React,{useState} from 'react'; 
import {View,Text,Image,ActivityIndicator} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { TouchableRipple,Snackbar } from 'react-native-paper';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = (props) =>{
    const [visible, setVisible] = useState(false);
    const [isFullNameFocused,setIsFullNameFocuse] = useState(false);
    const[isLoaderVisible,setIsLoaderVisible] = useState(false);
    const [isEmailTextInputFocuse,setIsEmailTextInputFocuse] = useState(false);
    const [isPhoneNumFocused,setIsPhoneNumFocused] = useState(false);
    const [isGenderFocused,setIsGenderFocused] = useState(false);
    const [isPwdTextInputFocuse,setIsPwdTextInputFocuse] = useState(false);
    const [isRePwdTextInputFocuse,setIsRePwdTextInputFocuse] = useState(false);
    const[fullName,setFullName] = useState('');
    const[emailAdress,setEmailAdress] = useState('');
    const[visibleSnackBar,setVisibleSnackBar] = useState(false);
    const[phoneNum,setPhoneNum] = useState('');
    const[gender,setGender] = useState('');
    const[password,setPwd] = useState(''); 
    const[rePassword,setRePwd] = useState('');
    const[isFulNameVaild,setIsFullNameVaild] = useState(false);
    const[isEmailVaild,setIsEmailValid] = useState(false);
    const[isPhNumValid,setIsPhNumValid] = useState(false);
    const[isPasswordValid,setIsPasswordValid] = useState(false);
    const[isPwdMatched,setIsPwdMatched] = useState(false);
    const nameRegex =  /^[a-zA-Z0-9#&()'\\\\s-]{2,40}/;
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z0-9]{2,50}$/;
    const phoneRegex = /^\d{10}$/;
    const genders =["MALE","FEMALE","OTHERS"]
    

   const setStateFullName = (name) =>{
      setFullName(name);
       if(nameRegex.test(name)){
        setIsFullNameVaild(true)
       }else{
        setIsFullNameVaild(true)
       }
    }

   const setStateEmailAdress = (email) =>{
        setEmailAdress(email)
       if(emailRegex.test(email)){
        setIsEmailValid(true)
       }else{
        setIsEmailValid(false)
       }
   }

   const setStatePhoneNum = (phNum) =>{
        setPhoneNum(phNum)
        if(phoneRegex.test(phNum)){
         setIsPhNumValid(true)
        }else{
        setIsPhNumValid(false)
         }
   }

   const setStateGender = (gender) =>{
       setGender(gender)
   }

   const setStatePassword = (pwd) =>{
      setPwd(pwd)
      if(rePassword){
        if(pwd === rePassword){
          setIsPwdMatched(true)
        }else{
          setIsPwdMatched(false)
        }
       }else{
        setIsPwdMatched(false)
       }
   }
   const setStateRePassword = (rePwd) =>{
    setRePwd(rePwd)
     if(password){
      if(rePwd === password){
        setIsPwdMatched(true)
      }else{
        setIsPwdMatched(false)
      }
     }else{
      setIsPwdMatched(false)
     }
   }

   const submit = () =>{
  
    let formData={ name:fullName,email:emailAdress,phNum:phoneNum,gndr:gender,confirmPwd:password};
    if(isFulNameVaild&&isEmailVaild&&isPhNumValid&&password&&isPwdMatched){
      setIsLoaderVisible(true)
      setUserAuthLocal(formData).then(res =>{
        setTimeout(function(){setIsLoaderVisible(false);props.navigation.navigate("SignIn")},2000)
      })
    }else{
      setVisibleSnackBar(true);
    }
   }
   const onDismissSnackBar = () => setVisibleSnackBar(false);
   const hideMenu = () => setVisible(false);
   const showMenu = () => setVisible(true);

    const setUserAuthLocal = async (userValue) =>{
      await AsyncStorage.setItem("userAuthValue", JSON.stringify(userValue));   
  }

    return (
        <View name="screen-contnt-hldr" style={{flex:1,backgroundColor:"#fff"}}>
               <ScrollView>
            <View name="contnt-hldr">
              <View name="icon-hldr" style={{alignItems:"center",justifyContent:"center",paddingVertical:70,paddingBottom:30}}>
                <Text style={{fontSize:38,fontWeight:"bold",color:"#6A5ACD"}}>Sign Up</Text>
              </View>
              <View name={"form-container"}>
                 <View style={{paddingHorizontal:20,paddingTop:20}} name="form-row1">
                   <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isFullNameFocused?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">       
                     <TextInput maxLength={25} onFocus={()=>{setIsFullNameFocuse(true)}} onChangeText={(text) =>{setStateFullName(text)}} onBlur={() =>{setIsFullNameFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="Full Name"></TextInput>
                   </View>
                 </View>
                 <View style={{paddingHorizontal:20,paddingTop:20}}name="form-row2">
                 <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isEmailTextInputFocuse?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                 <TextInput maxLength={50} onFocus={()=>{setIsEmailTextInputFocuse(true)}} onChangeText={(text) =>{setStateEmailAdress(text)}} onBlur={() =>{setIsEmailTextInputFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="Email-Address" ></TextInput>
                   <View></View>
                 </View>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:20}}name="form-row2">
                 <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isPhoneNumFocused?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                 <TextInput maxLength={10} keyboardType={'phone-pad'} onFocus={()=>{setIsPhoneNumFocused(true)}} onChangeText={(text) =>{setStatePhoneNum(text)}} onBlur={() =>{setIsPhoneNumFocused(false)}} style={{padding:0,paddingLeft:20}} placeholder="Phone"></TextInput>
                   <View></View>
                 </View>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:20,position:'relative'}}name="form-row2">
                  <TouchableRipple onPress={showMenu} style={{borderRadius:20,height:50}} rippleColor={"#fff"}>
                     <View style={[{backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderRadius:20,height:50},isGenderFocused?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                       <Text style={{paddingLeft:18,color:"gray"}}>{gender?gender:"Gender"}</Text>
                       <MaterialIcons name="arrow-drop-down" size={24} color="black" onPress={showMenu} style={{paddingRight:10}}/>
                    </View>
                 </TouchableRipple>
                 <Menu visible={visible} onRequestClose={hideMenu} style={{position:'absolute',left:40}}>
                    {genders.map((item,index) =>(
                       <TouchableRipple key={index} rippleColor={"#6A5ACD"} onPress={() =>{setStateGender(item),hideMenu()}}>
                       <View style={{width:200,padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text>{item}</Text>
                       </View>
                       </TouchableRipple>
                    ))}
                  </Menu>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:20}}name="form-row2">
                 <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isPwdTextInputFocuse?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                 <TextInput onFocus={()=>{setIsPwdTextInputFocuse(true)}} onChangeText={(text) =>{setStatePassword(text)}} onBlur={() =>{setIsPwdTextInputFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="Password" secureTextEntry={true}></TextInput>
                   <View></View>
                 </View>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:20}}name="form-row2">
                 <View style={[{backgroundColor:'#fff',justifyContent:"center",borderRadius:20,height:50},isRePwdTextInputFocuse?{borderColor:"#6A5ACD",borderWidth:2,elevation:6,shadowColor: '#6A5ACD',shadowOffset: {width: 4, height: 6},shadowOpacity: 0.4,shadowRadius: 3}:{borderColor:"#6A5ACD",borderWidth:1.5}]} name="TextInput-hldr">
                 <TextInput onFocus={()=>{setIsRePwdTextInputFocuse(true)}} onChangeText={(text) =>{setStateRePassword(text)}} onBlur={() =>{setIsRePwdTextInputFocuse(false)}} style={{padding:0,paddingLeft:20}} placeholder="Re-password" secureTextEntry={true}></TextInput>
                   <View></View>
                 </View>
                 </View>

                 <View style={{paddingHorizontal:20,paddingTop:40}}name="form-row2">
                <TouchableRipple rippleColor='#fff'  onPress={()=>{submit()}} borderless={true} style={{height:50,borderRadius:20}}>
                   <View style={{backgroundColor:'#fff',backgroundColor:"#6A5ACD",alignItems:"center",justifyContent:"center",borderRadius:20,height:50,shadowOpacity: 0.2,shadowRadius: 3,}} name="Submit-btn">
                      <Text style={{fontSize:15,fontWeight:"bold",color:"#fff"}}>Submit</Text>
                   </View>
                 </TouchableRipple>
                 </View>
                 
                 <View style={{alignItems:'center',justifyContent:'center',paddingTop:50}}>
                    <Text>Already have an accout? <Text style={{fontWeight:"bold",color:"#6A5ACD"}} onPress={() =>{props.navigation.navigate("SignIn")}}> Sign-In</Text></Text>
                 </View>
              </View>
              <Snackbar duration={2000} visible={visibleSnackBar}  onDismiss={onDismissSnackBar}><Text style={{textAlign:'center',color:"#fff"}}>Please enter valid Data in form</Text></Snackbar>
            </View>
            </ScrollView>
            {isLoaderVisible?<ActivityIndicator animating={true} color="#6A5ACD" style={{position:'absolute',top:0,left:0,bottom:0,right:0}} size={"large"} ></ActivityIndicator>:<></>}
        </View>
        
    )
}

export default SignUp;