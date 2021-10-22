import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { inDevelopment, authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import ListServicePage from '../pages/listService.page';


const ListServiceController = () => {
    const [totalValueServices, setTotalValueServices] = useState(0);
    const [services, setServices] = useState([]);

    const {
        service,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmRemoveService = (serviceId) => {
        dispatch(setNotification({
            close: false,
            message: `Confirmar remoção do serviço ${serviceId}?`,
            onConfirm: () => removeService(serviceId),
        }));
    };

    const removeService = async (serviceId) => {
        if (!serviceId) return;

        const newService = {
            ...service,
        };

        newService.remove = {
            ...newService.remove,
            endpoint: newService.remove.endpoint
                .replace('{id}', serviceId),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newService.remove, {
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
            response => {
                if (response) {
                    dispatch(setNotification({
                        message: 'Serviço removido com sucesso!',
                    }));

                    loadServices();
                }
            }
        );
    };

    const loadServices = useCallback(async () => {
        dispatch(alterLoading(true));
        const [error, response] = await requester(service.index, {
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
            services => {
                let totalValueServices = 0;

                services.forEach(service => totalValueServices += service.payment.value);

                setServices(services);
                setTotalValueServices(totalValueServices);
            }
        );
    }, [dispatch, service]);

    useEffect(() => {
        if (inDevelopment()) {
            console.log('totalValueServices', totalValueServices);
            console.log('services', services);
        }
    }, [
        totalValueServices,
        services,
    ]);

    useEffect(() => {
        loadServices();
    }, [loadServices]);

    const data = {
        totalValueServices,
        services,
        history,
    };

    const handlers = {
        confirmRemoveService,
        loadServices,
    };

    return <ListServicePage data={data} handlers={handlers} />
};

export default ListServiceController;
