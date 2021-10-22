import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { alterLoading } from '../actions/loading.action';
import { authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import ShowRevenuePage from '../pages/showRevenue.page';


const ShowRevenueController = () => {
    const [revenue, setRevenue] = useState({});

    const dispatch = useDispatch();

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const {
        idPayment,
    } = useParams();

    const loadRevenue = useCallback(async () => {
        let newPaymentService = {
            ...paymentService,
        };

        newPaymentService.find = {
            ...newPaymentService.find,
            endpoint: newPaymentService.find.endpoint.replace('{id}', idPayment),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newPaymentService.find, {
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
            revenue => {
                setRevenue(revenue);
            }
        );
    }, [dispatch, idPayment, paymentService]);

    useEffect(() => {
        loadRevenue();
    }, [loadRevenue]);

    const data = {
        idPayment,
        revenue,
    };

    const handlers = {

    };

    return <ShowRevenuePage data={data} handlers={handlers} />
};

export default ShowRevenueController;