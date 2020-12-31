import React, { useReducer, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EntityReducer from '../reducers/entity.reducer';
import { cloneObject, authorization, handlingRequest, knownErrors } from '../utils';
import RevenueState from '../states/revenue.state';
import { UPDATE_ENTITY_FIELD, UPDATE_ENTITY } from '../types/action.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import Paths from '../router/paths';
import EditRevenuePage from '../pages/editRevenue.page';


const EditRevenueController = () => {
    const [revenue, revenueControl] = useReducer(EntityReducer, cloneObject(RevenueState));

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        idPayment,
    } = useParams();

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const setField = (field, value) => {
        revenueControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field,
                value,
            },
        });
    };

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
                revenueControl({
                    type: UPDATE_ENTITY,
                    payload: revenue,
                });
            }
        );
    }, [dispatch, idPayment, paymentService]);

    

    const editRevenue = async (event) => {
        if (event) event.preventDefault();

        let newPaymentService = {
            ...paymentService,
        };

        newPaymentService.edit = {
            ...newPaymentService.edit,
            endpoint: newPaymentService.edit.endpoint.replace('{id}', idPayment),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newPaymentService.edit, {
            body: JSON.stringify(revenue),
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
                    message: 'Receita editada com sucesso!',
                }));
                history.push(Paths.administration.revenue.index);
            }
        );
    };

    useEffect(() => {
        loadRevenue();
    }, [loadRevenue]);

    const data = {
        revenue,
    };

    const handlers = {
        editRevenue,
        setField,
    };

    return <EditRevenuePage data={data} handlers={handlers} />
};

export default EditRevenueController;
