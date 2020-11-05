import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ShowExpensePage from '../pages/showExpense.page';
import { alterLoading } from '../actions/loading.action';
import { authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';


const ShowExpenseController = () => {
    const [expense, setExpense] = useState({});

    const dispatch = useDispatch();

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const {
        idPayment,
    } = useParams();

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
                setExpense(expense);
            }
        );
    }, [dispatch, idPayment, paymentService]);

    useEffect(() => {
        loadExpense();
    }, [loadExpense]);

    const data = {
        idPayment,
        expense,
    };

    const handlers = {

    };

    return <ShowExpensePage data={data} handlers={handlers} />
};

export default ShowExpenseController;