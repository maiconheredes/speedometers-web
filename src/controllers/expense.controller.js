import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ExpensePage from '../pages/expense.page';
import { inDevelopment, authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';


const ExpenseController = () => {
    const [totalValueExpenses, setTotalValueExpenses] = useState(0);
    const [expenses, setExpenses] = useState([]);

    const {
        expense: expenseService,
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmRemoveExpense = (expenseId) => {
        dispatch(setNotification({
            message: `Confirmar remoção da despesa ${expenseId}?`,
            onConfirm: () => removeExpense(expenseId),
        }));
    };

    const removeExpense = async (expenseId) => {
        if (!expenseId) return;

        const newPaymentService = {
            ...paymentService,
        };

        newPaymentService.remove = {
            ...newPaymentService.remove,
            endpoint: newPaymentService.remove.endpoint
                .replace('{id}', expenseId),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newPaymentService.remove, {
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
                message: Messages.system.error,
            })),
            response => {
                if (response) {
                    dispatch(setNotification({
                        message: 'Despesa removida com sucesso!',
                    }));

                    loadExpenses();
                }
            }
        );
    };

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
                message: Messages.system.error,
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
        history,
    };

    const handlers = {
        confirmRemoveExpense,
    };

    return <ExpensePage data={data} handlers={handlers} />
};

export default ExpenseController;
