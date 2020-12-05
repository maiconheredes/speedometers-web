import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

import { 
    InputText,
    MoneyInput,
    InputNumber
} from '../inputs/inputs.component';


export const ExpensePartialForm = ({ data, handlers }) => {
    ExpensePartialForm.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <>
        <Form.Row>
            <Col lg={4}>
                <InputText
                    onChange={event => handlers.setField('title', event.target.value)}
                    value={data.expense.title}
                    id={'payment-title'}
                    label={'Título'}
                    required
                />
            </Col>
            <Col lg={4}>
                <MoneyInput
                    onChange={(event, masked, value) => handlers.setField('value', value)}
                    value={data.expense.value}
                    label={'Valor'}
                    required
                />
            </Col>
            <Col>
                <InputNumber
                    onChange={event => handlers.setField('installments', event.target.value)}
                    value={data.expense.installments}
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
                    value={data.expense.description}
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
