import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { alterLoading } from '../actions/loading.action';
import { setNotification } from '../actions/notifications.action';

import ListCashierPage from '../pages/listCashier.page';
import requester from '../requester';
import { authorization, handlingRequest, inDevelopment, knownErrors } from '../utils';
import Messages from '../utils/messages';


const ListCashierController = () => {
    const [totalValueCashiers, setTotalValueCashiers] = useState(0);
    const [cashiers, setCashiers] = useState([]);

    const {
        cashier: cashierService,
    } = useSelector(state => state.ServicesReducer);

    const dispatch = useDispatch();
    
    const confirmRemoveCashier = (cashierId) => {
        dispatch(setNotification({
            close: false,
            message: `Confirmar remoção do caixa ${cashierId}?`,
            onConfirm: () => removeCashier(cashierId),
        }));
    };

    const removeCashier = async (cashierId) => {
        if (!cashierId) return;

        const newCashierService = {
            ...cashierService,
        };

        newCashierService.remove = {
            ...newCashierService.remove,
            endpoint: newCashierService.remove.endpoint
                .replace('{id}', cashierId),
        };

        dispatch(alterLoading(true));
        const [error, response] = await requester(newCashierService.remove, {
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
                        message: 'Caixa removido com sucesso!',
                    }));

                    findCashiers();
                }
            }
        );
    };

    const findCashiers = useCallback(async () => {
        dispatch(alterLoading(true));
        const [error, response] = await requester(cashierService.index, {
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
            cashiers => {
                let totalValueCashiers = 0;

                cashiers.forEach(cashier => {
                    totalValueCashiers += cashier.totalValue;
                });

                setTotalValueCashiers(totalValueCashiers);
                setCashiers(cashiers);
            }
        );
    }, [cashierService, dispatch]);

    useEffect(() => {
        if (inDevelopment()) {
            console.log('totalValueCashiers', totalValueCashiers);
            console.log('cashiers', cashiers);
        }
    }, [
        totalValueCashiers,
        cashiers,
    ]);

    useEffect(() => {
        findCashiers();
    }, [findCashiers]);

    const data = {
        totalValueCashiers,
        cashiers,
    };

    const handlers = {
        confirmRemoveCashier,
    };

    return <ListCashierPage data={data} handlers={handlers} />
};

export default ListCashierController;
