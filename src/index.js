import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension'

import './index.css';
import reducer from './reducers'

import EventsIndex from './components/events_index';
import EventsNew from './components/events_new'; 
import EventsShow from './components/events_show'; 
import reportWebVitals from './reportWebVitals';

const enhancer = process.env.NODE_ENV === 'development' ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/events/new" element={<EventsNew />} />
        <Route path="/events/:id" element={<EventsShow/>} />
        <Route path="/" element={<EventsIndex />} />
        <Route path="/events" element={<EventsIndex />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
