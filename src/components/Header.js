import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text} from 'react-native';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  Octicons  from 'react-native-vector-icons/Octicons';
import {TouchableRipple} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = (props) =>{
    const [visible, setVisible] = useState(false);
    const [currentListIndex,setCurrentListIndx] = useState(0);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const state= useSelector((state) => state);
   
    const signOut = async () =>{ // need to add
        let data = await AsyncStorage.clear().then(res =>{
            props.navigation.navigate("SignIn")
        });
      }

    return(
        <View style={{overflow:'hidden',paddingBottom:5}}>
           <View name="header-container" style={styles.headerContainerStyle}>
            <View name="header-content" style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View name="row1" style={{flexDirection:'row',alignItems:'center'}}>
                   <Ionicons name="checkmark-circle" size={35} color="#6A5ACD" />
                   <Text style={{paddingHorizontal:10,fontSize:18,fontWeight:'bold'}}>All Lists</Text>
                   <MaterialIcons name="arrow-drop-down" size={24} color="black" onPress={showMenu}/>
                   <Menu visible={visible} onRequestClose={hideMenu} style={{left:250,top:50}}>
                    {state.data.map((element,index) =>(
                        <TouchableRipple key={index} rippleColor={"#6A5ACD"} onPress={() =>{props.selectTaskList(index),hideMenu()}}>
                           <View style={{width:200,padding:10,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                               <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Ionicons name="md-list-sharp" size={20} color="black" style={{padding:0}}/>
                                <Text style={{color:"#000",fontSize:17,paddingLeft:10}}>{element.listName}</Text>
                                </View>
                                <View>
                                <Text style={{color:"#000"}}>{element.listItems.length}</Text>
                                </View>
                           </View>
                        </TouchableRipple>
                    ))}
                  </Menu>
                </View>
                <View name="row2" style={{flexDirection:'row',alignItems:'center'}}>
                   <TouchableRipple onPress={()=>{signOut()}} rippleColor={"#6A5ACD"}>
                    <Text style={{color:"#6A5ACD",paddingRight:10,fontWeight:'bold'}} >Sign-out</Text>
                   </TouchableRipple>
                </View>
            </View>
            {/* <TouchableRipple style={styles.rippleStyle} borderless={true} onPress={() =>{console.log("hdghdghd")}}>
              <Ionicons name="checkmark-circle" size={30} color="#6A5ACD" />
            </TouchableRipple> */}
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainerStyle : {
       paddingHorizontal:12,
       paddingVertical:8,
       borderBottomColor:"#E6E6FA",
       backgroundColor:'#fff',
       borderBottomWidth:0.5,
       shadowColor: '#000',
       shadowOffset: { width: 1, height: 1 },
       shadowOpacity:  0.4,
       shadowRadius: 3,
       elevation: 5,
    },
    rippleStyle:{
        borderRadius:50,
    },
  
})

export default Header;