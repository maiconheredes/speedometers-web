import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';
import CreateCashierPage from '../pages/createCashier.page';
import EntityReducer from '../reducers/entity.reducer';
import requester from '../requester';
import Paths from '../router/paths';
import CashierState from '../states/cashier.state';
import { UPDATE_ENTITY_FIELD } from '../types/action.type';
import {
    authorization,
    cloneObject,
    handlingRequest,
    inDevelopment,
    knownErrors
} from '../utils';
import Messages from '../utils/messages';


const CreateCashierController = () => {
    const [cashier, cashierControl] = useReducer(EntityReducer, cloneObject(CashierState));

    const {
        cashier: cashierService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const setField = (field, value) => {
        cashierControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field, 
                value,
            },
        });
    };

    const createCashier = async (event) => {
        if (event) event.preventDefault();

        dispatch(alterLoading(true));
        const [error, response] = await requester(cashierService.create, {
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
                    message: 'Caixa criado com sucesso!',
                }));

                history.push(Paths.administration.cashier.index);
            }
        );
    };

    useEffect(() => {
        if (inDevelopment()) {
            console.log('cashier', cashier);
        }
    }, [
        cashier,
    ]);
    
    const data = {
        cashier,
    };

    const handlers = {
        createCashier,
        setField,
    };

    return <CreateCashierPage data={data} handlers={handlers} />
};

export default CreateCashierController;
