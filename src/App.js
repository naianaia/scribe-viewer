import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import './App.css';
import ArticleView from './components/ArticleView';
import BottomBar from './components/BottomBar';
import ContentFrame from './components/ContentFrame';

class App extends Component {

constructor() {
    super();
}

  componentWillMount() {
    const config = {
        apiKey: "AIzaSyD760vImnqQ_CC_cV9XYt35iKfLt9QpGz0",
        authDomain: "scribe-0.firebaseapp.com",
        databaseURL: "https://scribe-0.firebaseio.com",
        projectId: "scribe-0",
        storageBucket: "scribe-0.appspot.com",
        messagingSenderId: "464252124849"
    };
    if (!firebase.apps.length) {
         firebase.initializeApp(config);
    }
    document.title = 'scribe viewer'
  }

  render() {
    return (
      <div class="marginControl">
        <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
            <ContentFrame />
        </Provider>
      </div>
    );
  }
}

export default App;
