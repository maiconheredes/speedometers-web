import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alterLoading } from '../actions/loading.action';
import { authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import ShowCashierPage from '../pages/showCashier.page';


const ShowCashierController = () => {
    const [cashier, setCashier] = useState({});

    const dispatch = useDispatch();

    const {
        cashier: cashierService,
    } = useSelector(state => state.ServicesReducer);

    const {
        idCashier,
    } = useParams();

    const loadCashier = useCallback(async () => {
        let newCashierService = {
            ...cashierService,
        };

        newCashierService.find = {
            ...newCashierService.find,
            endpoint: newCashierService.find.endpoint.replace('{id}', idCashier),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newCashierService.find, {
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
            cashier => {
                setCashier(cashier);
            }
        );
    }, [dispatch, idCashier, cashierService]);

    useEffect(() => {
        loadCashier();
    }, [loadCashier]);

    const data = {
        idCashier,
        cashier,
    };

    const handlers = {

    };

    return <ShowCashierPage data={data} handlers={handlers} />
};

export default ShowCashierController;
