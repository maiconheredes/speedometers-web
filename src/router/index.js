import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import Paths from './paths';
import LoginController from '../controllers/login.controller';
import AdminController from '../controllers/admin.controller';
import ExpenseController from '../controllers/expense.controller';


const SpeedometerRouter = () => {
    return <>
        <Router>
            <Switch>
                <Route exact path={Paths.raiz} children={<Redirect to={Paths.login} />} />
                <Route exact path={Paths.login} children={<LoginController />} />
                <Route exact path={Paths.administration} children={<AdminController />} />
                <Route exact path={Paths.expense} children={<ExpenseController />} />
            </Switch>
        </Router>
    </>
};

export default SpeedometerRouter;
