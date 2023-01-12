import React,{useState} from 'react';
import { Button ,View,Text,Platform,StatusBar,TextInput,StyleSheet} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { Checkbox, TouchableRipple, Snackbar } from 'react-native-paper';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import {addTask,addNewTask} from './Store/Store.js';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Modal from "react-native-modal";
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTaskScrn = (props) =>{
    const dispatch = useDispatch();
    const state= useSelector((state) => state);
    const[taskName,setTaskName] = useState('');
    const[listName,setlistName] = useState('Default');
    const[currentListName,setCurrentListName] = useState('Default');
    const[currentListIndex,setCurrentListIndex] = useState(0);
    const[isVisibleAddTask,setIsVisibleAddTask] = useState(false);
    const[isTxtInptFocus,setIsTxtInptFocus] = useState(false);
    const[dueDate,setDueDate] = useState('');
    const[dueTime,setDueTime] = useState('');
    const [open, setOpen] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const [visible, setVisible] = useState(false);
    const [mydate, setDate] = useState(new Date());
    const [myTime, setTime] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
    const[visibleSnackBar,setVisibleSnackBar] = useState(false);
    const[deletedTaskName,setDeletedTaskName] = useState('');
    const [isDisplayTime, setShowTime] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
       const currentDate = selectedDate || mydate;
       setDate(currentDate);
       setShow(false);
     setDueDate(moment(selectedDate).format("ddd, MMM Do YYYY"))
    };

    const changeSelectedTime = (event, selectedTime) => {
       const  time = selectedTime || myTime;
       setTime(time)
       setShowTime(false)
       setDueTime(moment(time).format("h:mm a"))
    };

    const showMode = (currentMode) => {
       setShow(true);
       setMode(currentMode);
    };
    const displayTimepicker = () => {
       showMode('date');
    };
    const cancelSelection = () =>{
     setShow(false)
    }

    const cancelTimeSelection = () =>{
        setShowTime(false)
       }

    const addTaskToList = () =>{
      if(taskName && dueDate && dueTime){
        let toAddDta = {
            name:taskName,
            dueDate:dueDate,
            dueTime:dueTime,
            originalFormatedTime:myTime,
            originalFormatedDate:mydate,
            listName:currentListName,
            isfinished:false
       }
       dispatch(addTask({newData:toAddDta,atWhatIndex:currentListIndex})),props.navigation.goBack()
      }else{
           setVisibleSnackBar(true)
      }
    }

    const dispatchNewList = () =>{
        let newList ={};
        newList.listName=listName;
        newList.listItems=[];
        dispatch(addNewTask(newList))
    }

    const onDismissSnackBar = () => setVisibleSnackBar(false);

   return(
    <View style={styles.hdrContainer}>
    <View name="Header-holder">
       <View name="header-content" style={styles.hdrContent}>
          <TouchableRipple style={styles.roundedStyle} borderless={true} onPress={()=> {props.navigation.goBack()}}  rippleColor="#6A5ACD">
             <AntDesign name="arrowleft" size={28} color="#fff"/>
          </TouchableRipple>
          <Text style={styles.headerHdng}>New Task</Text>
       </View>
    </View>
     <View name="content-container" style={styles.contentContainer}>
       <View name="task-container" style={styles.contentContainer}>
          <ScrollView>
            <View>
            <View style={styles.formRow}>
                <Text style={styles.formTextStyle}>What is to be done?</Text>
                <View style={styles.formTxtFldWrper}>
                    <TextInput placeholder='Enter Task Here' onChangeText={(text)=>{setTaskName(text)}} style={styles.formTxtFeild}></TextInput>
                </View>
            </View>

            <View style={[styles.formRow,{paddingBottom:10}]}>
                <Text style={styles.formTextStyle}>Due date</Text>
                <View style={styles.formTxtFldWrper}>
                  <TouchableRipple onPress={()=>{setShow(true)}} style={{flex:1}} rippleColor="#6A5ACD">
                     <View >
                        <Text style={{color:"gray",fontSize:17}}>{dueDate?dueDate:"Set Date and Time"}</Text>
                        <View style={{borderTopWidth:1,borderColor:'gray',marginTop:3}}></View>
                     </View>
                 </TouchableRipple>
                </View>
                {/* <DatePicker modal mode='date' format="YYYY-MM-DD" open={open} date={date} onConfirm={(date) => {setOpen(false),setDate(date),setDueDate(moment(date).format("ddd, MMM Do YYYY, h:mm a")),console.log()}}  onCancel={() => { setOpen(false)}}/> */}
                {isDisplayDate && ( <DateTimePicker value={mydate} mode={'date'} is24Hour={true} display="default" onChange={changeSelectedDate} onTouchCancel={cancelSelection} />
         )}
            </View>


       {dueDate?
            <View style={[styles.formRow,{paddingVertical:0}]}>
            <Text style={styles.formTextStyle}>Due Time</Text>
            <View style={[styles.formTxtFldWrper]}>
              <TouchableRipple onPress={()=>{setShowTime(true)}} style={{flex:1}} rippleColor="#6A5ACD">
                 <View >
                    <Text style={{color:"gray",fontSize:17}}>{dueTime?dueTime:"Set Time"}</Text>
                    <View style={{borderTopWidth:1,borderColor:'gray',marginTop:3}}></View>
                 </View>
             </TouchableRipple>
            </View>
            {/* <DatePicker modal mode='date' format="YYYY-MM-DD" open={open} date={date} onConfirm={(date) => {setOpen(false),setDate(date),setDueDate(moment(date).format("ddd, MMM Do YYYY, h:mm a")),console.log()}}  onCancel={() => { setOpen(false)}}/> */}
            {isDisplayTime && ( <DateTimePicker value={myTime} mode={"time"} is24Hour={true} display="default" onChange={changeSelectedTime} onTouchCancel={cancelTimeSelection} />
     )}
        </View>:<></>
       }

            <View style={styles.addToList}>
            <Text style={styles.formTextStyle}>Add to List</Text>
                <View style={{flexDirection:'row',paddingVertical:15,justifyContent:'space-between'}}>
                  <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:16}}>{currentListName}</Text>
                  </View>
                  <View style={{alignItems:'center',flexDirection:'row'}}>
                        <TouchableRipple style={styles.touchableRiple} borderless={true}  onPress={showMenu}  rippleColor="#6A5ACD">
                            <Ionicons name="caret-down" size={15} color="black" />
                        </TouchableRipple>

                        <Menu visible={visible} onRequestClose={hideMenu} style={{left:250}}>
                    {state.data.map((element,index) =>(
                        <TouchableRipple key={index} rippleColor={"#6A5ACD"} onPress={() =>{hideMenu(),setCurrentListName(element.listName),setCurrentListIndex(index)}}>
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

                        <View style={{paddingLeft:50}}>
                        <TouchableRipple style={styles.touchableRiple} borderless={true}  onPress={() =>{setIsVisibleAddTask(true)}}  rippleColor="#6A5ACD">
                           <MaterialIcons name="playlist-add" size={24} color="black" />
                        </TouchableRipple>
                     
                        </View>
                  </View>
                </View>
            </View>

        </View>
          </ScrollView>
           <View style={styles.checkBtnStyle} name="add-scrn">             
              <TouchableRipple borderless={true} style={{borderRadius:50}} onPress={() => {addTaskToList()}}  rippleColor="#6A5ACD">
                 <MaterialIcons name="check" size={24} color="#fff" />
              </TouchableRipple>
           </View>
    
           <Modal isVisible={isVisibleAddTask} onBackButtonPress={()=>{setIsVisibleAddTask(false)}} onModalHide={()=>{setIsTxtInptFocus(false)}}>
        <View style={{height:200,width:"100%",backgroundColor:'white',borderRadius:5,alignSelf:"center",padding:18}}>
          <View>
            <Text style={{fontSize:17,fontWeight:'bold',color:'#6A5ACD'}}>New Task</Text>
          <View style={{paddingTop:30}}>
            <TextInput onChangeText={(text) =>{setlistName(text)}} style={{borderBottomColor:isTxtInptFocus?"#6A5ACD":"gray",padding:0,borderBottomWidth:isTxtInptFocus?2:1}} onFocus={()=>{setIsTxtInptFocus(true)}} onBlur={() =>{setIsTxtInptFocus(false)}}></TextInput>
          </View>
          </View>
          <View style={{paddingTop:50,flexDirection:"row",justifyContent:'flex-end'}}>
            <TouchableRipple onPress={() =>{setIsVisibleAddTask(false)}}>
             <Text style={{color:"#6A5ACD",fontSize:16,paddingRight:20}}>CANCEL</Text>
            </TouchableRipple>
            <TouchableRipple onPress={() =>{dispatchNewList(),setIsVisibleAddTask(false)}} >
             <Text style={{color:"#6A5ACD",fontSize:16}}>ADD</Text>
            </TouchableRipple>
          </View>
        </View>
      </Modal>
       </View>
    </View>
    <Snackbar duration={2000} visible={visibleSnackBar}  onDismiss={onDismissSnackBar}><Text style={{textAlign:'center',color:"#fff"}}>Please Enter a Valid Task</Text></Snackbar>
   </View>
   )
}

const styles = StyleSheet.create({
    hdrContainer:{flex:1,
        paddingTop:Platform.OS === "android"?StatusBar.currentHeight:"",
        backgroundColor:"#fff"
    },
    hdrContent:{alignItems:"center",
    height:70,backgroundColor:"#6A5ACD",
    paddingLeft:15,flexDirection:"row"
},
roundedStyle:{
    borderRadius:50
},
headerHdng:{
    color:"#fff",
    fontSize:17,
    fontWeight:'bold',
    paddingLeft:15
},
contentContainer:{
    flex:1,position:'relative'
},
formRow:{
    paddingVertical:20,
    paddingHorizontal:20,
    paddingBottom:60
},
formTextStyle:{
    fontSize:16,
    fontWeight:'bold',
    color:'#6A5ACD'
},
formTxtFldWrper:{
    flexDirection:'row',
    paddingVertical:15,
},
formTxtFeild:{
    fontSize:17,
    borderBottomColor:"gray",
    borderBottomWidth:1,
    width:"100%",
    padding:0}
    ,
    addToList:{
        paddingVertical:20,
        paddingHorizontal:20
    },
    touchableRiple:{
        borderRadius:50,
        padding:5
    },
    checkBtnStyle:{
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    right:20,
    height:45,
    width:45,
    borderRadius:50,
    backgroundColor:"#6A5ACD",
    elevation:5,
    bottom:70}

})

export default AddTaskScrn;