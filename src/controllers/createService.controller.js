import React, { useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import EntityReducer from '../reducers/entity.reducer';
import { 
    cloneObject, 
    inDevelopment,
    knownErrors,
    handlingRequest,
    authorization,
} from '../utils';
import { UPDATE_ENTITY_FIELD } from '../types/action.type';
import { alterLoading } from '../actions/loading.action';
import requester from '../requester';
import Paths from '../router/paths';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import ServiceState from '../states/service.state';
import CreateServicePage from '../pages/createService.page';


const CreateServiceController = () => {
    const [service, serviceControl] = useReducer(EntityReducer, cloneObject(ServiceState));

    const {
        service: serviceService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const setField = (field, value) => {
        serviceControl({
            type: UPDATE_ENTITY_FIELD,
            payload: {
                field, 
                value,
            },
        });
    };

    const createService = async (event) => {
        if (event) event.preventDefault();

        dispatch(alterLoading(true));
        const [error, response] = await requester(serviceService.create, {
            body: JSON.stringify(service),
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
                    message: 'Serviço criado com sucesso!',
                }));

                history.push(Paths.administration.service.index);
            }
        );
    };

    useEffect(() => {
        if (inDevelopment()) {
            console.log('service', service);
        }
    }, [
        service,
    ]);

    const data = {
        service,
    };

    const handlers = {
        createService,
        setField,
    };

    return <CreateServicePage data={data} handlers={handlers} />
};

export default CreateServiceController;
