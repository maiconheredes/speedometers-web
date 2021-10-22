import React, { useReducer, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import EntityReducer from '../reducers/entity.reducer';
import { 
    cloneObject, 
    inDevelopment,
    isLogged,
    knownErrors,
    handlingRequest,
    authorization,
} from '../utils';
import { UPDATE_ENTITY_FIELD } from '../types/action.type';
import { PAYMENT_REVENUE } from '../types/operation.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import Paths from '../router/paths';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import CreateRevenuePage from '../pages/createRevenue.page';
import RevenueState from '../states/revenue.state';


const CreateRevenueController = () => {
    const [revenue, revenueControl] = useReducer(EntityReducer, cloneObject(RevenueState));
    const [componentMount, setComponentMount] = useState(true);

    const {
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const setField = (field, value) => {
        revenueControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field, 
                value,
            },
        });
    };

    const createRevenue = async (event) => {
        if (event) event.preventDefault();

        dispatch(alterLoading(true));
        const [error, response] = await requester(paymentService.create, {
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
                    message: 'Receita criada com sucesso!',
                }));

                history.push(Paths.administration.revenue.index);
            }
        );
    };

    useEffect(() => {
        if (inDevelopment()) {
            console.log('revenue', revenue);
        }
    }, [
        revenue,
    ]);

    useEffect(() => {
        if (componentMount) {
            if (isLogged()) {
                setField('operation', PAYMENT_REVENUE);
            }

            setComponentMount(false);
        }
    }, [componentMount]);

    const data = {
        revenue,
    };

    const handlers = {
        createRevenue,
        setField,
    };

    return <CreateRevenuePage data={data} handlers={handlers} />
};

export default CreateRevenueController;
