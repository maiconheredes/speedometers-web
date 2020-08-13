import React from 'react';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';

import SpeedometerRouter from './router';
import Store from './store';
import { LoadingModal } from './components';


const App = () => {
  return <Provider store={Store}>
    <LoadingModal />
    <SpeedometerRouter />
  </Provider>
}

export default App;
