import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CreateExpensePage from '../pages/createExpense.page';
import EntityReducer from '../reducers/entity.reducer';
import { 
    cloneObject, 
    inDevelopment,
    isLogged,
    knownErrors,
    handlingRequest,
    authorization,
} from '../utils';
import ExpenseState from '../states/expense.state';
import { UPDATE_ENTITY_FIELD } from '../types/action.type';
import { PAYMENT_EXPENSE } from '../types/operation.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import Paths from '../router/paths';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';


const CreateExpenseController = () => {
    const [expense, expenseControl] = useReducer(EntityReducer, cloneObject(ExpenseState));
    const [componentMount, setComponentMount] = useState(true);

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const setField = (field, value) => {
        expenseControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field, 
                value,
            },
        });
    };

    const createExpense = async (event) => {
        if (event) event.preventDefault();

        dispatch(alterLoading(true));
        const [error, response] = await requester(paymentService.create, {
            body: JSON.stringify(expense),
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
            () => {
                dispatch(setNotification({
                    message: 'Despesa criada com sucesso!',
                }));
                history.push(Paths.administration.expense.index);
            }
        );
    };

    useEffect(() => {
        if (inDevelopment()) {
            console.log('expense', expense);
        }
    }, [
        expense,
    ]);

    useEffect(() => {
        if (componentMount) {
            if (isLogged()) {
                setField('operation', PAYMENT_EXPENSE);
            }

            setComponentMount(false);
        }
    }, [componentMount]);

    const data = {
        expense,
    };

    const handlers = {
        createExpense,
        setField,
    };

    return <CreateExpensePage data={data} handlers={handlers} />
};

export default CreateExpenseController;
