import React,{useState,useEffect} from 'react';
import { Button ,View,Text,Platform,StatusBar,TextInput,Dimensions} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Header from './Header';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import { Checkbox, TouchableRipple ,Snackbar} from 'react-native-paper';
import { useDispatch,useSelector } from 'react-redux';
import {removeTask,editListData} from './Store/Store.js';

const height = Dimensions.dev

const HomeScrn = (props) =>{
   const state= useSelector((state) => state);
   const [currentListIndex,setCurrentListIndx] = useState(0);
   const dispatch = useDispatch(); 
   const[visibleSnackBar,setVisibleSnackBar] = useState(false);
   const[deletedTaskName,setDeletedTaskName] = useState('');
   const checkTashFinshed = (index,listName) =>{
      setTimeout(function(){
        dispatch(removeTask({toRemoveIndx:index,currentListIndex:currentListIndex}));
      },500)
   }
   
   const selectTaskList = (index) =>{
       setCurrentListIndx(index)
   }

   const moveToEdit = (item,toEdtItemIndx) => {
    let toEditData = item;
    toEditData.currentListIndx= currentListIndex;
    toEditData.currentItemIndx = toEdtItemIndx;
    props.navigation.navigate("EditTaskScrn",{toEditData})
}
const onDismissSnackBar = () => setVisibleSnackBar(false);

  const renderEachItemFromList =({item,index}) =>{
      return(<View name="list-Content-hldr" style={{padding:10}}>
        <TouchableRipple onPress={()=>{moveToEdit(item,index)}}>
           <View name="list-content-container" style={{backgroundColor:'#6A5ACD',borderRadius:20,padding:10}}>
              <View name="row1" style={{flexDirection:'row',alignItems:'center'}}>
                 <View style={{flex:1}}>
                   <Checkbox.Android onPress={()=>{checkTashFinshed(index,item.listName),setVisibleSnackBar(true),setDeletedTaskName(item.name)}}  color="#fff" status={item.isfinished?"checked":"unchecked"} uncheckedColor='#fff'/>
                 </View>
                 <View style={{flex:8}}>
                  <Text style={{fontSize:15,fontWeight:'bold',color:"#fff"}}>{item.name}</Text>
                  </View>
              </View>
              <View name="row2" style={{flexDirection:'row',alignItems:'center'}}>
                 <View style={{flex:1}}></View>
                 <View style={{flex:8}}>
                  <Text style={{fontSize:15,color:"#fff"}}>{item.dueDate}   {item.dueTime}</Text>
                    <Text>{item.isfinished}</Text>
                  </View>
              </View>
           </View>
        </TouchableRipple>
      </View>)
  }
  
  const listEmptyComponent = () =>{
     return(
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <AntDesign name="frowno" size={104} color="#6A5ACD" />
          <Text style={{fontSize:26,fontWeight:"bold",color:"#6A5ACD",paddingTop:20}}>No task yet</Text>
          <Text style={{fontSize:26,fontWeight:"bold",color:"#6A5ACD"}}>in {state.data[currentListIndex].listName} !</Text>
      </View>
     )
  }

    return(
        <View style={{flex:1,paddingTop:Platform.OS === "android"?StatusBar.currentHeight:"",backgroundColor:"#fff"}}>
         <View name="Header-holder">
             <Header selectTaskList={selectTaskList} navigation={props.navigation}></Header>
             
         </View>
          <View name="content-container" style={{flex:1,position:'relative'}}>
            <View name="task-container" style={{flex:1,position:'relative'}}>
              <FlatList  contentContainerStyle={{ flexGrow: 1 }} ListEmptyComponent={listEmptyComponent}  data={state.data[currentListIndex].listItems} renderItem={renderEachItemFromList} keyExtractor={(item,index)=> index.toString()}/>
                <View style={{position:'absolute',alignItems:'center',justifyContent:'center',right:20,height:45,width:45,borderRadius:50,backgroundColor:"#6A5ACD",elevation:5,bottom:120}} name="add-scrn">
                 <TouchableRipple onPress={()=>{props.navigation.navigate("AddTaskScrn")}}>
                   <Entypo name="plus" size={30} color="#fff" />
                 </TouchableRipple>
                </View>
            </View>
           {!state.data[currentListIndex].listItems.length?
            <View name="bottom-txt-box" style={{flexDirection:'row',alignItems:'center',justifyContent:"center",paddingVertical:15,paddingHorizontal:15,backgroundColor:"#6A5ACD",width:'100%',position:'absolute',bottom:0}}>
           <Text style={{color:"#fff",fontSize:16}}>Enter plus i-con to add TASK</Text>
          </View>:<></>}
         </View>
         <Snackbar duration={2000} visible={visibleSnackBar}  onDismiss={onDismissSnackBar}><Text style={{textAlign:'center',color:"#fff"}}>{deletedTaskName} finsished sucessfully !</Text></Snackbar>
        </View>
    )
}

export default HomeScrn;