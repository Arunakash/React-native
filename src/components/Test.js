import React, {useState} from 'react';
import {View, Button, Platform, SafeAreaView , StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function App() {
   const [mydate, setDate] = useState(new Date());
   const [displaymode, setMode] = useState('time');
   const [isDisplayDate, setShow] = useState(false);
   const changeSelectedDate = (event, selectedDate) => {
      console.log(selectedDate)
      const currentDate = selectedDate || mydate;
     console.log( moment(selectedDate).format("HH:mm"),"lsklsklskl")
      setDate(currentDate);
      setShow(false)
   };
   const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
   };
   const displayTimepicker = () => {
      showMode('time');
   };
   const cancelSelection = () =>{
    setShow(false)
   }
   return (
      <SafeAreaView style={styles.container}>
         <View>
            <Button onPress={displayTimepicker} title="Your Time Picker" />
         </View>
         {isDisplayDate && (
            <DateTimePicker
               value={mydate}
               mode={displaymode}
               is24Hour={true}
               display="default"
               onChange={changeSelectedDate}
               onTouchCancel={cancelSelection}
            />
         )}
      </SafeAreaView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
});