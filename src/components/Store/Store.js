import { connect } from 'react-redux';
import {legacy_createStore as createStore  } from 'redux';

//ACTIONS
const addAction = "add";
const removeAction ="remove";
const addList = "addList";
const editData= "edit"

export const addTask = (data) => {
    return {
      type: addAction,
      payload:data
    };
  };

  export const removeTask = (data) => {
    return {
      type: removeAction,
      payload:data
    };
  };

  export const addNewTask = (data) => {
    return {
      type: addList,
      payload:data
    };
  };

  export const editListData = (data) => {
    console.log(data,"editttttttttttttttttttttttttttt")
    return {
      type: editData,
      payload:data
    };
  };
 

  const initialStae = {data:[ {listName:"default",listItems:[]} ]};

   const taskReducer = (state = initialStae, actions) => {    

    switch (actions.type) {
      case 'add':
        let addedList = {...state}
        addedList.data[actions.payload.atWhatIndex].listItems.unshift(actions.payload.newData)
        console.log(addedList.data)
         return{
            // ...state,
            //  data:[actions.payload,...state.data]
            ...state,
            addedList
         }
         case 'remove':
            let listData = {...state};
             listData.data[actions.payload.currentListIndex].listItems.splice(actions.payload.toRemoveIndx,1);
            return{
                ...state,
                listData
            //    ...state,data:[...actions.payload]
            }

            case 'addList':
                let addedNewList = {...state};
                addedNewList.data.push(actions.payload);
            return{
              ...state,addedNewList
            }

            case 'edit':
              let editedData = {...state};
              // console.log(actions.payload,"looooooooooooooooooooo")
              // console.log(editedData.addedList.data[actions.payload.toBeEditedData.currentListIndx],"oeiioei")
                editedData.addedList.data[actions.payload.toBeEditedData.currentListIndx].listItems.splice(actions.payload.toBeEditedData.currentItemIndx,1,actions.payload.toBeEditedData)
          return{
            ...state,editData
          }

            default:
                return{
                    ...state
                }
                
    }
  };



   export let store = createStore(taskReducer);