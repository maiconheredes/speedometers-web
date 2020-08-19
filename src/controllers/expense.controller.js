import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ExpensePage from '../pages/expense.page';
import { inDevelopment, authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';


const ExpenseController = () => {
    const [totalValueExpenses, setTotalValueExpenses] = useState(0);
    const [expenses, setExpenses] = useState([]);

    const {
        expense: expenseService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();

    const loadExpenses = useCallback(async () => {
        dispatch(alterLoading(true));
        const [error, response] = await requester(expenseService.index, {
            headers: {
                ...authorization(),
            },
        });
        dispatch(alterLoading(false));
        
        handlingRequest(
            error, response,
            error => dispatch(setNotification({
                message: knownErrors(error.message),
            })),
            () => dispatch(setNotification({
                message: 'Ocorreu algum erro no sistema.',
            })),
            expenses => {
                let totalValueExpenses = 0;
                expenses.map(expense => totalValueExpenses += expense.value);

                setExpenses(expenses);
                setTotalValueExpenses(totalValueExpenses);
            }
        );
    }, [dispatch, expenseService]);

    useEffect(() => {
        if (inDevelopment()) {
            console.log('totalValueExpenses', totalValueExpenses);
            console.log('expenses', expenses);
        }
    }, [
        totalValueExpenses,
        expenses,
    ]);

    useEffect(() => {
        loadExpenses();
    }, [loadExpenses]);

    const data = {
        totalValueExpenses,
        expenses,
    };

    const handlers = {

    };

    return <ExpensePage data={data} handlers={handlers} />
};

export default ExpenseController;
