import React, { useReducer, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import EntityReducer from '../reducers/entity.reducer';
import { cloneObject, authorization, handlingRequest, knownErrors } from '../utils';
import { UPDATE_ENTITY_FIELD, UPDATE_ENTITY } from '../types/action.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import Paths from '../router/paths';
import CashierState from '../states/cashier.state';
import EditCashierPage from '../pages/editCashier.page';


const EditCashierController = () => {
    const [cashier, cashierControl] = useReducer(EntityReducer, cloneObject(CashierState));

    const dispatch = useDispatch();
    const history = useHistory();

    const {
        idCashier,
    } = useParams();

    const {
        cashier: cashierService,
    } = useSelector(state => state.ServicesReducer);

    const setField = (field, value) => {
        cashierControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field,
                value,
            },
        });
    };

    const findCashier = useCallback(async () => {
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
                cashierControl({
                    type: UPDATE_ENTITY,
                    payload: cashier,
                });
            }
        );
    }, [dispatch, idCashier, cashierService]);

    const editCashier = async (event) => {
        if (event) event.preventDefault();

        let newCashierService = {
            ...cashierService,
        };

        newCashierService.edit = {
            ...newCashierService.edit,
            endpoint: newCashierService.edit.endpoint.replace('{id}', idCashier),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newCashierService.edit, {
            body: JSON.stringify(cashier),
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
                    message: 'Caixa editado com sucesso!',
                }));

                history.push(Paths.administration.cashier.index);
            }
        );
    };

    useEffect(() => {
        findCashier();
    }, [findCashier]);

    const data = {
        cashier,
    };

    const handlers = {
        editCashier,
        setField,
    };

    return <EditCashierPage data={data} handlers={handlers} />
};

export default EditCashierController;
