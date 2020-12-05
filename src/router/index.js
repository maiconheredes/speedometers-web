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
import CreateExpenseController from '../controllers/createExpense.controller';
import ShowExpenseController from '../controllers/showExpense.controller';
import EditExpenseController from '../controllers/editExpense.controller';
import ListCashierController from '../controllers/listCashier.controller';
import CreateCashierController from '../controllers/createCashier.controller';
import EditCashierController from '../controllers/editCashier.controller';
import ShowCashierController from '../controllers/showCashier.controller';
import ListExpenseController from '../controllers/listExpense.controller';


const SpeedometerRouter = () => {
    return <>
        <Router>
            <Switch>
                <Route exact path={Paths.index} children={<Redirect to={Paths.login} />} />
                <Route exact path={Paths.login} children={<LoginController />} />
                <Route exact path={Paths.administration.index} children={<AdminController />} />
                <Route exact path={Paths.administration.expense.index} children={<ListExpenseController />} />
                <Route exact path={Paths.administration.expense.create} children={<CreateExpenseController />} />
                <Route exact path={Paths.administration.expense.show} children={<ShowExpenseController />} />
                <Route exact path={Paths.administration.expense.edit} children={<EditExpenseController />} />
                <Route exact path={Paths.administration.cashier.index} children={<ListCashierController />} />
                <Route exact path={Paths.administration.cashier.create} children={<CreateCashierController />} />
                <Route exact path={Paths.administration.cashier.show} children={<ShowCashierController />} />
                <Route exact path={Paths.administration.cashier.edit} children={<EditCashierController />} />
                <Route children={<Redirect to={Paths.login} />} />
            </Switch>
        </Router>
    </>
};

export default SpeedometerRouter;
