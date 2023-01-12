/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React, { Component } from 'react';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import { store } from './src/components/Store/Store';


class MyApp extends Component {
    render() {
        return (
            
             <Provider store={store}>
                <App />
             </Provider>                 
                  
        );
    }
}


AppRegistry.registerComponent(appName, () => MyApp);
