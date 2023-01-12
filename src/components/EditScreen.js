import React,{useState,useEffect} from 'react';
import {View,Text,Platform,StatusBar,TextInput,StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import {TouchableRipple } from 'react-native-paper';
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { editListData } from './Store/Store';


const EditScreen = ({route,navigation}) =>{
   
    const dispatch = useDispatch();
    const state= useSelector((state) => state);
    const[dueDate,setDueDate] = useState('');
    const[dueTime,setDueTime] = useState('');
    const[taskName,setTaskName] = useState('');
    const [mydate, setDate] = useState(new Date());
    const [myTime, setTime] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(false);
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

    const cancelSelection = () =>{
     setShow(false)
    }

    const cancelTimeSelection = () =>{
        setShowTime(false)
       }

       useEffect(() =>{
        console.log("hi use efff")
          let toBeEditData = route.params.toEditData;    
          setTime(toBeEditData.originalFormatedTime);
          setDate(toBeEditData.originalFormatedDate);
          setDueDate(toBeEditData.dueDate);
          setDueTime(toBeEditData.dueTime);
          setTaskName(toBeEditData.name)
       },[])

     const sendEditedData = () =>{
        let toBeEditData = route.params.toEditData;
        let toBeEditedData ={
            currentItemIndx: toBeEditData.currentItemIndx,
            currentListIndx: toBeEditData.currentListIndx,
            dueDate: dueDate,
            dueTime: dueTime,
            isfinished: toBeEditData.isfinished,
            listName: toBeEditData.listName,
            name: taskName,
            originalFormatedDate:mydate,
            originalFormatedTime:myTime
          }
         dispatch(editListData({toBeEditedData}));
         navigation.goBack()
       }

   return(
    <View style={styles.hdrContainer}>
    <View name="Header-holder">
       <View name="header-content" style={styles.hdrContent}>
          <TouchableRipple style={styles.roundedStyle} borderless={true} onPress={()=> {navigation.goBack()}}  rippleColor="#6A5ACD">
             <AntDesign name="arrowleft" size={28} color="#fff"/>
          </TouchableRipple>
          <Text style={styles.headerHdng}>Edit Task</Text>
       </View>
    </View>
     <View name="content-container" style={styles.contentContainer}>
       <View name="task-container" style={styles.contentContainer}>
          <ScrollView>
            <View>
            <View style={styles.formRow}>
                <Text style={styles.formTextStyle}>What is to be done?</Text>
                <View style={styles.formTxtFldWrper}>
                    <TextInput placeholder='Enter Task Here' value={taskName} onChangeText={(text)=>{setTaskName(text)}} style={styles.formTxtFeild}></TextInput>
                </View>
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formTextStyle}>Due date</Text>
                <View style={styles.formTxtFldWrper}>
                  <TouchableRipple onPress={()=>{setShow(true)}} style={{flex:1}} rippleColor="#6A5ACD">
                     <View >
                        <Text style={{color:"gray",fontSize:17}}>{dueDate?dueDate:"Set Date"}</Text>
                        <View style={{borderTopWidth:1,borderColor:'gray',marginTop:3}}></View>
                     </View>
                 </TouchableRipple>
                </View>
                {/* <DatePicker modal mode='date' format="YYYY-MM-DD" open={open} date={date} onConfirm={(date) => {setOpen(false),setDate(date),setDueDate(moment(date).format("ddd, MMM Do YYYY, h:mm a")),console.log()}}  onCancel={() => { setOpen(false)}}/> */}
                {isDisplayDate && ( <DateTimePicker value={mydate} mode={'date'} is24Hour={true} display="default" onChange={changeSelectedDate} onTouchCancel={cancelSelection} />
         )}
            </View>

            <View style={styles.formRow}>
                <Text style={styles.formTextStyle}>Due time</Text>
                <View style={styles.formTxtFldWrper}>
                  <TouchableRipple onPress={()=>{setShowTime(true)}} style={{flex:1}} rippleColor="#6A5ACD">
                     <View >
                        <Text style={{color:"gray",fontSize:17}}>{dueTime?dueTime:"Set Time"}</Text>
                        <View style={{borderTopWidth:1,borderColor:'gray',marginTop:3}}></View>
                     </View>
                 </TouchableRipple>
                </View>
                {isDisplayTime && ( <DateTimePicker value={myTime} mode={"time"} is24Hour={true} display="default" onChange={changeSelectedTime} onTouchCancel={cancelTimeSelection} />
         )}
            </View>

        </View>
          </ScrollView>
           <View style={styles.checkBtnStyle} name="add-scrn">                                                                      
              <TouchableRipple borderless={true} style={{borderRadius:50}} onPress={() =>{sendEditedData()}}  rippleColor="#6A5ACD">
                 <MaterialIcons name="check" size={24} color="#fff" />
              </TouchableRipple>
           </View>

       </View>
    </View>
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

export default EditScreen;