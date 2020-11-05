import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

import { 
    InputText,
    MoneyInput,
} from '../inputs/inputs.component';


export const ExpensePartialForm = ({ data, handlers }) => {
    ExpensePartialForm.propTypes = {
        handlers: PropTypes.object,
        data: PropTypes.object,
    };

    return <>
        <Form.Row>
            <Col lg={6}>
                <InputText
                    onChange={event => handlers.setField('title', event.target.value)}
                    value={data.expense.title}
                    id={'payment-title'}
                    label={'Título'}
                    required
                />
            </Col>
            <Col>
                <MoneyInput
                    onChange={(event, masked, value) => handlers.setField('value', value)}
                    value={data.expense.value}
                    label={'Valor'}
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
