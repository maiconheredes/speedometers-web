import React from 'react';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.scss';
import './styles/helper.scss';

import SpeedometerRouter from './router';
import Store from './store';
import { LoadingModal, NotificationsModals } from './components';


const App = () => {
  return <Provider store={Store}>
    <LoadingModal />
    <NotificationsModals />
    <SpeedometerRouter />
  </Provider>
}

export default App;
