import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { inDevelopment, authorization, handlingRequest, knownErrors } from '../utils';
import requester from '../requester';
import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';
import Messages from '../utils/messages';
import ListRevenuePage from '../pages/listRevenue.page';


const ListRevenueController = () => {
    const [totalValueRevenues, setTotalValueRevenues] = useState(0);
    const [revenues, setRevenues] = useState([]);

    const {
        revenue: revenueService,
        payment: paymentService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmRemoveRevenue = (revenueId) => {
        dispatch(setNotification({
            close: false,
            message: `Confirmar remoção da receita ${revenueId}?`,
            onConfirm: () => removeRevenue(revenueId),
        }));
    };

    const removeRevenue = async (revenueId) => {
        if (!revenueId) return;

        const newPaymentService = {
            ...paymentService,
        };

        newPaymentService.remove = {
            ...newPaymentService.remove,
            endpoint: newPaymentService.remove.endpoint
                .replace('{id}', revenueId),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newPaymentService.remove, {
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
                        message: 'Receita removida com sucesso!',
                    }));

                    loadRevenues();
                }
            }
        );
    };

    const loadRevenues = useCallback(async () => {
        dispatch(alterLoading(true));
        const [error, response] = await requester(revenueService.index, {
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
            revenues => {
                let totalValueRevenues = 0;

                revenues.forEach(revenue => totalValueRevenues += revenue.value);

                setRevenues(revenues);
                setTotalValueRevenues(totalValueRevenues);
            }
        );
    }, [dispatch, revenueService]);

    useEffect(() => {
        if (inDevelopment()) {
            console.log('totalValueRevenues', totalValueRevenues);
            console.log('revenues', revenues);
        }
    }, [
        totalValueRevenues,
        revenues,
    ]);

    useEffect(() => {
        loadRevenues();
    }, [loadRevenues]);

    const data = {
        totalValueRevenues,
        revenues,
        history,
    };

    const handlers = {
        confirmRemoveRevenue,
        loadRevenues,
    };

    return <ListRevenuePage data={data} handlers={handlers} />
};

export default ListRevenueController;
