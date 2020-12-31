import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Col, Modal, Button } from 'react-bootstrap';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

import {
    InputText,
    MoneyInput,
    InputNumber,
    IconButton
} from '..';
import {
    authorization,
    handlingRequest,
    inDevelopment,
    knownErrors,
    money
} from '../../utils';
import { setNotification } from '../../actions/notifications.action';
import { alterLoading } from '../../actions/loading.action';
import Messages from '../../utils/messages';
import requester from '../../requester';


export const PaymentPartialForm = ({ payment, handlers, fieldPrefix = '' }) => {
    PaymentPartialForm.propTypes = {
        handlers: PropTypes.object,
        payment: PropTypes.object,
        fieldPrefix: PropTypes.string,
    };

    return <>
        <Form.Row>
            <Col lg={4}>
                <InputText
                    onChange={event => handlers.setField(fieldPrefix + 'title', event.target.value)}
                    value={payment.title}
                    id={'payment-title'}
                    label={'Título'}
                    required
                />
            </Col>
            <Col lg={4}>
                <MoneyInput
                    onChange={(event, masked, value) => handlers.setField(fieldPrefix + 'value', value)}
                    value={payment.value}
                    label={'Valor'}
                    required
                />
            </Col>
            <Col>
                <InputNumber
                    onChange={event => handlers.setField(fieldPrefix + 'installments', event.target.value)}
                    value={payment.installments}
                    id={'payment-installments'}
                    label={'Parcelas'}
                    min={0}
                    required
                />
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <InputText
                    onChange={event => handlers.setField(fieldPrefix + 'description', event.target.value)}
                    value={payment.description}
                    id={'payment-description'}
                    label={'Descrição'}
                    as={'textarea'}
                />
            </Col>
        </Form.Row>
    </>
};

export const CashierPartialForm = ({ data, handlers }) => {
    CashierPartialForm.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <>
        <Form.Row>
            <Col>
                <InputText
                    onChange={event => handlers.setField('title', event.target.value)}
                    value={data.cashier.title}
                    id={'cashier-title'}
                    label={'Título'}
                    required
                />
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <InputText
                    onChange={event => handlers.setField('description', event.target.value)}
                    value={data.cashier.description}
                    id={'cashier-description'}
                    label={'Descrição'}
                    as={'textarea'}
                />
            </Col>
        </Form.Row>
    </>
};

export const ServicePartialForm = ({ service, handlers }) => {
    ServicePartialForm.propTypes = {
        handlers: PropTypes.object,
        service: PropTypes.object,
    };

    return <>
        <Form.Row>
            <Col lg={4}>
                <InputText
                    onChange={event => handlers.setField('title', event.target.value)}
                    value={service.title}
                    id={'payment-title'}
                    label={'Título'}
                    required
                />
            </Col>
            <Col lg={4}>
                <MoneyInput
                    onChange={(event, masked, value) => handlers.setField('value', value)}
                    value={service.value}
                    label={'Valor'}
                    required
                />
            </Col>
            <Col>
                <InputNumber
                    onChange={event => handlers.setField('installments', event.target.value)}
                    value={service.installments}
                    id={'payment-installments'}
                    label={'Parcelas'}
                    min={0}
                    required
                />
            </Col>
        </Form.Row>
        <Form.Row>
            <Col>
                <InputText
                    onChange={event => handlers.setField('description', event.target.value)}
                    value={service.description}
                    id={'payment-description'}
                    label={'Descrição'}
                    as={'textarea'}
                />
            </Col>
        </Form.Row>
    </>
};

export const ExecutePayment = ({ payment, tooltip, callBackFunc = () => { } }) => {
    ExecutePayment.propTypes = {
        payment: PropTypes.object.isRequired,
        tooltip: PropTypes.string.isRequired,
        callBackFunc: PropTypes.func,
    };

    const [showModal, setShowModal] = useState(false);
    const [cashiers, setCashiers] = useState([]);
    const [cashier, setCashier] = useState(0);

    const dispatch = useDispatch();

    const {
        cashier: cashierService,
        paymentHistories: paymentHistoriesService,
    } = useSelector(state => state.ServicesReducer);

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
            cashiers => setCashiers(cashiers)
        );
    }, [cashierService, dispatch]);

    const confirmExecutePayment = () => {
        dispatch(setNotification({
            close: false,
            message: `Confirmar ${tooltip} ${payment.title}?`,
            onConfirm: () => executePayment(),
        }));
    };

    const executePayment = async () => {
        if (parseInt(cashier) === 0) {
            alert(`Informe um Caixa.`);
            return;
        }

        dispatch(alterLoading(true));
        const [error, response] = await requester(paymentHistoriesService.create, {
            body: JSON.stringify({
                payment: {
                    id: payment.id,
                },
                cashier: {
                    id: cashier,
                },
            }),
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
            paymentHistory => {
                setShowModal(false);
                dispatch(setNotification({
                    message: `${tooltip} ${payment.title} realizado com sucesso!`,
                }));
                callBackFunc();
            }
        );
    };

    useEffect(() => {
        findCashiers();
    }, [findCashiers]);

    useEffect(() => {
        if (inDevelopment()) {
            console.log('cashier', cashier);
        }
    }, [
        cashier,
    ]);

    return <>
        <IconButton
            onClick={() => setShowModal(true)}
            icon={faDollarSign}
            tooltip={tooltip}
        />
        <Modal
            size={'lg'}
            aria-labelledby={'contained-modal-title-vcenter'}
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {tooltip} <em>{payment?.title}</em> | {money(payment?.value)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId={'exampleForm.SelectCustom'}>
                    <Form.Label>{'Informe um Caixa'}</Form.Label>
                    <Form.Control as={'select'} onChange={event => setCashier(event.target.value)}>
                        <option value={0}>{'-- Informe um Caixa --'}</option>
                        {cashiers.map(cashier => <option key={cashier.id} value={cashier.id}>
                            {cashier.title + ' | ' + money(cashier.totalValue)}
                        </option>)}
                    </Form.Control>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'success'} onClick={() => confirmExecutePayment()}
                    disabled={parseInt(cashier) === 0 ? true : false}>{tooltip}</Button>
                <Button variant={'danger'} onClick={() => setShowModal(false)}>{'Cancelar'}</Button>
            </Modal.Footer>
        </Modal>
    </>
};
