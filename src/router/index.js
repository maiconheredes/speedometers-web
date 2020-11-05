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
import CreateExpenseController from '../controllers/createExpense.controller';
import ShowExpenseController from '../controllers/showExpense.controller';
import EditExpenseController from '../controllers/editExpense.controller';


const SpeedometerRouter = () => {
    return <>
        <Router>
            <Switch>
                <Route exact path={Paths.index} children={<Redirect to={Paths.login} />} />
                <Route exact path={Paths.login} children={<LoginController />} />
                <Route exact path={Paths.administration.index} children={<AdminController />} />
                <Route exact path={Paths.administration.expense.index} children={<ExpenseController />} />
                <Route exact path={Paths.administration.expense.create} children={<CreateExpenseController />} />
                <Route exact path={Paths.administration.expense.show} children={<ShowExpenseController />} />
                <Route exact path={Paths.administration.expense.edit} children={<EditExpenseController />} />
                <Route children={<Redirect to={Paths.login} />} />
            </Switch>
        </Router>
    </>
};

export default SpeedometerRouter;
