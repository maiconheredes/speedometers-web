import React, { useReducer, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EditExpensePage from '../pages/editExpense.page';
import EntityReducer from '../reducers/entity.reducer';
import { cloneObject, authorization, handlingRequest, knownErrors } from '../utils';
import ExpenseState from '../states/expense.state';
import { UPDATE_ENTITY_FIELD, UPDATE_ENTITY } from '../types/action.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import Paths from '../router/paths';


const EditExpenseController = () => {
    const [expense, expenseControl] = useReducer(EntityReducer, cloneObject(ExpenseState));

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        idPayment,
    } = useParams();

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const setField = (field, value) => {
        expenseControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field,
                value,
            },
        });
    };

    const loadExpense = useCallback(async () => {
        let newPaymentService = {
            ...paymentService,
        };

        newPaymentService.show = {
            ...newPaymentService.show,
            endpoint: newPaymentService.show.endpoint.replace('{id}', idPayment),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newPaymentService.show, {
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
            expense => {
                expenseControl({
                    type: UPDATE_ENTITY,
                    payload: expense,
                });
            }
        );
    }, [dispatch, idPayment, paymentService]);

    

    const editExpense = async (event) => {
        if (event) event.preventDefault();

        let newPaymentService = {
            ...paymentService,
        };

        newPaymentService.edit = {
            ...newPaymentService.edit,
            endpoint: newPaymentService.edit.endpoint.replace('{id}', idPayment),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(paymentService.edit, {
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
                    message: 'Despesa editada com sucesso!',
                }));
                history.push(Paths.administration.expense.index);
            }
        );
    };

    useEffect(() => {
        loadExpense();
    }, [loadExpense]);

    const data = {
        expense,
    };

    const handlers = {
        editExpense,
        setField,
    };

    return <EditExpensePage data={data} handlers={handlers} />
};

export default EditExpenseController;
